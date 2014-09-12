/**
 * DOM代码汇总
 * @author baiyu
 * @date 2014-09-09
 * description 需要事先引入base.js
 */
// BY
Global.namespace('DOM.BY');
DOM_BY = (function () {
	return {
		_getId: document.getElementById,
		_getTagName: document.getElementsByTagName,
		 /**
		  * 根据id获取Element
		  */
		getId: function (id, parent) {
			parent = parent || document;
			return  BYDOM._getId.call(parent, id);
		},
		/**
		  * 通过标签名称查找Elements
		  */
		  getTagName = function (tagName, parent) {
			parent = parent || document;
			return  BYDOM._getTagName.call(parent, tagName);
		},
		/**
		 * 根据className查找Elements
		 */
		getClassName = function (className, parent) {
			parent = parent || document;
			var all = BYDOM._getTagName.call(parent, '*'),
				arr = [];
			for(var i = 0, max = all.length; i < max; i++) {
				if(all[i].className.indexOf(className) != -1) {
					arr.push(all[i]);
				}
			}
			return arr;
		},
		 /**
		  * 将特殊符号进行直接转移
		  */
		 escape = function (str, ele) {
			var text = document.createTextNode(str);
			ele.appendChild(text);
		 },
		 /**
		  * 删除空白节点
		  */
		 removeWhiteNodes = function (nodes) {
			for (var i = 0; i < nodes.childNodes.length; i ++) {
				if (nodes.childNodes[i].nodeType === 3 &&
				/^\s+$/.test(nodes.childNodes[i].nodeValue)) {
					nodes.childNodes[i].parentNode.removeChild(nodes.childNodes[i]);
				}
			}
			return nodes;
		 },
		/**
		  * 将newElement插入到targetElement之前
		  */
		 insertBefore = function (newElement, targetElement) {
			var parent = targetElement.parentNode;
			parent.insertBefore(newElement, targetElement);
		 },
		/**
		  * 将一个节点插入到另外的一个节点之后
		  */
		 insertAfter = function (newElement, targetElement) {
			var parent = targetElement.parentNode;
			if(parent.lastChild === targetElement) {
				parent.appendChild(newElement);
			} else {
				parent.insertBefore(newElement, targetElement.nextSibling);
			}
		 },
		 /**
		  * createElement在IE6、7中创建iframe、input中的radio和checkbox、button元素时出现不兼容问题
		  */
		 createElement = function (str) {
			if(BYBOM.ua.browser.name == "Internet Explorer"
				&& BYBOM.ua.browser.ver <= 7) {
				element = document.createElement("<input type='" + str + "' name='sex'/>");
			} else {
				input = document.createElement('input');
				input.setAttribute('type', 'radio');
				input.setAttribute('name', 'sex');
			}
			return input;
		 },
		 /**
		  * 复制节点，参数true为复制内容
		  */
		 clone = function (ele, flag) {
			if(flag) {
				return ele.cloneNode(flag);
			} else {
				return ele.cloneNode();
			}
		 },
		 /**
		  * 判断某节点是否是某节点的子节点
		  */
		 contains = function (refNode, otherNode) {
			// 判断支持contains，并且非Safari浏览器
			if(typeof refNode.contains != 'undefined' &&
				!(BYBOM.ua.browser == 'Safari' && BYBOM.ua.engine.ver < 3)) {
				return refNode.contains(otherNode);
			// 判断支持compareDocumentPosition的浏览器，大于16就是包含
			} else if (typeof refNode.compareDocumentPosition == 'function') {
				return !!(refNode.compareDocumentPosition(otherNode) > 16);
			} else {
				// 更低的浏览器兼容，通过递归一个个获取他的父节点是否存在
				var node = otherNode.parentNode;
				do {
					if(node === refNode) {
						return true;
					} else {
						node = node.parentNode;
					}
				}while(node != null);
			}
			return false;
		 },
		/**
		  * 获取text，没有html, Firefox的方法是textContent
		  */
		 getInnerText = function (element) {
			return typeof element.textContent == "string" ? element.textContent : element.innerText;
		 },
		/**
		  * 设置text
		  */
		 setInnerText = function (element, text) {
			if(typeof element.textContent == 'string') {
				element.textContent = text;
			} else {
				element.innerText = text;
			}
		 },
		 /**
		  * 判断一个元素是否包含一个类
		  */
		 hasClass = function (element, className) {
			return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
		 },
		 /**
		  * 添加一个类
		  */
		 addClass = function (element, className) {
			if(this.hasClass(element, className)) {
				element.className += ' ' + className;
			}
		 },
		 /**
		  * 移除一个类
		  */
		 removeClass = function (element, className) {
			if(this.hasClass(element, className)) {
				element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
			}
		 },
		/**
		  * 获取HTMLLinkElement
		  */
		 styleSheet = function (index) {
			return document.styleSheets[index];
		 },
		 /**
		  * 将css插入到指定sheet中
		  * @param sheet CSSStyleSheet
		  * @param selectorText tag, className, id
		  * @param cssText css代码
		  * @param position 位置
		  */
		 insertRule = function (sheet, selectorText, cssText, position) {
			// 非IE
			if(sheet.insertRule) {
				sheet.insertRule(selectorText + '{' + cssText + '}', position);
			// IE
			} else {
				sheet.addRule(selectorText, cssText, position);
			}
		 },
		 /**
		  * 移除css
		  * @param sheet CSSStyleSheet
		  * @param index 位置
		  */
		 deleteRule = function (sheet, index) {
			// 非IE
			if(sheet.deleteRule) {
				sheet.deleteRule(index);
			// IE
			} else if(sheet.removeRule) {
				sheet.removeRule(index);
			}
		 },
		/**
		  * 获取元素的样式
		  */
		 getStyle = function (element, name) {
			var style = window.getComputedStyle ? window.getComputedStyle(element, null) : element.currentStyle;
			return style[name];
		 },
		/**
		  * 距离左上角的left
		  */
		 offsetLeft = function (element) {
			var left = element.offsetLeft;
			var parent = element.offsetParent;
			while(parent != null) {
				left += parent.offsetLeft;
				parent = parent.offsetParent;
			}
			return left;
		 },
		/**
		 * 距离左上角的top
		 */
		offsetLeft = function (element) {
			var left = element.offsetLeft;
			var parent = element.offsetParent;
			while(parent != null) {
				left += parent.offsetLeft;
				parent = parent.offsetParent;
			}
			return left;
		},
		/**
		 * 滚动条置顶
		 */
		 scrollStart = function (element) {
			if(element.scrollTop != 0) element.scrollTop = 0;
		 },
		/**
		  * 滚动条置顶
		  */
		 toTop = function () {
			this.scrollStart(document.body);
		 },
		/**
		  * 获取DOM元素的位置
		  */
		 getRect = function (element) {
			var rect = element.getBoundingClientRect();
			// IE默认从(2, 2)开始
			var top = document.documentElement.clientTop;
			var left = document.documentElement.clientLeft;
			
			return {
				top: rect.top - top,
				bottom: rect.bottom - top,
				left: rect.left - left,
				right: rect.right - left
			};
		 },
		/**
		  * 动态加载js
		  */
		 loadScript = function (url) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);
		 },
		/**
		  * 动态加载link
		  */
		 loadStyles = function (url) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = url;
			document.getElementsByTagName('head')[0].appendChild(link);
		 },
		/**
		  * 获取Event Object
		  */
		 getEvt = function (evt) {
			return evt || window.event;
		 },
		/**
		  * 获取触发当前事件的对象
		  */
		 getTarget = function (evt) {
			var e = this.getEvt(evt);
			if(e.srcElement) {
				if(e.type == 'mouseover') {
					return e.fromElement;
				} else if (e.type == 'mouseout') {
					return e.toElement;
				}
			} else if (e.relatedTarget) {
				return e.relatedTarget;
			}
		 },
		/**
		  * 0 鼠标左键 1 鼠标中键 2 鼠标右键
		  */
		 getButton = function (evt) {
			var e = this.getEvt(evt);
			if(evt) {
				return e.button;
			} else if (window.event) {
				switch(e.button) {
					case 1:
						return 0
					case 4:
						return 1;
					case 2:
						return 2;
				}
			}
		 },
		/**
		  * 是否按下shift、ctrlKey、altKey和metaKey
		  */
		  getKey = function (evt) {
			var e = this.getEvt(evt);
			var keys = [];
			if(e.shiftKey) keys.push('shift');
			if(e.ctrlKey) keys.push('ctrl');
			if(e.altKey) keys.push('alt');
			return keys;
		 },
		 /**
		  * keypress或keydown获取ASCII码值
		  */
		 getCharCode = function (evt) {
			var e = this.getEvt(evt);
			if(typeof e.charCode == 'number') {
				return e.charCode;
			} else {
				return e.keyCode;
			}
		 },
		 /**
		  * 阻止向上的冒泡行为
		  */
		 stopPropagation = function (evt) {
			var e = this.getEvt(evt);
			if(e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			return e;
		 },
		 
		 /**
		  * 阻止事件的默认行为
		  */
		 preventDefault = function (evt) {
			var e = this.getEvt(evt);
			if(e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			return e;
		 },
		  // Fn计数器
		__EventID = 1,
		 /**
		  * 事件绑定函数
		  * @param obj  		DOM对象
		  * @param type 		事件类型
		  * @param fn   		绑定函数
		  * @param useCapature  是否支持捕获
		  */
		 addEvent = function (obj, type, fn, useCapture) {
			if(obj.addEventListener) {
				obj.addEventListener(type, fn, !!useCapture);
			} else {
				if(!fn.__EventID) {
					fn.__EventID = this.__EventID++;
				}
				
				if(!obj.__EventHandlers) {
					obj.__EventHandlers = {};
				}
				
				if(!obj.__EventHandlers[type]) {
					obj.__EventHandlers[type] = [];
					if(obj['on'+type]) {
						var oldFn = obj['on' + type];
						oldFn.__EventID = 0;
						obj.__EventHandlers[type][0] = oldFn;
					}
					obj['on' + type] = this.__execEventHandlers;
				} 
				
				if(!this.__fnExisted(obj, type, fn)) {
					obj.__EventHandlers[type].push(fn);
				}
			}
		 },
		 
		 /**
		  * 判断是否已经添加过fn
		  */
		 __fnExisted = function (obj, type, fn) {
			var handlers = obj.__EventHandlers[type];/*,
				hasNames = [],
				noNames = [],
				value = false;
			
			for(var i = 0, max = handlers.length; i < max; i++) {
				if(typeof handlers[i].name == 'string' && handlers[i].name == '') {
					noNames.push(handlers[i]);
				} else {
					hasNames.push(handlers[i]);
				}
			}
			if(fn.name == '') {
				value = BYDOM.__noNameFnExisted(noNames, fn);
			} else {
				value = BYDOM.__hasNameFnExisted(hasNames, fn);
			}*/
			return BYDOM.__hasNameFnExisted(handlers, fn);
		 },
		 /**
		  * 判断有名称的函数组中是否包含fn函数
		  */
		 __hasNameFnExisted = function (fns, fn) {
			for(var i = 0, max = fns.length; i < max; i++) {
				if(fns[i].__EventID == fn.__EventID) {
					return true;
				}
			}
			return false;
		 },
		 /**
		  * 判断匿名函数组中是否包含fn函数
		  */
		 __noNameFnExisted = function (fns, fn) {
			for(var i = 0, max = fns.length; i < max; i++) {
				if(fns[i].toString() == fn.toString()) {
					return true;
				}
			}
			return false;
		 },
		 /**
		  * 批量执行绑定的事件
		  */
		 __execEventHandlers = function (evt) {
			if(!this.__EventHandlers) {return true;}
			evt = evt || window.event
			var events = this.__EventHandlers[evt.type];
			for(var i = 0, max = events.length; i < max; i++) {
				if(events[i] instanceof Function) {
					events[i].call(this);
				}
			}
		},

		/**
		 * 选择部分文本实现跨浏览器兼容
		 */
		selectText = function (text, start, stop) {
			if(text.setSelectionRange) {
				text.setSelectionRange(start, stop);
				text.focus();
			} else if (text.createTextRange) {
				var range = text.createTextRange();
				range.collapse(true);
				range.moveStart('character', start);
				range.moveEnd('character', stop - start);
				range.select();
			}
		},

		/**
		 * 多个input当输入到最大输入数时，模拟tab效果
		 */
		 tabForward = function (evt) {
			var e = this.getEvt(evt),
				target = this.getTarget(e);
			// 判断当前长度是否和指定长度一致
			if(target.value.length == target.maxLength) {
				// 遍历所有字段
				for(var i = 0, max = this.form.elements.length; i < max; i++) {
					if(this.form.elements[i] == target) {
						// 就把焦点移入下一个
						this.elements[i+1].focus();
						// 中途返回
						return;
					}
				}
			}
		 }
	};
});
// cookies
Global('Cookies.BY');
Cookies.BY = (function () {
	return {
		 /**
		  * 设置cookie
		  */
		 setCookie = function (name, value, expires, path, domain, secure) {
			var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			if(expires instanceof Date) {
				cookieText +=';expires=' + expires;
			}
			if(path) {
				cookieText += ';path=' + path;
			}
			if(domain) {
				cookieText += ';domain=' + domain;
			}
			if(secure) {
				cookieText += ';secure';
			}
			document.cookie = cookieText;
		 },
		 /**
		  * 获取cookie
		  */
		 getCookie = function (name) {
			var cookieName = encodeURIComponent(name) + '=';
			var cookieStart = document.cookie.indexOf(cookieName);
			var cookieValue = null;
			
			if(cookieStart > -1) {
				var cookieEnd = document.cookie.indexOf(';', cookieStart);
				if(cookieEnd == -1) {
					cookieEnd = document.cookie.length;
				}
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
			}
			return cookieValue;
		 },
		 /**
		  * 失效cookie
		  */
		 unsetCookie = function (name) {
			document.cookie = name + '=;expires=' + new Date(0);
		 }
	};
} ());

