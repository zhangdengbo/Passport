var ProductChoose = {
	
	/**
	 * 删除数据行
	 */	
	deleteRow : function(obj){
		$.messager.confirm('系统提示','是否删除此数据？',function(yes){
			if(yes) {
				$(obj).closest('tr').remove();	
			}
		});
	},
	
	/**
	 * 判断日期格式是否合法
	 * @param date
	 * @returns {Boolean}
	 */
	isDate : function(date){
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	    var result = date.match(reg);
	    if(result == null){return false};
	    var dt = new Date(result[1],result[3]-1,result[4]);
	    if(Number(dt.getFullYear())!=Number(result[1])){return false;}    
	    if(Number(dt.getMonth())+1!=Number(result[3])){return false;}    
	    if(Number(dt.getDate())!=Number(result[4])){return false;}
	 return true;
	},
	
	/**
	 * 增加一行
	 */
	addRow : function(){
		var index = $('.no_td:last').text();
		if(index == '' || index == 'undefined') {
			index = -1;
		}
		index++;
		var date = new Date();
		date.setDate(date.getDate()+3);
		var html = "<tr class='applyAddTr' id='addTrRow"+ index +"' index='"+index+"'>" 
					+ "<td class='no_td'>" + index + "<input type='hidden' class='productId' name='virtualProductId' id='productId"+index+"'/></td>"
					+ "<td class='productCodeTd'>" + "<input type='text' class='productCode' name='virtualProductCode' style='width: 85%;' id='productCode"+index+"'/>"
				    + "<a href='javaScript:void(0);' t_index='"+index+"'  class='chooseProduct' id='chooseProduct_"+index+"' style='display: inline;'>...</a>"
					+ "<p class='productCodeHtml' id='productCodeHtml"+index+"'></p></td>"
					+ "<td class='productSerialTd'>" + "<input type='text' class='productSerial' name='virtualProductSerial' id='productSerial"+index+"'/></td>"
					+ "<td class='productNameTd'>" + "<input type='text' readonly class='productName' name='virtualProductName'  id='productName"+index+"'/>"
					+ "<p class='productNameHtml' id='productNameHtml"+index+"'></p></td>"

					+ "<td class='productApplyNumTd'>" + "<input type='text' class='shuzi' name='virtualProductApplyNum' id='productApplyNum"+index+"'/></td>"
					
					+ "<td class='operate'>" + "<a href='javaScript:void(0)' onclick='ProductChoose.deleteRow(this)' style='color:blue' class='operateHref'>删行</a></td>" 
					+"</tr>";
		$('#procureAddTable').append(html);
		$.parser.parse($('#addTrRow'+index));
	},
	
	/**
	 * 验证表单&拼装数据
	 */
	checkFormAndSetData : function() {
		
		var applyDate = $('#procureApplyAddDiv').find("input[name='applyDate']").val();
		if(_isNull(applyDate)) {
			showMsg("请选择申请日期！",'error');
			return false;
		}
		var receiverPhone = $("#receiverPhone").val();
		var receiverName = $("#receiverName").val();
		var receiverAddress = $("#receiverAddress").val();
		var applyDept = $("#applyDept option:selected").val();   //申请部门
		var sourceType = $("#sourceType option:selected").val();   //来源类型
		if(_isNull(receiverName)) {
			showMsg("请输入收货人！",'error');
			return false;
		}
		if(_isNull(receiverAddress)) {
			showMsg("请输入收货地址！",'error');
			return false;
		}
		var procureApply = new Object();
		var productArray = new Array();
		//基础信息
		procureApply.id = $("#applyId").val();   //申请单Id
		procureApply.applyDateStr = applyDate;   //申请日期
		procureApply.applyDept = applyDept;
		procureApply.useDept = $("#useDept option:selected").val();       //使用部门
		procureApply.receiverName = receiverName;  //收货人
		procureApply.receiverAddress = receiverAddress;  //收货地址
		procureApply.receiverPhone = receiverPhone;    //联系电话
		procureApply.sourceType = sourceType;
		procureApply.priorityLevel = $("#priorityLevel option:selected").val();   //优先级
		procureApply.formCreator = $("#formCreator").val();  //制单人
		procureApply.comments = $("#comments").val();       //备注
		//是否可以提交
		var flag = true;
		
		$(".applyAddTr").each(function(i){
			var productObject = new Object();
			var index = i+1;   //数据行号
			var productCode = $(this).find("input[name='productCode']").val();
			var productApplyNum = $(this).find("input[name='productApplyNum']").val();
			if(_isNull(productCode) && _isNull(productApplyNum)) {
				return true;
			}else{
				if(_isNull(productCode)) {
					showMsg("第"+index+"行请输入系统中存在的商品编码！",'error');
					flag = false;
					return false;
				}
				if(_isNull(productApplyNum)) {
					showMsg("第"+index+"行请输入商品数量！",'error');
					flag = false;
					return false;
				}
				if(isNaN(productApplyNum) || productApplyNum < 1) {
					showMsg("第"+index+"行商品数量必须为大于零的正整数！",'error');
					flag = false;
					return false;
				}
				
				var productId = $(this).find("input[name='virtualProductId']").val();
				productObject.id = $(this).find("input[name='applyProductId']").val();
				productObject.productId = productId;   //商品id
				productObject.productSerial = $(this).find("input[name='virtualProductSerial']").val();
				productObject.productApplyNum = productApplyNum;  //商品数量
				productArray.push(productObject);
			}
		})
		
		procureApply.productList = productArray;
		if(flag){
			return procureApply;
		}else{
			return false;
		}
	},
	
	/**
	 * 跳转到采购申请编辑
	 */
	toApplyEdit : function(applyId) {
		$("#addApply").dialog('refresh',mapContextPath.get("contexPath") + "/view/procuremanage/procureApply/toApplyEdit?applyId="+applyId);
	},
	
	/**
	 * 更新申请单与商品信息
	 */
	updateApplyProduct : function() {
		
		var productSize = $('#procureApplyAddDiv').find("input[name='virtualProductCode']").length;
		if(productSize <= 0) {
			showMsg("请至少填写一条商品信息再保存！",'error');
			return false;
		}
		var data = ProductChoose.checkFormAndSetData();
		if(data.productList.length <= 0) {
			showMsg("请至少填写一条商品信息再提交！",'error');
			return false;
		}else{
			var productJson = JSON.stringify( data );
			$.ajax({
				type : "post",
				url : mapContextPath.get("contexPath") + '/procuremanage/updateApplyProductList/update',
				data : productJson,
				async : false,
				contentType : "application/json; charset=utf-8",
				dataType : 'json',
				success:function(response){
					if(response.code == 0) {
						showMsg('保存成功！','info');
						// 保存成功刷新dialog加载详情页
						ProductChoose.toApplyDetail(response.data.id);
					}else{
						showMsg(response.message, 'error',response.code);
					}
				},
				error : function(request, status, cause) {
					showMsg('系统异常，请联系管理员！','error',response.code);
				}
			})
		}
	},
	
	/**
	 * 关闭操作
	 * @param applyId
	 */
	toApplyClose : function(applyId) {
		$.ajax({
			type : "post",
			url : mapContextPath.get("contexPath") + '/procuremanage/executeApplyStatus/update',
			data : {'applyId':applyId},
			async : false,
			dataType : 'json',
			success:function(response){
				showMsg("操作成功！",'info');
				ProductChoose.toApplyDetail(response.data.id);
			},
			error : function(request, status, cause) {
				showMsg('系统异常，请联系管理员！','error',response.code);
			}
		})
	},
	/**
	 * 选择商品编码
	 * @param id
	 * @param code
	 * @param name
	 */
	onSelectProductCodeLi : function(trIndex,productId,productCode,productName,serialName) {

		//alert(trIndex +"----" +productCode) ;
		$("#productId"+trIndex).val(productId);
		$("#productCode"+trIndex).val(productCode);
		$("#productName"+trIndex).val(productName);
		$("#productSerial"+trIndex).val(serialName);
		// $("#productCodeHtml"+trIndex).hide();
	},

	/**
	 * @description by liwensuo at 2016-11-11
	 * @param trIndex
	 */
	clearonSelectProductCodeLi:function(trIndex){
		$("#productId"+trIndex).val("");
		$("#productCode"+trIndex).val("");
		$("#productName"+trIndex).val("");
		$("#productSerial"+trIndex).val("");
	},

	/**
	 * @descripton by liwensuo at 2016-11-11
	 * @param code
	 * @param index
	 */
	selectProductOfProcureApply:function(code , index){
        var dialogId = 'selectProductDialogId' ;
		$("<div></div>").dialog({
			id:dialogId ,
			title:'选择商品' ,
			href:mapContextPath.get("contexPath") + '/view/produceStorage/addProduceStorage/toChooseProduct?code='+code+'&isCombination=0&productIdsStr=11&isService=0' ,
			width:'65%',
			height:'78%',
			iconCls : 'icon-pencil',
			cache:false ,
			modal:true ,
			closed:false ,
			onClose:function(){
				$('#'+dialogId).dialog('destroy');
			} ,
			buttons:[{
				text:'确定',
				iconCls:'icon-ok',
				handler:function(){
					var checkedItems = $('#chooseProduceProductTable').datagrid('getChecked');
					if(checkedItems.length > 0 ){
						var productObj = checkedItems[0];
						var productId = productObj.productId;
						var productCode = productObj.productCode;
						var productName = productObj.productName;
						var serialName = productObj.serialName ;

						//var isSerialNum = productObj.isSerialNum;
						//var isPresale = productObj.isPresale;
						//var rolex = productObj.rolex;
						//var isCondition = productObj.isCondition;

						ProductChoose.onSelectProductCodeLi(index,productId ,productCode,productName,serialName)
						$('#'+dialogId).dialog('destroy');
					}else{
						showMsg('请先选择商品再保存！' , 'error') ;
					}
				}
			},
			{
				text:'关闭' ,
				iconCls:'icon-no' ,
				handler:function(){
					$('#'+dialogId).dialog('destroy');
				}

			}]
		});

	},
	
	/**
	 * 商品编码失焦
	 * @param index
	 */
	productCodeOnBlur : function( obj ){
		
		setTimeout(function(){
			var trIndex = $(obj).attr("id").replace("productCode","");   //所属trindex
			$('#productCodeHtml'+trIndex).hide();
		}, 500);
	},
	
	/**
	 * 商品编码得焦
	 * @param index
	 */
	productCodeOnFocus : function( obj ){
		
		var thisVal = $(obj).val();
		var trIndex = $(obj).attr("id").replace("productCode","");   //所属trindex
		if( _isNotNull( thisVal ) ){
			$('#productCodeHtml'+trIndex).show();
		}else{
			$('#productCodeHtml'+trIndex).hide();
		}
	},
	
	/**
	 * 商品名称失焦
	 * @param obj
	 */
	productNameOnBlur : function(obj) {
		
		setTimeout(function(){
			var trIndex = $(obj).attr("id").replace("productName","");   //所属trindex
			$('#productNameHtml'+trIndex).hide();
		}, 500);
	},
	
	/**
	 * 商品名称得焦
	 * @param index
	 */
	productNameOnFocus : function( obj ){
		
		var thisVal = $(obj).val();
		var trIndex = $(obj).attr("id").replace("productName","");   //所属trindex
		if( _isNotNull( thisVal ) ){
			$('#productNameHtml'+trIndex).show();
		}else{
			$('#productNameHtml'+trIndex).hide();
		}
	},
	
	
	/**
	 * 选择商品名称
	 * @param id
	 * @param code
	 * @param name
	 */
	onSelectProductNameLi : function(trIndex,productId,productCode,productName,serialName) {
		$("#productId"+trIndex).val(productId);
		$("#productCode"+trIndex).val(productCode);
		$("#productName"+trIndex).val(productName);
		$("#productSerial"+trIndex).val(serialName);
		$("#productNameHtml"+trIndex).hide();
	},
	
	/**
	 * 选中收货人时
	 */
	onSelectReceiverLi : function(id,name,phone,address) {
		$('#receiverName').val(name);
		$('#receiverPhone').val(phone);
		$('#receiverAddress').val(address);
		$('#receiverSelectHtml').parent().hide();
	}
}

$("#product_archives_id").on('click' , '.chooseProduct' , function(){
    var trIndex = $(this).attr('t_index') ;
    ProductChoose.selectProductOfProcureApply('' , trIndex);
});

$("#query_sku_edit_id").on('click' , '.chooseProduct' , function(){
    var trIndex = $(this).attr('t_index') ;
    ProductChoose.selectProductOfProcureApply('' , trIndex);
});