/**
 * DOM代码汇总
 * @author baiyu
 * @date 2014-09-09
 * description 需要事先引入base.js
 */
 var BYDOM = Global.namespace('DOM.BY');
 
 BYDOM._getId = document.getElementById;
 
 BYDOM._getTagName = document.getElementsByTagName;
 
 /**
  * 根据id获取Element
  */
 BYDOM.getId = function (id, parent) {
	parent = parent || document;
	return  BYDOM._getId.call(parent, id);
 };
 
 /**
  * 通过标签名称查找Elements
  */
 BYDOM.getTagName = function (tagName, parent) {
	parent = parent || document;
	return  BYDOM._getTagName.call(parent, tagName);
 };
 
/**
 * 根据className查找Elements
 */
BYDOM.getClassName = function (className, parent) {
	parent = parent || document;
	var all = BYDOM._getTagName.call(parent, '*'),
		arr = [];
	for(var i = 0, max = all.length; i < max; i++) {
		if(all[i].className.indexOf(className) != -1) {
			arr.push(all[i]);
		}
	}
	return arr;
};
 
 /**
  * 将特殊符号进行直接转移
  */
 BYDOM.escape = function (str, ele) {
	var text = document.createTextNode(str);
	ele.appendChild(text);
 };
 
 /**
  * 删除空白节点
  */
 BYDOM.removeWhiteNodes = function (nodes) {
	for (var i = 0; i < nodes.childNodes.length; i ++) {
		if (nodes.childNodes[i].nodeType === 3 &&
		/^\s+$/.test(nodes.childNodes[i].nodeValue)) {
			nodes.childNodes[i].parentNode.removeChild(nodes.childNodes[i]);
		}
	}
	return nodes;
 };
 
 /**
  * 将newElement插入到targetElement之前
  */
 BYDOM.insertBefore = function (newElement, targetElement) {
	var parent = targetElement.parentNode;
	parent.insertBefore(newElement, targetElement);
 };
 
 BYDOM.insertAfter = function (newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild === targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
 };
 
 /**
  * createElement在IE6、7中创建iframe、input中的radio和checkbox、button元素时出现不兼容问题
  */
 BYDOM.createElement = function (str) {
	if(BYBOM.ua.browser.name == "Internet Explorer"
		&& BYBOM.ua.browser.ver <= 7) {
		element = document.createElement("<input type='" + str + "' name='sex'/>");
	} else {
		input = document.createElement('input');
		input.setAttribute('type', 'radio');
		input.setAttribute('name', 'sex');
	}
	return input;
 };
 
 /**
  * 复制节点，参数true为复制内容
  */
 BYDOM.clone = function (ele, flag) {
	if(flag) {
		return ele.cloneNode(flag);
	} else {
		return ele.cloneNode();
	}
 };
