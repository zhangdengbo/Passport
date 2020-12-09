/**
 * 
 * @param asyncFlag false 同步加载,true异步加载
 * @param url		提交到一般处理程序请求数据
 * @param data		参数传递
 * @param fromId	表单提交id
 * @param errorCall 错误回调方法
 * @param successCall 成功回调方法
 */
var _ajax_simple_post=function(asyncFlag,dataType,contentType, url, params, fromId,map,errorCall,successCall) {
	/*参数绑定*/
	var _parameter = "";
	if (_isNotNull(fromId)) {
		_parameter = $("#" + fromId).serialize();// 表单序列化
	} else if(_isNotNull(params)){
		_parameter = "ajax=true&" + params;// 参数化
	}
	/*if (_isNull(contentType)) {
		contentType="application/json; charset=utf-8";
	}*/
	$.ajax({
		type : "post",// get post
		cache : false,// 从页面缓存获取加载信息
		async : asyncFlag, // false 同步加载,true异步加载
		dataType : dataType,// xml/json/html/script/jsonp
		url : url, // 提交到一般处理程序请求数据
		data : _parameter,
		//contentType: contentType, 
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (_verifyFunction(errorCall)) {
				errorCall(data);
			} else {
				_showError(XMLHttpRequest, textStatus, errorThrown);
			}
		},
		success : function(data) {
			if (_verifyFunction(successCall)) {
				successCall(data,map);
			}
		}
	});
}


/**
 * get 提交
 * @param asyncFlag
 * @param dataType
 * @param url
 * @param params
 * @param fromId
 * @param map
 * @param errorCall
 * @param successCall
 */
var _ajax_simple_get=function(asyncFlag,dataType, url, params, fromId,map,errorCall,successCall) {
	/*参数绑定*/
	var _parameter = "";
	if (_isNotNull(fromId)) {
		_parameter = $("#" + fromId).serialize();// 表单序列化
	} else if(_isNotNull(params)){
		_parameter = "ajax=true&" + params;// 参数化
	}
	$.ajax({
		type : "GET",// get post
		cache : false,// 从页面缓存获取加载信息
		async : asyncFlag, // false 同步加载,true异步加载
		dataType : dataType,// xml/json/html/script/jsonp
		url : url, // 提交到一般处理程序请求数据
		data : _parameter,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (_verifyFunction(errorCall)) {
				errorCall(data);
			} else {
				_showError(XMLHttpRequest, textStatus, errorThrown);
			}
		},
		success : function(data) {
			if (_verifyFunction(successCall)) {
				successCall(data,map);
			}
		}
	});
}

/**
 * 
 * @param asyncFlag false 同步加载,true异步加载
 * @param url		提交到一般处理程序请求数据
 * @param data		参数传递
 * @param errorCall 错误回调方法
 * @param successCall 成功回调方法
 */
/*function _ajax_submit(asyncFlag,dataType, url, params,errorCall,successCall) {
	var _parameter = "ajax=true&" + params;
	$.ajax({
		type : "post",// get post
		cache : false,// 从页面缓存获取加载信息
		async : asyncFlag, // false 同步加载,true异步加载
		dataType : dataType,// xml/json/html/script/jsonp
		url : url, // 提交到一般处理程序请求数据
		data : _parameter,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (_verifyFunction(errorCall)) {
				errorCall(data);
			} else {
				_showError(XMLHttpRequest, textStatus, errorThrown);
			}
		},
		success : function(data) {
			if (_verifyFunction(successCall)) {
				//alert(data.reload);
				successCall(data.reload);
			}else{
				window.location.reload();
			}
		}
	});
}*/


/*错误统一处理*/
function _showError(XMLHttpRequest, textStatus, errorThrown) {
	var status = XMLHttpRequest.status;
	/*if (401 == status) {//
		alert("访问被拒绝!");
		return;
	} else if (403 == status) {
		alert("禁止访问!");
		return;
	} else if (404 == status) {
		alert("未找到对应的资源!");
		return;
	} else {
		alert("服务出错，无法访问!");
		return;
	}*/
}

