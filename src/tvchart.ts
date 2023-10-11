import * as TradingView from "./charting_library/charting_library";

const INAPP_WEBVIEW_READY = "flutterInAppWebViewPlatformReady";
const CHART_CONTAINER_ID = "tvchart";
const CHART_LIBRARY_PATH = "public/";

const handlers = {
	START: "start",
	// Datafeed Handlers
	ON_READY: "onReady",
	SEARCH_SYMBOLS: "searchSymbols",
	RESOLVE_SYMBOLS: "resolveSymbol",
	GET_BARS: "getBars",
	SUBSCRIBE_BARS: "subscribeBars",
	UNSUBSCRIBE_BARS: "unsubscribeBars",
	SAVE_DATA: "saveData",
};

declare global {
	interface Window {
		flutter_inappwebview: {
			callHandler: (handlerName: string, ...args: any) => Promise<any>;
		};
		changeTheme: (theme: TradingView.ThemeName) => void;
		callOnTick: (payload: string) => void;
	}
}

const onTickMap: Map<String, TradingView.SubscribeBarsCallback> = new Map();

const datafeed: TradingView.IBasicDataFeed = {
	onReady: (callback: TradingView.OnReadyCallback) => {
		console.log("[Datafeed] onReady() was called");
		window.flutter_inappwebview
			.callHandler(handlers.ON_READY)
			.then((result) => {
				callback(result);
			});
	},
	searchSymbols: (
		userInput: string,
		exchange: string,
		symbolType: string,
		onResult: TradingView.SearchSymbolsCallback
	) => {
		console.log("[Datafeed] searchSymbols() was called");
		window.flutter_inappwebview
			.callHandler(handlers.SEARCH_SYMBOLS, userInput, exchange, symbolType)
			.then((value) => {
				if (Array.isArray(value)) {
					onResult(value);
				} else {
					onResult([]);
				}
			})
			.catch((reason) => {
				onResult([]);
			});
	},
	resolveSymbol: (
		symbolName: string,
		onResolve: TradingView.ResolveCallback,
		onError: TradingView.ErrorCallback,
		extension: TradingView.SymbolResolveExtension
	) => {
		console.log("[Datafeed] resolveSymbol() was called");
		window.flutter_inappwebview
			.callHandler(handlers.RESOLVE_SYMBOLS, symbolName)
			.then((value) => {
				if (value !== null && typeof value === "object") {
					onResolve(value as TradingView.LibrarySymbolInfo);
				} else if (typeof value === "string") {
					onError(value);
				} else {
					onError("Unexpected resolveSymbol return type");
				}
			})
			.catch((reason) => {
				onError("Unexpected error on resolveSymbol");
			});
	},
	getBars: (
		symbolInfo: TradingView.LibrarySymbolInfo,
		resolution: TradingView.ResolutionString,
		periodParams: TradingView.PeriodParams,
		onResult: TradingView.HistoryCallback,
		onError: TradingView.ErrorCallback
	) => {
		console.log("[Datafeed] getBars() was called");
		window.flutter_inappwebview
			.callHandler(handlers.GET_BARS, symbolInfo, resolution, periodParams)
			.then((value) => {
				console.log(
					"[Datafeed] getBars() -> onResult 1: ",
					JSON.stringify(value)
				);
				if (value !== null && typeof value === "object") {
					console.log(
						"[Datafeed] getBars() -> onResult 2: ",
						JSON.stringify(value)
					);
					onResult(value.bars, value.meta);
				} else if (typeof value === "string") {
					onError(value);
				} else {
					onError("Unexpected getBars return type");
				}
			})
			.catch((reason) => {
				onError("Unexpected error on getBars");
			});
	},
	subscribeBars: (
		symbolInfo: TradingView.LibrarySymbolInfo,
		resolution: TradingView.ResolutionString,
		onTick: TradingView.SubscribeBarsCallback,
		listenerGuid: string,
		onResetCacheNeededCallback: () => void
	) => {
		console.log("[Datafeed] subscribeBars() was called");
		onTickMap.set(listenerGuid, onTick);

		window.flutter_inappwebview.callHandler(
			handlers.SUBSCRIBE_BARS,
			symbolInfo,
			resolution,
			listenerGuid
		);
	},
	unsubscribeBars: (listenerGuid: string) => {
		console.log("[Datafeed] unsubscribeBars() was called");
		onTickMap.delete(listenerGuid);

		window.flutter_inappwebview.callHandler(
			handlers.UNSUBSCRIBE_BARS,
			listenerGuid
		);
	},
};

let chart: TradingView.IChartingLibraryWidget | undefined;

function changeTheme(theme: TradingView.ThemeName) {
	chart?.changeTheme(theme);
}
window.changeTheme = changeTheme;

function callOnTick(payload: string) {
	const payloadObject: Record<string, any> = JSON.parse(payload);
	const listenerGuid: string | undefined = payloadObject["listenerGuid"];
	const bar: TradingView.Bar | undefined = payloadObject["bar"];

	if (listenerGuid == undefined || bar == undefined) return;

	if (onTickMap.has(listenerGuid)) {
		const onTick = onTickMap.get(listenerGuid);
		onTick?.(bar);
	}
}
window.callOnTick = callOnTick;

function onChartReady() {
	chart!.subscribe("onAutoSaveNeeded", () => {
		chart!.save((state) => {
			window.flutter_inappwebview.callHandler(handlers.SAVE_DATA, state);
		});
	});
}

function initializeChart(options: TradingView.ChartingLibraryWidgetOptions) {
	console.log("Initialze trading view chart:", JSON.stringify(options));
	options.container = CHART_CONTAINER_ID;
	options.library_path = CHART_LIBRARY_PATH;
	options.datafeed = datafeed;

	if (chart == undefined) {
		chart = new TradingView.widget(options);
		chart.onChartReady(onChartReady);
	}
}

window.addEventListener(INAPP_WEBVIEW_READY, (event) => {
	window.flutter_inappwebview.callHandler(handlers.START).then(initializeChart);
});
