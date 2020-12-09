var app = $.extend({}, app);/* 全局对象 */


function numberFormat(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
	if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
		obj.value = parseFloat(obj.value);
	}
	if (obj.value.length == 1 && obj.value == ".") {
		obj.value = "";
	}
}

/**
 * 将json字符串转成json对象
 * 
 * @param {}
 *            jsonStr
 * @return {}
 */
function serialiJson(jsonStr) {
	return eval('(' + jsonStr + ')');
}

/**
 * 动态创建json对象
 * 
 * @param {}
 *            jsonObj
 * @param {}
 *            key
 * @param {}
 *            value
 */
function createJson(jsonObj, key, value) {
	// 如果 value 被忽略
	if (typeof value === "undefined") {
		// 删除属性
		delete jsonObj[key];
	} else {
		// 添加 或 修改
		jsonObj[key] = value;
	}
	return jsonObj;
}

/**
 * 得到url路径 /开头标识本项目路径，其他表示外部系统路径（直接返回）
 * 
 * @param {}
 *            targetUrl
 * @param {}
 *            domain
 * @return {}
 */
function getUrl(targetUrl, domain) {
	if (!targetUrl || targetUrl == '') {
		return '';
	}
	if (/^\//.test(targetUrl)) { // 如果是/开头
		return domain + targetUrl;
	}
	return targetUrl;
}

// 验证手机号码合法性
function validateMobile(value) {
	/*var reg1 = /^13\d{9}$/;
	var reg2 = /^15[0-35-9]\d{8}$/;
	var reg3 = /^18[05-9]\d{8}$/;
	if (reg1.test(value) || reg2.test(value) || reg3.test(value)) {
		return true;
	}*/
	var reg= /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if(reg.test(value)){
		return true;
	}	 
	return false;
}

// 验证邮箱合法性
function validateMail(value) {
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if (reg.test(value)) {
		return true;
	}
	return false;
}

// 验证固话合法性
function validateTel(value) {
	var reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	if (reg.test(value)) {
		return true;
	}
	return false;
}

// 验证邮编合法性
function validatePostal(value) {
	var reg = /^[a-zA-Z0-9 ]{3,12}$/;
	if (reg.test(value)) {
		return true;
	}
	return false;
}

/**
 * 时间戳转换时间
 * 
 * @param {}
 *            tm
 * @return {} 如：2011-3-16 16:50:43 格式
 */
function getLocalTime(tm) {
	var tt;
	if (tm.toString().length == 13) {
		tt = new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-")
				.replace(/日/g, " ").replace(/\//g, "-");

	} else {
		tt = new Date(parseInt(tm) * 1000).replace(/年|月/g, "-").replace(/日/g,
				" ").replace(/\//g, "-");
	}
	return tt;
}

/**
 * 时间戳转换时间
 * 
 * @param {}
 *            tm
 * @return {} 如：2011年3月16日 16:50:43 格式
 */
function getLocalTimeCN(tm) {
	var tt
	if (tm.toString().length == 13) {
		tt = new Date(parseInt(tm)).toLocaleString().replace(/\//g, "-");
	} else {
		tt = new Date(parseInt(tm) * 1000).toLocaleString().replace(/\//g, "-");
	}
	return tt;
}




function dateToStr(formatStr, date){
	formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
	date = arguments[1] || new Date();
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
    str=str.replace(/yyyy|YYYY/,date.getFullYear());   
    str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
    str=str.replace(/MM/,date.getMonth()>=9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));   
    str=str.replace(/M/g,date.getMonth());   
    str=str.replace(/w|W/g,Week[date.getDay()]);   
  
    str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
    str=str.replace(/d|D/g,date.getDate());   
  
    str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
    str=str.replace(/h|H/g,date.getHours());   
    str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
    str=str.replace(/m/g,date.getMinutes());   
  
    str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
    str=str.replace(/s|S/g,date.getSeconds());   
  
    return str;   
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的串
 * @param fmt
 * @return 将date类型转换为yyyy-MM-dd 或者 yyyy-MM-dd hh:ss:mm形式
 */
Date.prototype.Format = function (fmt) {
	
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	
	for (var k in o){
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	
	return fmt;
}

String.prototype.trim = function(){     
	return this.replace(/(^\s*)|(\s*$)/g, "");     
};

/**
 * 删除重复数据
 * @param data
 * @returns {___anonymous2681_2684}
 */
function uniqueArray(data){   
    data = data || [];   
        var a = {};   
    for (var i=0; i<data.length; i++) {   
        var v = data[i];   
        if (typeof(a[v]) == 'undefined'){   
            a[v] = 1;   
        }   
    };   
    data.length=0;   
    for (var i in a){   
        data[data.length] = i;   
    }   
    return data;   
}  

/*------------------------------转码和解码-----------------------*/
/*转码*/
function _encodeURI(data){
	return encodeURIComponent(data);
}

/*解码*/
function _decodeURI(data){
	return decodeURIComponent(data);
}

/*-------------------------------------content verify-----------------------------------*/
/*获得指定Id内容
 */
function _getTagValueById(tagId){
	return $("#" + tagId).val();
}

/*判断是否为空*/
function _isNotNull(value){
	return !(value == undefined || value == null || $.trim(value) == "");
}

/*判断是否为空*/
function _isNull(value){
	return value == undefined || value == null || $.trim(value) == "";
}

/**
 * 判断某值不是undefined
 * @param value
 * @returns {Boolean}
 */
function _isNotUndefined(value){
	return !(typeof(value) == 'undefined');
}

/**
 * 判断某值是undefined
 * @param value
 * @returns {Boolean}
 */
function _isUndefined(value){
	return (typeof(value) == 'undefined' || value == 'undefined');
}

/* 清空后追加 - 绑定数据到指定标签中
 * tagId : 指定标签绑定
 * tag ：绑定的标签
 */
function _binding_Clear_Empty(tagId,tag){
	/*清空标签*/
	$("#" + tagId).empty();
	$("#" + tagId).append(tag);
}

/*直接追加 - 绑定数据到指定标签中
 * tagId : 指定标签绑定
 * tag ：绑定的标签
 */
function _binding(tagId,tag){
	$("#" + tagId).append(tag);
}

/**
 * html添加
 * @param tagId
 * @param tag
 */
function _html(tagId,tag){
	$("#" + tagId).html(tag);
}

/*-------------------------------------隐藏 - 显示-----------------------------------*/
function _tagHide(tagId){
	$("#"+tagId).hide();
}

function _tagShow(tagId){
	$("#"+tagId).show();
}

function _tagStyleHide(tagId){
	$("#"+tagId).attr("display","none");
}

function _tagStyleShow(tagId){
	$("#"+tagId).attr("display","");
}

/*-------------------------------------设置 html标签，赋值，-----------------------------------*/
/*
	赋值  value="value"
*/
function _setValue(tagId,value){
	$("#"+tagId).val(value);
}

function _setText(tagId,value){
	$("#"+tagId).text(value);
}

function _setTextEmpty(tagId,value){
	$("#"+tagId).text("");
	$("#"+tagId).text(value);
}

/*-------------------------------------验证是否为函数-----------------------------------*/

function _verifyFunction(call){
	if (typeof (call) == 'function') {
		return true;
	}
	return false;
}

//JS版
//将传入数据转换为字符串,并清除字符串中非数字与.的字符
//按数字格式补全字符串
function getFloatStr(num){
    num += '';
    num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
    if(/^0+/) //清除字符串开头的0
        num = num.replace(/^0+/, '');
    if(!/\./.test(num)) //为整数字符串在末尾添加.00
        num += '.00';
    if(/^\./.test(num)) //字符以.开头时,在开头添加0
        num = '0' + num;
    num += '00';        //在字符串末尾补零
    num = num.match(/\d+\.\d{2}/)[0];
    return num;
};


//* 名　　称：DataLength 
//* 功    能：计算数据的长度 
//* 入口参数：fData：需要计算的数据 
//* 出口参数：返回fData的长度(Unicode长度为2，非Unicode长度为1) 
function DataLength(fData) {
    var intLength=0 
    for (var i=0;i<fData.length;i++) {
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)) 
            intLength=intLength+2 
        else 
            intLength=intLength+1    
    } 
    return intLength 
} 

//获取contextpat
function getContextPath() {
	var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var result = pathName.substr(0,index+1);
	return result;
}

//处理ERP ResponseModel 返回结果
function handleResponseModel(code){
	var flag = false;
	switch (code) {
		case 0:
			flag = true;
			var options = {
					title : "操作提示",
					msg : "保存成功！",
					showType : 'slide',
					timeout : 5000
			};
			$.messager.show(options);
			break;
		case 20001:
			var options = {
				title : "操作提示",
				msg : "数据已存在！",
				showType : 'slide',
				timeout : 5000
			};
			$.messager.show(options);		
			break;

		default:
			var options = {
				title : "操作提示",
				msg : "数据处理失败！",
				showType : 'slide',
				timeout : 5000
			};
			$.messager.show(options);
			break;
	}
	return flag;
}

/**
 * pageData用来封装获取的总条数和当前页数据
 * @param list 当前页数据
 * @param total 总条数
 * @returns
 */
function pageData(list, total) {
	var obj = new Object();
	obj.total = total;
	obj.rows = list;
	return obj;
}

/**
 *  创建一个新的选项卡
 * @param title 选项卡名称
 * @param href  选项卡页面链接
 */
function createTab(title,tabUrl) {

	
	var $tabPanel = $('#wu-tabs');
	//关闭
	$tabPanel.tabs('close',title);
	//创建
	$tabPanel.tabs('add', {
		title : title,
		type : "post",
		closable : true ,
		href : tabUrl,
		iconCls : 'icon-award-star-gold-1',
		fit : true,
		cls : 'pd3'
	});	
}

/**
 * 提示信息
 * @param infoType 信息类型
 * @param msg 信息详情
 */
function showMsg(msg,infoType,code){
	if(code && code == 10003){
		window.location.href='login';
		return;
	}

	if(infoType == 'error'){
		msg = "<span style='color:red'>"+msg+"</span>";
	}
	var options = {
		title : '系统提示',
		msg : msg,
		showType : 'slide',
		timeout : 5000
	};
	$.messager.show(options);
}

/**
 * 验证是否数字
 * @param input
 * @returns {Boolean}
 */
function _isNum(nubmer) {
	var reR = /^\+?[1-9][0-9]*$/; //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
	if (reR.test(nubmer)) {
		return true;
	}
	return false;
}

/**
 * 是否为合法的decimal(10,5)
 * @param 
 * @returns {Boolean}
 */
function isDecimal(str) {
	var regex=/^([1-9][\d]{0,7}|0)(\.[\d]{1,5})?$/;
	if(!regex.test(str)){
		return false;
	}
	return true;
}

/**
 * 数组添加contains属性
 */
Array.prototype.contains = function(obj){
	var i = this.length;
	while(i--){
		if(this[i]===obj){
			return true;
		}
	}
	return false;
}

/**
 * 字符串已**开始
 */
String.prototype.startWith=function(str){  
    if(str==null||str==""||this.length==0||str.length>this.length)  
      return false;  
    if(this.substr(0,str.length)==str)  
      return true;  
    else  
      return false;  
    return true;  
}

/**
 * 字符串以**结束
 */
String.prototype.endWith=function(str){  
    if(str==null||str==""||this.length==0||str.length>this.length)  
      return false;  
    if(this.substring(this.length-str.length)==str)  
      return true;  
    else  
      return false;  
    return true;  
}  

var Utils = {
	
	/**
	 * 格式化数值为指定位数的小数
	 * @param v 值
	 * @param bit 指定的位数(20以内)
	 */
	toFormatDecimal  : function( v,bit ){
		
		if( _isNotNull(v) && !isNaN(v) && bit < 20 ){
			var vJia = new Number( (v*1)+1 ).toFixed( bit );  
			var vJian = new Number( vJia-1 ).toFixed( bit );
			return vJian;
		}else{
			return '';
		}
	},
	
	/**
	 * 解析扫码枪扫描后返回的JSON 抓取相应信息
	 * @param jsonStr
	 */
	analyticalJsonResut : function ( jsonStr ){
		
		//手动输入
		if( jsonStr.indexOf('{') <0 || jsonStr.indexOf('}') <0 || jsonStr.indexOf(':') <0 || jsonStr.indexOf('SN') <0 ){
			//扫描枪扫描
			return jsonStr;
		}
		
		try{
			  var jsonObj = eval('(' + jsonStr + ')'); 
			  
			  if( _isNotUndefined(jsonObj.SN) ){
				  
				 return jsonObj.SN;
				 
			  }else{
				 alert('数据有误');
				 return '';
			  }
		}catch(e){
			alert('数据有误');
			return '';
		}
	},
	
	// 查看电话
	viewTel : function(obj,id,type,module){
		$(obj).tooltip('destroy');
		var param = {'sourceId' : id,'type' : type,'sourceModule' : module};
		$.ajax({
			type : "post",
			url : '/comm/tel/view',
			data : param,
			dataType : 'json',
			async : false,
			cache : false,
			success : function(response) {
				var code = response.code;
				if (code == 0) {
					var textV = response.data;
					$(obj).parent().text(textV);
				}
				else {
					showMsg(response.message, 'error', code);
				}
			},
			error : function(request, status, cause) {
				showMsg('系统异常，请联系管理员！', 'error');
			}

		});
	},
	// 查看电话
	viewTelShow : function(obj,id,type,module){
		$(obj).tooltip('destroy');
		var param = {'sourceId' : id,'type' : type,'sourceModule' : module};
		$.ajax({
			type : "post",
			url : '/comm/tel/view',
			data : param,
			dataType : 'json',
			async : false,
			cache : false,
			success : function(response) {
				var code = response.code;
				if (code == 0) {
					var textV = response.data;
					var _parent = $(obj).parent();
					$(obj).remove();
					_parent.prepend(textV);
					//$(obj).parent().text(textV);
				}
				else {
					showMsg(response.message, 'error', code);
				}
			},
			error : function(request, status, cause) {
				showMsg('系统异常，请联系管理员！', 'error');
			}

		});
	},
	
    // 查看电话
    get_tel : function(id,type,module){
        var param = {'sourceId' : id,'type' : type,'sourceModule' : module};
        var phone = '';
        $.ajax({
            type : "post",
            url : 'comm/tel/view',
            data : param,
            dataType : 'json',
            async : false,
            cache : false,
            success : function(response) {
                var code = response.code;
                if (code == 0) {
                    var textV = response.data;
                    phone = textV;
                }
                else {
                    showMsg(response.message, 'error', code);
                }
            },
            error : function(request, status, cause) {
                showMsg('系统异常，请联系管理员！', 'error');
            }

        });
        return phone;
    },

	/**
	 * 日期计算
	 * @param interval
	 * @param number
	 * @param date
	 * @returns {*}
	 * @constructor
	 */
	DateAdd : function(interval, number, date) {
	switch (interval) {
		case "y": {
			date.setFullYear(date.getFullYear() + number);
			return date;
			break;
		}
		case "q": {
			date.setMonth(date.getMonth() + number * 3);
			return date;
			break;
		}
		case "M": {
			date.setMonth(date.getMonth() + number);
			return date;
			break;
		}
		case "w": {
			date.setDate(date.getDate() + number * 7);
			return date;
			break;
		}
		case "d": {
			date.setDate(date.getDate() + number);
			return date;
			break;
		}
		case "h": {
			date.setHours(date.getHours() + number);
			return date;
			break;
		}
		case "m": {
			date.setMinutes(date.getMinutes() + number);
			return date;
			break;
		}
		case "s": {
			date.setSeconds(date.getSeconds() + number);
			return date;
			break;
		}
		default: {
			date.setDate(d.getDate() + number);
			return date;
			break;
		}
	}
   },
   /**
    * 计算两个日期的差
    */
   GetDateDiff:function (startTime, endTime, diffType) {
		//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
		startTime = startTime.replace(/\-/g, "/");
		endTime = endTime.replace(/\-/g, "/");
		//将计算间隔类性字符转换为小写
		diffType = diffType.toLowerCase();
		var sTime = new Date(startTime); //开始时间
		var eTime = new Date(endTime); //结束时间
		//作为除数的数字
		var timeType = 1;
		switch(diffType) {
			case "second":
				timeType = 1000;
				break;
			case "minute":
				timeType = 1000 * 60;
				break;
			case "hour":
				timeType = 1000 * 3600;
				break;
			case "day":
				timeType = 1000 * 3600 * 24;
				break;
			default:
				break;
		}
		return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(timeType));
	},
	/**
	 * @description 判断是等于 UNDEFINED
	 * @param value
	 * @returns {boolean}
	 * @private
	 * @author liwensuo
	 */
	isUNDEFINEDStr:function(value){
		return ("UNDEFINED" == value) ;
},

	/**
	 * 扫码枪：发票
	 * @param jsonStr
	 */
	analyseInvoiceInfoByScanner : function ( str ){
		var resultArray = new Array();
		if(_isNull(str) || _isUndefined(str)){
			alert("数据有误，请检查！");
			return;
		}
		var len = (str.split(',')).length - 1;
		if(len != 8){
			alert("数据格式有误，请检查！");
			return;
		}
		var analysisResult = str.split(',');
		resultArray.push(analysisResult[3]);
		resultArray.push(analysisResult[4])
		resultArray.push(analysisResult[5]);
		resultArray.push(analysisResult[2]);
		return resultArray;
	},

    /**
	 * 禁止输入汉字
	 *
     * @param str
     * @returns {string}
     */
	unChineseCharacter : function( str ){
        var result=""
        for(var i=0;i<str.length;i++){
            if(str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255){
                result += str.charAt(i);
            }
		}
        return result;
	}

}
var playSound = (function beep() {
    var snd = new Audio("http://resources.edianzu.cn/music/error/Windows_Error.wav");
    return function() {
        snd.play();
    }
})();


function onlyInt(obj) {
    if(obj.value.length==1){
    	obj.value=obj.value.replace(/[^0-9]/g,'')
    } else {
    	obj.value=obj.value.replace(/\D/g,'')
    }
}

function validateAmount(obj) {
	obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
	obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的   
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
	  obj.value= parseFloat(obj.value);  
    }else{
    	if(obj.value.indexOf(".")==0){
    		obj.value = obj.value.replace(".","");
    	}
    }    
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

/**
 * 获取默认储位
 * @param warehouseId
 */
function isDefaultLocation(warehouseId){
	var locationCode = "";
	if(warehouseId == 3){
        locationCode = "CHUSHI-BJ";
	}else if(warehouseId == 4){
        locationCode = "CHUSHI-SH";
	}else if(warehouseId == 6031){
        locationCode = "CHUSHI-WH";
    }else if(warehouseId == 6032){
        locationCode = "CHUSHI-SZ";
    }
    return locationCode;
}

/**
 * 图片等比缩放
 * @param ImgD
 * @param FitWidth
 * @param FitHeight
 * @constructor
 */
function DrawImage(ImgD,FitWidth,FitHeight){
    var image=new Image();
    image.src=ImgD.src;
    if(image.width>0 && image.height>0){
        if(image.width/image.height>= FitWidth/FitHeight){
            if(image.width>FitWidth){
                ImgD.width=FitWidth;
                ImgD.height=(image.height*FitWidth)/image.width;
            }else{
                ImgD.width=image.width;
                ImgD.height=image.height;
            }
        } else{
            if(image.height>FitHeight){
                ImgD.height=FitHeight;
                ImgD.width=(image.width*FitHeight)/image.height;
            }else{
                ImgD.width=image.width;
                ImgD.height=image.height;
            }
        }
    }
}

/**
 * 获取mac地址
 */
function getMac() {
	$.ajax({
		type: 'post',
		url: 'http://localhost:39938/getMac',
		contentType: 'application/json;charset=UTF-8',
		timeout: 30000,
		cache: false,
		async: true,
		success: function (res) {
			$('#mac_value').val(res);
		},
		error: function (res) {
			$('#mac_value').val('error');
		}
	});
}