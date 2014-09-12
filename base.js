/**
 * 基础工具
 * @author baiyu
 * @date 2014-09-09
 */
var Global = Global || {};
Global._parent = window;
/**
 * 模块化
 */
Global.namespace = function (ns) {
	var arr = ns.split('.');
	if(arr[0] == "Global") { // delete "Global"
		arr.shift();
	}
	var obj = Global;
	for(var i = 0, max = arr.length; i < max; i++) {
		obj[arr[i]] = obj[arr[i]] || {};
		obj[arr[i]]._parent= obj;
		obj = obj[arr[i]];
	}
	return obj;
};
