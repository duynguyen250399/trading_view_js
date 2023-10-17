import * as TradingView from "./charting_library/charting_library";

const INAPP_WEBVIEW_READY = "flutterInAppWebViewPlatformReady";
const CHART_CONTAINER_ID = "tvchart";
const CHART_LIBRARY_PATH = "public/";

const handlers = {
	START: "start",
	INIT_LOCALIZED_MESSAGES: "initLocalizedMessages",
	DOWNLOAD_CHART_IMAGE: "downloadChartImage",
	COPY_CHART_IMAGE: "copyChartImage",
	COPY_CHART_IMAGE_LINK: "copyChartImageLink",
	// Datafeed Handlers
	ON_READY: "onReady",
	SEARCH_SYMBOLS: "searchSymbols",
	RESOLVE_SYMBOLS: "resolveSymbol",
	GET_BARS: "getBars",
	SUBSCRIBE_BARS: "subscribeBars",
	UNSUBSCRIBE_BARS: "unsubscribeBars",
	SAVE_DATA: "saveData",
};

const chartImageLinkStatus = {
	LOADING: "loading",
	COMPLETED: "completed",
};

const cameraIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.118 6a.5.5 0 0 0-.447.276L9.809 8H5.5A1.5 1.5 0 0 0 4 9.5v10A1.5 1.5 0 0 0 5.5 21h16a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 8h-4.309l-.862-1.724A.5.5 0 0 0 15.882 6h-4.764zm-1.342-.17A1.5 1.5 0 0 1 11.118 5h4.764a1.5 1.5 0 0 1 1.342.83L17.809 7H21.5A2.5 2.5 0 0 1 24 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 3 19.5v-10A2.5 2.5 0 0 1 5.5 7h3.691l.585-1.17z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"></path></svg>`;

type LocalizedMessages = {
	snapshot_download: string;
	snapshot_copy_image: string;
	snapshot_copy_image_link: string;
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
				if (value !== null && typeof value === "object") {
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

function createSnapshotDropdown() {
	chart?.createDropdown({
		title: "",
		align: "right",
		icon: cameraIcon,
		items: [
			{
				title: localizedMessages?.snapshot_download ?? "Download Image",
				onSelect: async () => {
					const imageBase64 = await getScreenshotImage();
					window.flutter_inappwebview.callHandler(
						handlers.DOWNLOAD_CHART_IMAGE,
						imageBase64
					);
				},
			},
			{
				title: localizedMessages?.snapshot_copy_image ?? "Copy Image",
				onSelect: async () => {
					const imageBase64 = await getScreenshotImage();
					window.flutter_inappwebview.callHandler(
						handlers.COPY_CHART_IMAGE,
						imageBase64
					);
				},
			},
			{
				title: localizedMessages?.snapshot_copy_image_link ?? "Copy Image Link",
				onSelect: () => {
					chart?.takeScreenshot();
					window.flutter_inappwebview.callHandler(
						handlers.COPY_CHART_IMAGE_LINK,
						chartImageLinkStatus.LOADING,
						""
					);
				},
			},
		],
	});
}

let localizedMessages: LocalizedMessages | undefined;
function onChartReady() {
	chart?.headerReady().then(() => {
		createSnapshotDropdown();
	});

	chart?.subscribe("onAutoSaveNeeded", () => {
		chart!.save((state) => {
			window.flutter_inappwebview.callHandler(handlers.SAVE_DATA, state);
		});
	});

	chart?.subscribe("onScreenshotReady", (id) => {
		const url = `https://www.tradingview.com/x/${id}`;
		window.flutter_inappwebview.callHandler(
			handlers.COPY_CHART_IMAGE_LINK,
			chartImageLinkStatus.COMPLETED,
			url
		);
	});
}

function initializeChart(options: TradingView.ChartingLibraryWidgetOptions) {
	window.flutter_inappwebview
		.callHandler(handlers.INIT_LOCALIZED_MESSAGES)
		.then((messages) => (localizedMessages = messages));

	options.container = CHART_CONTAINER_ID;
	options.library_path = CHART_LIBRARY_PATH;
	options.datafeed = datafeed;
	options.custom_formatters = {
		dateFormatter: {
			format: (date) => {
				return Intl.DateTimeFormat(options.locale).format(date);
			},
			formatLocal: (date) => {
				return Intl.DateTimeFormat(options.locale).format(date);
			},
		},
		timeFormatter: {
			format: (date: Date) => {
				return date.toTimeString().split(" ")[0];
			},
			formatLocal: (date: Date) => {
				return date.toTimeString().split(" ")[0];
			},
		},
		priceFormatterFactory: (
			symbolInfo: TradingView.LibrarySymbolInfo | null,
			minTick: string
		) => {
			return {
				format: (price: number, signPositive?: boolean) => {
					const formatted = (price / 1000).toFixed(2);
					return parseFloat(formatted).toString();
				},
			};
		},
	};

	if (chart == undefined) {
		chart = new TradingView.widget(options);
		chart.onChartReady(onChartReady);
	}
}

window.addEventListener(INAPP_WEBVIEW_READY, (event) => {
	window.flutter_inappwebview.callHandler(handlers.START).then(initializeChart);
});

async function getScreenshotImage() {
	if (chart === undefined) {
		return null;
	}

	const screenshotCanvas = await chart!.takeClientScreenshot();
	return screenshotCanvas.toDataURL();
}
