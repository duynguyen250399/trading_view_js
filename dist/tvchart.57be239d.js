let e,t;var i={};!function(e){function t(e,i){let n={...e};for(let o in i)"object"!=typeof e[o]||null===e[o]||Array.isArray(e[o])?void 0!==i[o]&&(n[o]=i[o]):n[o]=t(e[o],i[o]);return n}let i={width:800,height:500,interval:"1D",timezone:"Etc/UTC",container:"",library_path:"",locale:"en",widgetbar:{details:!1,watchlist:!1,news:!1,datawindow:!1,watchlist_settings:{default_symbols:[]}},overrides:{"mainSeriesProperties.showCountdown":!1},studies_overrides:{},trading_customization:{position:{},order:{}},brokerConfig:{configFlags:{}},fullscreen:!1,autosize:!1,disabled_features:[],enabled_features:[],debug:!1,logo:{},time_frames:[{text:"5y",resolution:"1W"},{text:"1y",resolution:"1W"},{text:"6m",resolution:"120"},{text:"3m",resolution:"60"},{text:"1m",resolution:"30"},{text:"5d",resolution:"5"},{text:"1d",resolution:"1"}],client_id:"0",user_id:"0",charts_storage_api_version:"1.0",favorites:{intervals:[],chartTypes:[],indicators:[],drawingTools:[]}},n=JSON.parse('[{"iso":"ar","dir":"rtl","language":"ar"},{"iso":"pt","dir":"ltr","language":"pt"},{"iso":"ca","dir":"ltr","language":"ca_ES"},{"iso":"cs","dir":"ltr","language":"cs"},{"iso":"de","dir":"ltr","language":"de"},{"iso":"en","dir":"ltr","language":"en"},{"iso":"es","dir":"ltr","language":"es"},{"iso":"fa","dir":"rtl","language":"fa"},{"iso":"fr","dir":"ltr","language":"fr"},{"iso":"he","dir":"rtl","language":"he_IL"},{"iso":"hu","dir":"ltr","language":"hu_HU"},{"iso":"id","dir":"ltr","language":"id_ID"},{"iso":"en","dir":"ltr","language":"en"},{"iso":"it","dir":"ltr","language":"it"},{"iso":"ja","dir":"ltr","language":"ja"},{"iso":"ko","dir":"ltr","language":"ko"},{"iso":"ms","dir":"ltr","language":"ms_MY"},{"iso":"pl","dir":"ltr","language":"pl"},{"iso":"ru","dir":"ltr","language":"ru"},{"iso":"sv","dir":"ltr","language":"sv"},{"iso":"th","dir":"ltr","language":"th"},{"iso":"tr","dir":"ltr","language":"tr"},{"iso":"vi","dir":"ltr","language":"vi"},{"iso":"zh-Hans","dir":"ltr","language":"zh"},{"iso":"zh-Hant","dir":"ltr","language":"zh_TW"},{"iso":"el","dir":"ltr","language":"el"},{"iso":"nl","dir":"ltr","language":"nl_NL"},{"iso":"ro","dir":"ltr","language":"ro"}]'),o=!1;function r(){return"CL v26.001 (internal id 04caa94e @ 2023-08-09T11:45:15.021Z)"}let s=class{constructor(e){var n,r;if(this._id=`tradingview_${(1048576*(1+Math.random())|0).toString(16).substring(1)}`,this._ready=!1,this._readyHandlers=[],this._onWindowResize=this._autoResizeChart.bind(this),!e.datafeed)throw Error("Datafeed is not defined");(null===(n=e.overrides)||void 0===n?void 0:n["mainSeriesProperties.priceAxisProperties.lockScale"])&&(console.warn("mainSeriesProperties.priceAxisProperties.lockScale can not be set to true within the widget constructor"),delete e.overrides["mainSeriesProperties.priceAxisProperties.lockScale"]),this._options=t(i,e),"dark"===(null!==(r=this._options.theme)&&void 0!==r?r:"light").toLowerCase()&&void 0===this._options.loading_screen&&(this._options.loading_screen={backgroundColor:"#131722"}),this._options.debug&&(o||(o=!0,console.log("Using CL v26.001 (internal id 04caa94e @ 2023-08-09T11:45:15.021Z)"))),this._create()}setDebugMode(e){this._innerAPI().setDebugMode(e)}onChartReady(e){this._ready?e.call(this):this._readyHandlers.push(e)}headerReady(){return this._innerWindowLoaded.then(()=>this._innerWindow().headerReady())}onGrayedObjectClicked(e){this._doWhenInnerApiLoaded(t=>{t.onGrayedObjectClicked(e)})}onShortcut(e,t){this._doWhenInnerWindowLoaded(i=>{i.createShortcutAction(e,t)})}subscribe(e,t){this._doWhenInnerApiLoaded(i=>{i.subscribe(e,t)})}unsubscribe(e,t){this._doWhenInnerApiLoaded(i=>{i.unsubscribe(e,t)})}chart(e){return this._innerAPI().chart(e)}getLanguage(){return this._options.locale}setSymbol(e,t,i){this._innerAPI().changeSymbol(e,t,i)}remove(){window.removeEventListener("resize",this._onWindowResize),this._readyHandlers.splice(0,this._readyHandlers.length),delete window[this._id],this._iFrame.parentNode&&this._iFrame.parentNode.removeChild(this._iFrame)}closePopupsAndDialogs(){this._doWhenInnerApiLoaded(e=>{e.closePopupsAndDialogs()})}selectLineTool(e,t){this._innerAPI().selectLineTool(e,t)}selectedLineTool(){return this._innerAPI().selectedLineTool()}save(e){this._innerAPI().saveChart(e)}load(e,t){this._innerAPI().loadChart({json:e,extendedData:t})}getSavedCharts(e){this._innerAPI().getSavedCharts(e)}loadChartFromServer(e){this._innerAPI().loadChartFromServer(e)}saveChartToServer(e,t,i){this._innerAPI().saveChartToServer(e,t,i)}removeChartFromServer(e,t){this._innerAPI().removeChartFromServer(e,t)}onContextMenu(e){this._doWhenInnerApiLoaded(t=>{t.onContextMenu(e)})}createButton(e){return this._innerWindow().createButton(e)}createDropdown(e){return this._innerWindow().createDropdown(e)}showNoticeDialog(e){this._doWhenInnerApiLoaded(t=>{t.showNoticeDialog(e)})}showConfirmDialog(e){this._doWhenInnerApiLoaded(t=>{t.showConfirmDialog(e)})}showLoadChartDialog(){this._innerAPI().showLoadChartDialog()}showSaveAsChartDialog(){this._innerAPI().showSaveAsChartDialog()}symbolInterval(){return this._innerAPI().getSymbolInterval()}mainSeriesPriceFormatter(){return this._innerAPI().mainSeriesPriceFormatter()}getIntervals(){return this._innerAPI().getIntervals()}getStudiesList(){return this._innerAPI().getStudiesList()}getStudyInputs(e){return this._innerAPI().getStudyInputs(e)}getStudyStyles(e){return this._innerAPI().getStudyStyles(e)}addCustomCSSFile(e){this._innerWindow().addCustomCSSFile(e)}applyOverrides(e){this._options=t(this._options,{overrides:e}),this._doWhenInnerWindowLoaded(t=>{t.applyOverrides(e)})}applyStudiesOverrides(e){this._doWhenInnerWindowLoaded(t=>{t.applyStudiesOverrides(e)})}watchList(){return this._innerAPI().watchlist()}news(){return this._innerAPI().news()}widgetbar(){return this._innerAPI().widgetbar()}activeChart(){return this._innerAPI().activeChart()}activeChartIndex(){return this._innerAPI().activeChartIndex()}setActiveChart(e){return this._innerAPI().setActiveChart(e)}chartsCount(){return this._innerAPI().chartsCount()}layout(){return this._innerAPI().layout()}setLayout(e){this._innerAPI().setLayout(e)}layoutName(){return this._innerAPI().layoutName()}changeTheme(e,t){return this._innerWindow().changeTheme(e,t)}getTheme(){return this._innerWindow().getTheme()}takeScreenshot(){this._doWhenInnerApiLoaded(e=>{e.takeScreenshot()})}lockAllDrawingTools(){return this._innerAPI().lockAllDrawingTools()}hideAllDrawingTools(){return this._innerAPI().hideAllDrawingTools()}drawOnAllCharts(e){this._innerAPI().drawOnAllCharts(e)}magnetEnabled(){return this._innerAPI().magnetEnabled()}magnetMode(){return this._innerAPI().magnetMode()}undoRedoState(){return this._innerAPI().undoRedoState()}setIntervalLinkingEnabled(e){this._innerAPI().setIntervalLinkingEnabled(e)}setTimeFrame(e){this._innerAPI().setTimeFrame(e)}symbolSync(){return this._innerAPI().symbolSync()}intervalSync(){return this._innerAPI().intervalSync()}crosshairSync(){return this._innerAPI().crosshairSync()}timeSync(){return this._innerAPI().timeSync()}dateRangeSync(){return this._innerAPI().dateRangeSync()}setFeatureEnabled(e,t){this._innerAPI().setFeatureEnabled(e,t)}getAllFeatures(){return this._innerWindow().getAllFeatures()}clearUndoHistory(){return this._innerAPI().clearUndoHistory()}undo(){return this._innerAPI().undo()}redo(){return this._innerAPI().redo()}startFullscreen(){this._innerAPI().startFullscreen()}exitFullscreen(){this._innerAPI().exitFullscreen()}takeClientScreenshot(e){return this._innerAPI().takeClientScreenshot(e)}navigationButtonsVisibility(){return this._innerWindow().getNavigationButtonsVisibility()}paneButtonsVisibility(){return this._innerWindow().getPaneButtonsVisibility()}dateFormat(){return this._innerWindow().getDateFormat()}timeHoursFormat(){return this._innerWindow().getTimeHoursFormat()}currencyAndUnitVisibility(){return this._innerWindow().getCurrencyAndUnitVisibility()}supportedChartTypes(){return this._innerAPI().supportedChartTypes()}watermark(){return this._innerAPI().watermark()}customSymbolStatus(){return this._innerWindow().customSymbolStatus()}setCSSCustomProperty(e,t){if(!1===e.startsWith("--"))throw Error("customPropertyName should begin with a double hyphen");this._innerWindow().document.body.style.setProperty(e,t)}getCSSCustomPropertyValue(e){if(!1===e.startsWith("--"))throw Error("customPropertyName should begin with a double hyphen");let t=this._innerWindow().document.body,i=t.style.getPropertyValue(e);return i||getComputedStyle(t).getPropertyValue(e)}linking(){return this._innerAPI().linking}_innerAPI(){return this._innerWindow().tradingViewApi}_innerWindow(){return this._iFrame.contentWindow}_doWhenInnerWindowLoaded(e){this._ready?e(this._innerWindow()):this._innerWindowLoaded.then(()=>{e(this._innerWindow())})}_doWhenInnerApiLoaded(e){this._doWhenInnerWindowLoaded(t=>{t.doWhenApiIsReady(()=>e(this._innerAPI()))})}_autoResizeChart(){this._options.fullscreen&&(this._iFrame.style.height=window.innerHeight+"px",a&&setTimeout(()=>{this._iFrame.style.height=window.innerHeight+"px"},30))}_create(){var e,t;let i=null!==(t=null===(e=this._options.enabled_features)||void 0===e?void 0:e.includes("iframe_loading_compatibility_mode"))&&void 0!==t&&t,[n,o]=this._render(!i),r=this._options.container,s="string"==typeof r?document.getElementById(r):r;if(null===s)throw Error(`There is no such element - #${this._options.container}`);s.innerHTML=n,this._iFrame=s.querySelector(`#${this._id}`);let a=this._iFrame;i&&(a.contentWindow?(a.contentWindow.document.open(),a.contentWindow.document.write(o),a.contentWindow.document.close()):console.warn("Unable to locate contentWindow for the created iframe. Please try disabling the `iframe_loading_compatibility_mode` featureset.")),(this._options.autosize||this._options.fullscreen)&&(a.style.width="100%",this._options.fullscreen||(a.style.height="100%")),window.addEventListener("resize",this._onWindowResize),this._onWindowResize(),this._innerWindowLoaded=new Promise(e=>{let t=()=>{a.removeEventListener("load",t,!1),e()};a.addEventListener("load",t,!1)}),this._innerWindowLoaded.then(()=>{try{this._innerWindow().widgetReady(()=>{for(let e of(this._ready=!0,this._readyHandlers))try{e.call(this)}catch(e){console.error(e)}this._innerWindow().initializationFinished()})}catch(e){if(e instanceof Error&&/widgetReady is not a function/.test(e.message))throw Error(`There was an error when loading the library. Usually this error means the library failed to load its static files. Check that the library files are available at ${window.location.host}/${this._options.library_path||""} or correct the library_path option.`)}})}_render(e){let t=window;if(t[this._id]={datafeed:this._options.datafeed,customFormatters:this._options.custom_formatters||this._options.customFormatters,brokerFactory:this._options.broker_factory||this._options.brokerFactory,overrides:this._options.overrides,studiesOverrides:this._options.studies_overrides,tradingCustomization:this._options.trading_customization,disabledFeatures:this._options.disabled_features,enabledFeatures:this._options.enabled_features,brokerConfig:this._options.broker_config||this._options.brokerConfig,restConfig:this._options.restConfig,favorites:this._options.favorites,logo:this._options.logo,numeric_formatting:this._options.numeric_formatting,rss_news_feed:this._options.rss_news_feed,newsProvider:this._options.news_provider,loadLastChart:this._options.load_last_chart,saveLoadAdapter:this._options.save_load_adapter,loading_screen:this._options.loading_screen,settingsAdapter:this._options.settings_adapter,getCustomIndicators:this._options.custom_indicators_getter,additionalSymbolInfoFields:this._options.additional_symbol_info_fields,headerWidgetButtonsMode:this._options.header_widget_buttons_mode,customTranslateFunction:this._options.custom_translate_function,symbolSearchComplete:this._options.symbol_search_complete,contextMenu:this._options.context_menu,settingsOverrides:this._options.settings_overrides,timeframe:this._options.timeframe,customTimezones:this._options.custom_timezones},this._options.saved_data)t[this._id].chartContent={json:this._options.saved_data},this._options.saved_data_meta_info&&(t[this._id].chartContentExtendedData=this._options.saved_data_meta_info);else if(!this._options.load_last_chart&&!this._options.symbol)throw Error("Symbol is not defined: either 'symbol' or 'load_last_chart' option must be set");if(this._options.library_path&&!this._options.library_path.endsWith("/")&&console.warn("library_path option should contain a trailing forward slash"),this._options.locale){let e=encodeURIComponent(this._options.locale);n.findIndex(t=>t.language===e)>=0||(console.warn("locale isn't supported. Using default of `en`."),this._options.locale="en")}let i=function(e,t){var i,o;let r=new URL(`${e||""}`,location.href).href,s=JSON.parse('["bundles/runtime.93ba548e6a7994d2a8f1.js","bundles/__LANG__.5008.e5d7d914577969582fa4.js","bundles/3515.2f722d33cebe31a154b1.css","bundles/1564.94d55d014a317059a934.js","bundles/library.0f3decc3cfc32a3eb326.js"]'),a=encodeURIComponent(t),l=null!==(i=n.find(e=>e.language===a))&&void 0!==i?i:{iso:"en",dir:"ltr"},d=`lang="${l.iso}" dir="${l.dir}"`,h=`
${function(e,t,i){if(void 0===e)return"";let n=[],o=[];for(let r of e)r.endsWith(".js")?n.push(`<script defer crossorigin="anonymous" src="${r.replace("__LANG__",i)}"></script>`):r.endsWith(".css")&&o.push(`<link type="text/css" href="${t?r.replace(/\.css$/i,".rtl.css"):r}" rel="stylesheet"/>`);return[...n,...o].join("\n")}(s,"rtl"===l.dir,a)}
`;return`<!DOCTYPE html><html ${(o={bundles:h,localeLanguage:a,htmlAttrs:d,libraryPath:r}).htmlAttrs}><head><base href="${o.libraryPath}"><meta charset="utf-8"><script>window===window.parent&&(location.href="about:blank")</script> ${o.bundles} </head><body class="chart-page unselectable on-widget"><div class="loading-indicator" id="loading-indicator"></div><script>var JSServer={},__initialEnabledFeaturesets=["charting_library"]</script><script>(function() {
		window.urlParams = (function () {
			var match,
				pl	 = /\\+/g,  // Regex for replacing addition symbol with a space
				search = /([^&=]+)=?([^&]*)/g,
				decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')).replace(/<\\/?[^>]+(>|$)/g, ''); },
				query = function() {
					// We don't use hash on the url because: safari 13 throws an error if you attempt this
					// on a blob, and safari 14 will strip hash from blob urls.
					if (frameElement && frameElement.dataset.widgetOptions) {
						return frameElement.dataset.widgetOptions;
					} else {
						throw "Unexpected use of this page";
					}
				}(),
				result = {};

			while (match = search.exec(query)) {
				result[decode(match[1])] = decode(match[2]);
			}

			var additionalSettingsObject = window.parent[result.uid];

			var customObjectNames = ['datafeed', 'customFormatters', 'brokerFactory', 'save_load_adapter', 'customTranslateFunction', 'contextMenu'];

			for (var p in additionalSettingsObject) {
				if (customObjectNames.indexOf(p) === -1) {
					result[p] = JSON.stringify(additionalSettingsObject[p]);
				}
			}

			return result;
		})();

		window.locale = urlParams.locale;
		window.language = urlParams.locale; // a very big attention needed here
		window.customTranslateFunction = window.parent[urlParams.uid].customTranslateFunction;

		window.addCustomCSSFile = function(href) {
			var link = document.createElement('link');
			link.setAttribute('type', 'text/css');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', href);
			link.setAttribute('cross-origin', 'anonymous');

			window.loadedCustomCss = new Promise((resolve) => {
				link.onload = resolve;
				link.onerror = resolve;
			});
			document.body.appendChild(link);
		};

		window.loadedCustomCss = Promise.resolve();
		if (!!urlParams.customCSS) {
			window.addCustomCSSFile(urlParams.customCSS);
		}

		var loadingScreenParams = {};

		if (typeof urlParams.loading_screen === 'string') {
			try {
				loadingScreenParams = JSON.parse(urlParams.loading_screen);
			} catch(e) {}
		}

		var loadingIndicatorElement = document.getElementById('loading-indicator');

		if (loadingScreenParams.backgroundColor) {
			loadingIndicatorElement.style = 'background-color: ' + loadingScreenParams.backgroundColor;
		}

		!function(){"use strict";var t,e=new WeakMap;!function(t){t[t.Element=1]="Element",t[t.Document=9]="Document"}(t||(t={}));var n={mini:"xsmall",xsmall:"xsmall",small:"small",medium:"medium",large:"large"};var i,s,o,r,l,c=(void 0===l&&(l=""),i='<div class="tv-spinner '.concat(l,'" role="progressbar"></div>'),o=function(n,i){var s,o;return s=null==i?document.documentElement:i.nodeType===t.Document?i.documentElement:i,e&&(o=e.get(s)),o||((o=s.ownerDocument.createRange()).selectNodeContents(s),e&&e.set(s,o)),o.createContextualFragment(n)}(i,s),null!==(r=o.firstElementChild)&&o.removeChild(r),r),a=function(){function t(t){this._shown=!1,this._el=c.cloneNode(!0),this.setSize(n[t||"large"])}return t.prototype.spin=function(t){return this._el.classList.add("tv-spinner--shown"),void 0===this._container&&(this._container=t,void 0!==t&&t.appendChild(this._el)),this._shown=!0,this},t.prototype.stop=function(t){return t&&void 0!==this._container&&this._container.removeChild(this._el),this._el&&this._el.classList.remove("tv-spinner--shown"),this._shown=!1,this},t.prototype.setStyle=function(t){var e=this;return Object.keys(t).forEach((function(n){var i=t[n];void 0!==i&&e._el.style.setProperty(n,i)})),this},t.prototype.style=function(){return this._el.style},t.prototype.setSize=function(t){var e=void 0!==t?"tv-spinner--size_".concat(t):"";return this._el.className="tv-spinner ".concat(e," ").concat(this._shown?"tv-spinner--shown":""),this},t.prototype.getEl=function(){return this._el},t.prototype.destroy=function(){this.stop(),delete this._el,delete this._container},t}();window.Spinner=a}();


		var spinnerColor = (loadingScreenParams.foregroundColor) ? loadingScreenParams.foregroundColor : undefined;

		var loadingSpinner = new Spinner('large').setStyle({
			'--tv-spinner-color': spinnerColor,
			zIndex: String(2e9),
		});
		loadingSpinner.getEl().classList.add('spinner');
		loadingSpinner.spin(loadingIndicatorElement);
	})();</script></body></html>`}(this._options.library_path||"",this._options.locale),o=new URL("about:blank");if(e){let e=new Blob([i],{type:"text/html"}),t=URL.createObjectURL(e);o=new URL(t)}let r="symbol="+encodeURIComponent(this._options.symbol||"")+"&interval="+encodeURIComponent(this._options.interval)+(this._options.toolbar_bg?"&toolbarbg="+encodeURIComponent(this._options.toolbar_bg.replace("#","")):"")+(this._options.studies_access?"&studiesAccess="+encodeURIComponent(JSON.stringify(this._options.studies_access)):"")+"&widgetbar="+encodeURIComponent(JSON.stringify(this._options.widgetbar))+(this._options.drawings_access?"&drawingsAccess="+encodeURIComponent(JSON.stringify(this._options.drawings_access)):"")+"&timeFrames="+encodeURIComponent(JSON.stringify(this._options.time_frames))+"&locale="+encodeURIComponent(this._options.locale)+"&uid="+encodeURIComponent(this._id)+"&clientId="+encodeURIComponent(String(this._options.client_id))+"&userId="+encodeURIComponent(String(this._options.user_id))+(this._options.charts_storage_url?"&chartsStorageUrl="+encodeURIComponent(this._options.charts_storage_url):"")+(this._options.charts_storage_api_version?"&chartsStorageVer="+encodeURIComponent(this._options.charts_storage_api_version):"")+(this._options.custom_css_url?"&customCSS="+encodeURIComponent(this._options.custom_css_url):"")+(this._options.custom_font_family?"&customFontFamily="+encodeURIComponent(this._options.custom_font_family):"")+(this._options.auto_save_delay?"&autoSaveDelay="+encodeURIComponent(String(this._options.auto_save_delay)):"")+"&debug="+encodeURIComponent(String(this._options.debug))+(this._options.snapshot_url?"&snapshotUrl="+encodeURIComponent(this._options.snapshot_url):"")+(this._options.timezone?"&timezone="+encodeURIComponent(this._options.timezone):"")+(this._options.study_count_limit?"&studyCountLimit="+encodeURIComponent(String(this._options.study_count_limit)):"")+(this._options.symbol_search_request_delay?"&ssreqdelay="+encodeURIComponent(String(this._options.symbol_search_request_delay)):"")+(this._options.compare_symbols?"&compareSymbols="+encodeURIComponent(JSON.stringify(this._options.compare_symbols)):"")+(this._options.theme?"&theme="+encodeURIComponent(String(this._options.theme)):"")+(this._options.header_widget_buttons_mode?"&header_widget_buttons_mode="+encodeURIComponent(String(this._options.header_widget_buttons_mode)):"")+(this._options.time_scale?"&time_scale="+encodeURIComponent(JSON.stringify(this._options.time_scale)):"");return[`<iframe
		id="${this._id}" name="${this._id}" src="${o.href}" data-widget-options="${r}"
		${this._options.autosize||this._options.fullscreen?"":`width="${this._options.width}" height="${this._options.height}"`} title="Financial Chart" frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen style="display:block;">
	</iframe>`,i]}};"undefined"!=typeof window&&(window.TradingView=window.TradingView||{},window.TradingView.version=r);let a=!("undefined"==typeof window||!window.navigator||!window.navigator.userAgent)&&window.navigator.userAgent.includes("CriOS");e.version=r,e.widget=s,Object.defineProperty(e,"__esModule",{value:!0})}(i);const n={START:"start",INIT_LOCALIZED_MESSAGES:"initLocalizedMessages",DOWNLOAD_CHART_IMAGE:"downloadChartImage",COPY_CHART_IMAGE:"copyChartImage",COPY_CHART_IMAGE_LINK:"copyChartImageLink",// Datafeed Handlers
ON_READY:"onReady",SEARCH_SYMBOLS:"searchSymbols",RESOLVE_SYMBOLS:"resolveSymbol",GET_BARS:"getBars",SUBSCRIBE_BARS:"subscribeBars",UNSUBSCRIBE_BARS:"unsubscribeBars",GET_SERVER_TIME:"getServerTime",SAVE_DATA:"saveData"},o=new Map,r={onReady:e=>{console.log("[Datafeed] onReady() was called"),window.flutter_inappwebview.callHandler(n.ON_READY).then(t=>{e(t)})},searchSymbols:(e,t,i,o)=>{console.log("[Datafeed] searchSymbols() was called"),window.flutter_inappwebview.callHandler(n.SEARCH_SYMBOLS,e,t,i).then(e=>{Array.isArray(e)?o(e):o([])}).catch(e=>{o([])})},resolveSymbol:(e,i,o,r)=>{console.log("[Datafeed] resolveSymbol() was called"),window.flutter_inappwebview.callHandler(n.RESOLVE_SYMBOLS,e).then(e=>{null!==e&&"object"==typeof e?i(e):o(t?.generic_error??"System error")}).catch(e=>{o(t?.generic_error??"System error")})},getBars:(e,t,i,o,r)=>{console.log("[Datafeed] getBars() was called"),window.flutter_inappwebview.callHandler(n.GET_BARS,e,t,i).then(e=>{null!=e&&"object"==typeof e?o(e.bars,e.meta):o([],{noData:!i.firstDataRequest})}).catch(e=>{o([],{noData:!i.firstDataRequest})})},subscribeBars:(e,t,i,r,s)=>{console.log("[Datafeed] subscribeBars() was called"),o.set(r,i),window.flutter_inappwebview.callHandler(n.SUBSCRIBE_BARS,e,t,r)},unsubscribeBars:e=>{console.log("[Datafeed] unsubscribeBars() was called"),o.delete(e),window.flutter_inappwebview.callHandler(n.UNSUBSCRIBE_BARS,e)},getServerTime:e=>{console.log("[Datafeed] getServerTime() was called"),window.flutter_inappwebview.callHandler(n.GET_SERVER_TIME).then(t=>e(t))}};function s(o){window.flutter_inappwebview.callHandler(n.INIT_LOCALIZED_MESSAGES).then(e=>t=e),o.container="tvchart",o.library_path="public/",o.datafeed=r,o.custom_formatters={dateFormatter:{format:e=>Intl.DateTimeFormat(o.locale).format(e),formatLocal:e=>Intl.DateTimeFormat(o.locale).format(e)},priceFormatterFactory:(e,t)=>({format:(e,t)=>Intl.NumberFormat("en",{maximumFractionDigits:2,minimumFractionDigits:2}).format(e)})},void 0==e&&(e=new i.widget(o)).onChartReady(()=>{e?.headerReady().then(()=>{e?.createDropdown({title:"",align:"right",icon:'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.118 6a.5.5 0 0 0-.447.276L9.809 8H5.5A1.5 1.5 0 0 0 4 9.5v10A1.5 1.5 0 0 0 5.5 21h16a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 8h-4.309l-.862-1.724A.5.5 0 0 0 15.882 6h-4.764zm-1.342-.17A1.5 1.5 0 0 1 11.118 5h4.764a1.5 1.5 0 0 1 1.342.83L17.809 7H21.5A2.5 2.5 0 0 1 24 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 3 19.5v-10A2.5 2.5 0 0 1 5.5 7h3.691l.585-1.17z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"></path></svg>',items:[{title:t?.snapshot_download??"Download Image",onSelect:async()=>{let e=await a();window.flutter_inappwebview.callHandler(n.DOWNLOAD_CHART_IMAGE,e)}},{title:t?.snapshot_copy_image??"Copy Image",onSelect:async()=>{let e=await a();window.flutter_inappwebview.callHandler(n.COPY_CHART_IMAGE,e)}},{title:t?.snapshot_copy_image_link??"Copy Image Link",onSelect:()=>{e?.takeScreenshot(),window.flutter_inappwebview.callHandler(n.COPY_CHART_IMAGE_LINK,"loading","")}}]})}),e?.subscribe("onAutoSaveNeeded",()=>{e.save(e=>{window.flutter_inappwebview.callHandler(n.SAVE_DATA,e)})}),e?.subscribe("onScreenshotReady",e=>{let t=`https://www.tradingview.com/x/${e}`;window.flutter_inappwebview.callHandler(n.COPY_CHART_IMAGE_LINK,"completed",t)}),e?.chart().setResolution(o.interval),// Candles chart
// See https://www.tradingview.com/charting-library-docs/latest/api/enums/Charting_Library.SeriesType
e?.chart().setChartType(1),e?.chart().getTimezoneApi().setTimezone(o.timezone??"Asia/Ho_Chi_Minh")})}async function a(){if(void 0===e)return null;let t=await e.takeClientScreenshot();return t.toDataURL()}window.changeTheme=function(t){e?.changeTheme(t)},window.callOnTick=function(e){let t=JSON.parse(e),i=t.listenerGuid,n=t.bar;if(void 0!=i&&void 0!=n&&o.has(i)){let e=o.get(i);e?.(n)}},window.addEventListener("flutterInAppWebViewPlatformReady",e=>{window.flutter_inappwebview.callHandler(n.START).then(s)});