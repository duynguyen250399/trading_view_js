import * as TradingView from "./charting_library/charting_library";

const INAPP_WEBVIEW_READY = "flutterInAppWebViewPlatformReady";
const CHART_CONTAINER_ID = "tvchart";
const CHART_LIBRARY_PATH = "public/";
const DEFAULT_TIMEZONE = "Asia/Ho_Chi_Minh";

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
	GET_SERVER_TIME: "getServerTime",
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
	generic_error: string;
};

type CustomLibrarySymbolInfo = TradingView.LibrarySymbolInfo & {
	price_precision: number;
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
					onResolve(value as CustomLibrarySymbolInfo);
				} else {
					onError(localizedMessages?.generic_error ?? "System error");
				}
			})
			.catch((_) => {
				onError(localizedMessages?.generic_error ?? "System error");
			});
	},
	getBars: (
		symbolInfo: CustomLibrarySymbolInfo,
		resolution: TradingView.ResolutionString,
		periodParams: TradingView.PeriodParams,
		onResult: TradingView.HistoryCallback,
		onError: TradingView.ErrorCallback
	) => {
		console.log("[Datafeed] getBars() was called");
		window.flutter_inappwebview
			.callHandler(handlers.GET_BARS, symbolInfo, resolution, periodParams)
			.then((value) => {
				if (
					value !== null &&
					value !== undefined &&
					typeof value === "object"
				) {
					onResult(value.bars, value.meta);
				} else {
					onResult([], {
						noData: periodParams.firstDataRequest ? false : true,
					});
				}
			})
			.catch((_) => {
				onResult([], {
					noData: periodParams.firstDataRequest ? false : true,
				});
			});
	},
	subscribeBars: (
		symbolInfo: CustomLibrarySymbolInfo,
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
	getServerTime: (callback: TradingView.ServerTimeCallback) => {
		console.log("[Datafeed] getServerTime() was called");
		window.flutter_inappwebview
			.callHandler(handlers.GET_SERVER_TIME)
			.then((serverTimestamp) => callback(serverTimestamp));
	},
};

let chartWidget: TradingView.IChartingLibraryWidget | undefined;

function changeTheme(theme: TradingView.ThemeName) {
	chartWidget?.changeTheme(theme);
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
	chartWidget?.createDropdown({
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
					chartWidget?.takeScreenshot();
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

function onChartReady(options: TradingView.ChartingLibraryWidgetOptions) {
	chartWidget?.headerReady().then(() => {
		createSnapshotDropdown();
	});

	chartWidget?.subscribe("onAutoSaveNeeded", () => {
		chartWidget!.save((state) => {
			window.flutter_inappwebview.callHandler(handlers.SAVE_DATA, state);
		});
	});

	chartWidget?.subscribe("onScreenshotReady", (id) => {
		const url = `https://www.tradingview.com/x/${id}`;
		window.flutter_inappwebview.callHandler(
			handlers.COPY_CHART_IMAGE_LINK,
			chartImageLinkStatus.COMPLETED,
			url
		);
	});

	const activeChart = chartWidget?.activeChart();
	if (activeChart) {
		activeChart.setResolution(options.interval);
		activeChart.setChartType(1);
		const timezoneApi = activeChart.getTimezoneApi();
		timezoneApi.setTimezone(options.timezone ?? DEFAULT_TIMEZONE);
	}
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
		priceFormatterFactory: (
			symbolInfo: CustomLibrarySymbolInfo | null,
			minTick: string
		) => {
			return {
				format: (price: number, signPositive?: boolean) => {
					const precision = symbolInfo?.price_precision ?? 2;
					return Intl.NumberFormat("en", {
						maximumFractionDigits: precision,
						minimumFractionDigits: precision,
					}).format(price);
				},
			};
		},
	};

	if (chartWidget == undefined) {
		chartWidget = new TradingView.widget(options);
		chartWidget.onChartReady(() => onChartReady(options));
	}
}

window.addEventListener(INAPP_WEBVIEW_READY, (event) => {
	window.flutter_inappwebview.callHandler(handlers.START).then(initializeChart);
});

async function getScreenshotImage() {
	if (chartWidget === undefined) {
		return null;
	}

	const screenshotCanvas = await chartWidget!.takeClientScreenshot();
	return screenshotCanvas.toDataURL();
}
