window.addEventListener('message',function(e){
	var csDate = e.data;
	addTab(csDate.split(",")[0], csDate.split(",")[1], "icon-award-star-gold-1", false);
	$("#daohang").hide();
},false);
$(function() {
	var onlyOpenTitle = '首页';
	var base_path = $("#hid_url").val();

	$('#tree_node').accordion({
	       fillSpace: true,
	       fit: true,
	       border: false,
	       animate: false
	});

	$.ajax({
		url : $("#hid_admin_url").val() + '/index.php?r=default/left',
		type : 'GET',
		data : {
			'is_hide' : 1,
			'app_id' : 61
		},
		crossDomain : true,
		dataType : 'jsonp',
		timeout : 5000,
		error : function() {
			console.log('error');
		},
		success : function(data) {
			if (data) {
				var nav = "";
				if ($.isArray(data.menus)) {
					$(data.menus).each(function(index, e) {
						if (e.label && e.label == "华清工作台" && $.isArray(e.navList)) {
							$(e.navList).each(function(indexNav, eNav) {
								var content ="";
								var selected =false;
								if(indexNav == 0){
									selected = true;
								}
								content +=  "<div  title=\""+eNav.label+"\" data-options=\"iconCls:'icon-application-cascade'\" style=\"padding: 5px;\">";
								if(eNav.navList && $.isArray(eNav.navList)){
									content += "<ul class=\"easyui-tree wu-side-tree\">";
									$(eNav.navList).each(function(indexSubNav, eSubNav){
										content += "<li iconCls=\"icon-award-star-gold-1\">"
											+ "<a href=\"javascript:void(0);\" name=\"_tree_node_\" data-icon=\"icon-award-star-gold-1\" data-link=\""
											+ eSubNav.link 
											+ "\" iframe=\"0\">"
											+ eSubNav.label 
											+ "</a></li>"; 
										
									});
									content += "</ul></div>";
								}

								$('#tree_node').accordion('add',{
			                        title: eNav.label,
			                        selected: selected,
			                        content:content,
			                    });

							});
						}
					});
					$(".easyui-tree .tree-node").on("click", function() {
						var $aElement = $(this).find("a[name='_tree_node_']");
						var title = $aElement.text();
						var url = $aElement.attr('data-link');
						var iconCls = $aElement.attr('data-icon');
						var iframe = $aElement.attr('iframe') == 1 ? true : false;
						addTab(title, url, iconCls, iframe);
					});
				}
			}
		}
	});
	
	$(".easyui-tree .tree-node").on("click", function() {
		var $aElement = $(this).find("a[name='_tree_node_']");
		var title = $aElement.text();
		var url = $aElement.attr('data-link');
		var iconCls = $aElement.attr('data-icon');
		var iframe = $aElement.attr('iframe') == 1 ? true : false;
		addTab(title, url, iconCls, iframe);
	});

	/**
	 * 选项卡初始化
	 */
	$('#wu-tabs').tabs({
		tools : [{
			iconCls : 'icon-reload',
			border : false,
			handler : function() {
				$('#wu-datagrid').datagrid('reload');
			}
		}],
		onContextMenu : function(e, title, index) {
			e.preventDefault();
			if (index > 0) {
				$('#index_right_click').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data("tabTitle", title);
			}
		}
	});

	/**
	 * 右键菜单click
	 */
	$("#index_right_click").menu({
		onClick : function(item) {
			rightClickTab(item.id);
		}
	});

	/**
	 * 事件执行
	 */
	function rightClickTab(action) {
		var alltabs = $('#wu-tabs').tabs('tabs');
		var currentTab = $('#wu-tabs').tabs('getSelected');
		var allTabtitle = [];
		$.each(alltabs, function(i, n) {
			allTabtitle.push($(n).panel('options').title);
		})
		switch (action) {
			case "refresh":
				var url = currentTab.panel('options').href;
				currentTab.panel('refresh', url);
				break;
			case "close":
				var currtab_title = currentTab.panel('options').title;
				$('#wu-tabs').tabs('close', currtab_title);
				break;
			case "closeall":
				$.each(allTabtitle, function(i, n) {
					if (n != onlyOpenTitle) {
						$('#wu-tabs').tabs('close', n);
					}
				});
				break;
			case "closeother":
				var currtab_title = currentTab.panel('options').title;
				$.each(allTabtitle, function(i, n) {
					if (n != currtab_title && n != onlyOpenTitle) {
						$('#wu-tabs').tabs('close', n);
					}
				});
				break;
			case "closeright":
				var tabIndex = $('#wu-tabs').tabs('getTabIndex', currentTab);
				$.each(allTabtitle, function(i, n) {
					if (i > tabIndex) {
						if (n != onlyOpenTitle) {
							$('#wu-tabs').tabs('close', n);
						}
					}
				});
				break;
			case "closeleft":
				var tabIndex = $('#wu-tabs').tabs('getTabIndex', currentTab);
				$.each(allTabtitle, function(i, n) {
					if (i < tabIndex) {
						if (n != onlyOpenTitle) {
							$('#wu-tabs').tabs('close', n);
						}
					}
				});
				break;
		}
	}

	/**
	 * 添加菜单选项 title 名称 href 链接 iconCls 图标样式 iframe
	 * 链接跳转方式（true为iframe，false为href）
	 */
	function addTab(title, href, iconCls, iframe) {
		// removeTab();
		var tabPanel = $('#wu-tabs');
		if (!tabPanel.tabs('exists', title)) {
			if (iframe) {
				tabPanel.tabs('add', {
					title : title,
					iconCls : iconCls,
					fit : true,
					cls : 'pd3',
					closable : true
				});
			}
			else {
				tabPanel.tabs('add', {
					title : title,
					closable : true,
					href : href,
					iconCls : iconCls,
					fit : true,
					cls : 'pd3'
				});
			}
		}
		else {
			tabPanel.tabs('select', title);
		}
	}

	/**
	 * 移除菜单选项
	 */
	function removeTab() {
		var tabPanel = $('#wu-tabs');
		var tab = tabPanel.tabs('getSelected');
		if (tab) {
			var index = tabPanel.tabs('getTabIndex', tab);
			tabPanel.tabs('close', index);

		}
	}

	$("#login_out").on("click", function() {
		var token = getCookieValue("token");
		if (token) {
			$.ajax({
				type : 'post',
				url : 'permission/login_out',
				dataType : 'json',
				data : {
					"token" : token
				},
				success : function(response) {
					if (response.code == 0) {
						login_out();
					}
				},
				error : function(request, status, cause) {

				}
			});
		}
	});

	// 获取cookie
	function getCookieValue(cookieName) {
		var cookieValue = document.cookie;
		var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
		if (cookieStartAt == -1) {
			cookieStartAt = cookieValue.indexOf(cookieName + "=");
		}
		if (cookieStartAt == -1) {
			cookieValue = null;
		}
		else {
			cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
			cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
			if (cookieEndAt == -1) {
				cookieEndAt = cookieValue.length;
			}
			cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt));// 解码latin-1
		}
		return cookieValue;
	}

	/**
	 * 修改密码
	 */
	$("#modify_password").click(function() {

		/**
		 * 详情查询 title 名称 href 链接 iconCls 图标样式 iframe
		 * 链接跳转方式（true为iframe，false为href）
		 */

		var dtWith = document.body.clientWidth * 0.3;
		var dtHeight = document.body.clientHeight * 0.4;

		$("<div></div>").dialog({
			id : 'modify_user_password',
			title : '修改密码',
			href : 'view/permission/user/modifyPassword',
			width : dtWith,
			height : dtHeight,
			iconCls : 'icon-help',
			cache : false, // 禁止缓存
			modal : true,
			closed : false,
			onClose : function() {
				$("#modify_user_password").dialog('destroy');
			},
			buttons : [{
				text : '提交',
				id : 'submit',
				iconCls : 'icon-save',
				handler : function() {
					var url = "permission/user/updateUser/modifyPassword";
					$('#modify_user_password_submit').form('submit', {
						url : url,
						onSubmit : function() {
							if ($(this).form('enableValidation').form('validate')) {
								var rex = new RegExp("^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{8,20}$");
								var pwd = $("input[name='currentPassword']").val();
								var pwd2 = $("input[name='currentPassword2']").val();
								if (!rex.test(pwd)) {
									errorMsg('输入提示', '密码须包含字母、数字，且位数为8-20位!', '');
									return false;
								}
								if (pwd != pwd2) {
									errorMsg('输入提示', '两次密码输入不一致!', '');
									return false;
								}
							}
							else {
								return false;
							}
						},
						success : function(data) {
							data = jQuery.parseJSON(data);
							if (data.code != 0) {
								errorMsg('', data.message, '');
							}
							else {
								successMsg('', '', '');
								$("#modify_user_password").dialog('destroy');
							}

						},
						error : function() {
							errorMsg('', '', '');
						}
					});

				}
			}, {
				text : '关闭',
				iconCls : 'icon-cancel',
				handler : function() {
					$("#modify_user_password").dialog('destroy');
				}
			}]
		});

	});

	// 校验密码是否更改
	var checkpwd = $("#checkpwd").val();
	if (checkpwd == "false") {
		errorMsg('安全提示', '用户密码不安全，请更改密码！', '');

		var dtWith = document.body.clientWidth * 0.3;
		var dtHeight = document.body.clientHeight * 0.4;

		$("<div></div>").dialog({
			id : 'modify_user_password',
			title : '修改密码',
			href : 'view/permission/user/modifyPassword',
			width : dtWith,
			height : dtHeight,
			iconCls : 'icon-help',
			cache : false, // 禁止缓存
			modal : true,
			closed : false,
			closable : false,
			buttons : [{
				text : '提交',
				id : 'submit',
				iconCls : 'icon-save',
				handler : function() {
					var url = "permission/user/updateUser/modifyPassword";
					$('#modify_user_password_submit').form('submit', {
						url : url,
						onSubmit : function() {
							if ($(this).form('enableValidation').form('validate')) {
								var rex = new RegExp("^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{8,20}$");
								var pwd = $("input[name='currentPassword']").val();
								var pwd2 = $("input[name='currentPassword2']").val();
								if (!rex.test(pwd)) {
									errorMsg('输入提示', '密码须包含字母、数字，且位数为8-20位!', '');
									return false;
								}
								if (pwd != pwd2) {
									errorMsg('输入提示', '两次密码输入不一致!', '');
									return false;
								}
							}
							else {
								return false;
							}
						},
						success : function(data) {
							data = jQuery.parseJSON(data);
							if (data.code != 0) {
								errorMsg('', data.message, '');
							}
							else {
								successMsg('', '', '');
								$.cookie("enc", null);
								$("#modify_user_password").dialog('destroy');

							}

						},
						error : function() {
							errorMsg('', '', '');
						}
					});

				}
			}]
		});
	}

	// 获取mac地址
	getMac();
});

function login_out() {
	window.location.href = 'login';
}

/**
 * 成功提示消息
 */
var successMsg = function(title, msg, showType) {
	if (_isNull(title)) {
		title = '提示'
	}
	if (_isNull(msg)) {
		msg = '操作成功！'
	}
	if (_isNull(showType)) {
		showType = 'slide'
	}
	var options = {
		title : title,
		msg : msg,
		showType : showType,
		timeout : 500
	};
	$.messager.show(options);
}

/**
 * 错误提示消息
 */
var errorMsg = function(title, msg, showType) {
	if (_isNull(title)) {
		title = '提示'
	}
	if (_isNull(msg)) {
		msg = '操作失败！'
	}
	if (_isNull(showType)) {
		showType = 'slide'
	}
	var options = {
		title : title,
		msg : msg,
		showType : showType,
		timeout : 500
	};
	$.messager.show(options);
}

/**
 * 创建Frame
 */
function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0" src="' + url + '" style="width:100%;height:99%;"></iframe>';
	return s;
}
