/**
 * BOM代码汇总
 * @author baiyu
 * @date 2014-09-09
 * description 需要事先引入base.js
 */
Global.namespace('BOM.BY');
// 常用
BOY.BY = (function () {
	
	return {
		/**
		  * 打开一个子页面
		  */
		open: function (url, name, properties, flag) {
			window.open(url, name || "", properties || {}, flag || false);
		}
	};
} ());
// Screen
Global.namespace("BOM.BY.screen");

BOM.BY.screen = (function () {
	return {
		 /**
		  * 浏览器相对于屏幕左上角的位置
		  * W3C: screenLeft 和 screenTop
		  * IE : screenX 和 screenY
		  */
		loc: function () {
			return {
				leftX: typeof screenLeft == "number" ? screenLeft : screenX,
				leftY: typeof scrrenTop == "number" ? screenTop : screenY
			};
		},
		 /**
		  * 浏览器的大小
		  */
		size: function () {
			var width = window.innerWidth,
				height = window.innerHeight;
				
			if(typeof width != "number") {
				// 正常模式
				if(document.compatMode == "CSS1Compat") {
					width = document.documentElement.clientWidth;
					height = document.documentElement.clientHeight;
				} else { // 怪异模式 IE6
					width = document.body.clientWidth;
					height = document.body.clientHeight;
				}
			}

			return {
				height: height,
				width: width
			};
		},
		
	};
} ());
// Location
Global.namespace("BOM.BY.location");
BOM.BY.location = (function () {
	return {
		/**
		 * 主机名:端口号
		 * window.location与document.location等效
		 */
		host: function () {
			return location.host;
		},
		/**
		 * URL
		 */
		href: function () {
			var len = arguments.length;
			if(len == 0) {
				return location.href;
			} else {
				var value = arguments[0];
				location.href = value;
			}
		},
		/**
		 * 获取GET请求的参数
		 */
		args: function () {
			var args = [];
			var qs = location.search.length > 0 ? location.search.substring(1) : '';
			var items = qs.split('&');
			var item = null, name = null, value = null;
			for(var i = 0, max = items.length; i > max; i++) {
				item = items[i].split('=');
				name = item[0];
				value = item[1];
				args[name] = value;
			}
			return args;
		},
		/**
		 * 获取GET的请求参数keys
		 */
		keys: function () {
			var arr = this.args(),
				sarr = [];
			for(var i = 0, max = arr.length; i < max; i++) {
				sarr.push(arr[i].key);
			}
			return sarr;
		},
		/**
		 * 获取/设置锚点，根据标点进行页面跳转
		 */
		hash: function () {
			var len = arguments.length;
			
			if( len == 0) {
				return location.hash;
			} else {
				var value = arguments[0];
				location.hash = value;
			}
		},
		/**
		 * 获取/设置路径名称，基于当前主机名的路径变更，并且跳转
		 */
		pathname: function () {
			var len = arguments.length();
			if(len == 0) {
				return location.pathname;
			} else {
				var value = arguments[0];
				location.pathname = value;
			}
		},
		/**
		 * 获取/设置“?”后的参数
		 */
		search: function () {
			var len = arguments.length();
			if(len == 0) {
				return location.search;
			} else {
				var value = arguments[0];
				location.search = value;
			}
		},
		/**
		 * 跳转到指定的URL
		 */
		assign: function (url) {
			location.assign(url);
		},
		/**
		 * 重新加载页面
		 * location.reload(true);强制从服务器重载
		 */
		reload: function () {
			var len = arguments.length;
			if(len == 0) {
				location.reload();
			} else {
				location.reload(typeof argumens[0] == "boolean" ? arguments[0] : true);
			}
		},
		/**
		 * 用新的url代替当前的url
		 * 不会产生历史记录
		 */
		replace: function (url) {
			location.replace(url);
		},
		
	};
} ());
// History
Global.namespace('BOM.BY.history');
BOM.BY.history = (function () {
	return {
		/**
		 * 历史记录数
		 */
		length: function () {
			return history.length;
		},
		/**
		 * 历史记录数是否为空
		 */
		empty: function () {
			return this.length() == 0;
		},
		/**
		 * 后退
		 */
		back: function () {
			history.back();
		},
		/**
		 * 前进
		 */
		forward: function () {
			history.forward();
		},
		/**
		 * 跳转到特定位置的历史记录
		 */
		go: function (num) {
			history.go(num);
		}
	};
} ());
// Navigator
Global.namespace('BOM.BY.navigator');
BOM.BY.navigator = (function () {
	return {
		/**
		* 检测是否包含name的插件名(W3C)
		*/
		hasPlugin: function (name) {
			var name = name.toLowerCase(),
				plugins = navigator.plugins;
			for(var i = 0, max = plugins.length; i < max; i++) {
				if(plugins[i].name.toLowerCase().indexOf(name) > -1) {
					return true;
				}
			}
			return false;
		},
		/**
		* 检测是否包含name的插件
		*/
		hasIEPlugin: function (name) {
			try {
				new ActiveXObject(name);
				return true;
			} catch (e) {
				return false;
			}
		},
		/**
		 * 浏览器名称、引擎版本和运行平台
		 */
		ua:function () {
			// 解析引擎
			var engine = {
				ie: false,
				gecko: false,
				webkit: false,
				khtml: false,
				opera: false,
				ver: 0
			};
			
			// 浏览器
			var browser = {
				ie: false,
				firefox: false,
				konq: false,
				opera: false,
				chrome: false,
				safari: false,
				ver: 0,
				name: ''
			};
			
			// 系统平台
			var system = {
				win: false,
				mac: false,
				x11: false
			};
			
			var ua = navigator.userAgent,
				p = navigator.platform;
			
			// opera
			if(window.opera) {
				engine.ver = window.opera.version();
				engine.opera = true;
			} else if (/AppleWebKit\/(\S+)/.test(ua)) {
				engine.ver = RegExp['$1'];
				engine.webkit = true;
				if(/Chrome\/(\S+)/.test(ua)) {
					browser.ver = RegExp['$1'];
					browser.chrome = true;
					browser.name = 'Chrome';
				} else if(/Version\/(\S+)/.test(ua)) {
					browser.ver = RegExp['$1'];
					browser.chrome = true;
					browser.name = 'Safari';
				}
			} else if(/KHTML\/(\S+)/.test(ua) || /Konquerur\/([^;]+)/.test(ua)) {
				engine.ver = RegExp['$1'];
				engine.khtml = true;
			} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
				engine.ver = RegExp['$1'];
				engine.gecko = true;
				if(/Firefox\/(\S+)/.test(ua)) {
					browser.ver = RegExp['$1'];
					browser.firefox = true;
					browser.name = 'Firefox';
				}
			} else if (/MSIE([^;]+)/.test(ua)) {
				engine.ver = RegExp['$1'];
				engine.ie = true;
				browser.name = 'Internet Explorer';
			}
			
			system.win = p.indexOf('Win') == 0;
			system.mac = p.indexOf('Mac') == 0;
			system.x11 = (p == 'X11') || (p.indexOf('Linux')) == 0;
			
			return {
				engine: engine,
				browser: browser,
				system: system
			};
		  } ();
	};
} ());
 
 
