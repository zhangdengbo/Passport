
var $userDatagridTable = $('#userDatagridTable');

function pageData(list, total) {
    var obj = new Object();
    obj.total = total;
    obj.rows = list;
    return obj;
}

var  userSpace = {
    //初始化表格数据
    initDataTable : function() {
        debugger;
        var opts = $userDatagridTable.datagrid('options');
        debugger;
        userSpace.getDataList(opts.pageNumber, opts.pageSize);
    },
    //刷新表格数据
    reloadDataTable : function() {
        var opts =  $userDatagridTable.datagrid('options');
        var $pageCount = $("#userDatagridTable_pageSize");
        userSpace.getDataList(opts.pageNumber, $pageCount.val());
    },
    /**
     * 请求列表数据
     * @param pageNumber
     * @param pageSize
     */
    getDataList : function (pageNumber,pageSize){
        //设置开始页
        $("#userDatagridTable_pageNumber").val(pageNumber);
        //设置每页条数
        $("#userDatagridTable_pageSize").val(pageSize);

        // 重置
        $userDatagridTable.datagrid('getPager').pagination({
            pageSize : pageSize,
            pageNumber : pageNumber
        });
        // 加屏蔽
        $userDatagridTable.datagrid("loading");
        $.ajax({
            type : "post",
            dataType : "json",
            url: "/findUsers",
            data : {},
            success : function(response) {
                if (response.code == 0) {
                    var  total = response.result.total;
                    var  list = response.result.rows;
                    if (total == null) {
                        total = 0;
                    }
                    if( list == null ){
                        list = "";
                    }
                    $userDatagridTable.datagrid('loadData', pageData(list, total));

                    // 移除屏蔽
                    $userDatagridTable.datagrid("loaded");

                    // 分页
                    var pager = $userDatagridTable.datagrid('getPager');

                    //分页栏按钮事件设置
                    if ( pager ) {
                        $(pager).pagination({

                            onBeforeRefresh : function() {
                                /**
                                 * 在点击刷新按钮刷新之前触发 可以做某些动作
                                 * 序号：1 ,click序号：1->4->2
                                 */
                            },
                            onRefresh : function(pageNumber, pageSize) {
                                /**
                                 * 刷新之后触发
                                 * 序号：2 ,click序号：1->4->2
                                 */
                            },
                            onChangePageSize : function(pageSize) {
                                /**
                                 * 选择每页条数框触发，接着onSelectPage
                                 * 序号：3 ,click序号：3->4
                                 */
                            },
                            onSelectPage : function(pageNumber, pageSize) {
                                /**
                                 * 输入第几页时触发
                                 * 序号：4 ,click序号：4
                                 */
                                userSpace.getDataList(pageNumber, pageSize);
                            }
                        });
                    }
                }else{
                    //showMsg('操作失败,请稍后重试！','error',response.code);
                }

            },
            error : function(err) {
                $.messager.alert('系统提示', '数据加载失败!', 'error');
                // 移除屏蔽
                $userDatagridTable.datagrid("loaded");
            }
        });
    }
}





$(function(){

    //加载列表
    $userDatagridTable.datagrid({
        height : $(window).height() * 0.51,
        pagination : true,//显示分页
        fitColumns:true,
        pageNumber : 1,   //初始页码
        pageSize : 15,	  //每页条数
        pageList : [15,20, 30, 50 ,100],//动态每页条数
        loadMsg : "数据加载中...",
        columns:[
            [
            {
                field:'id',
                checkbox:true,
                width:'2%'
            },{
                field:'phone',
                title:'电话',
                halign:'center',
                width:'13%',
                align:'left'
            },{
                field:'userName',
                title:'用户名',
                width:'18%',
                halign:'center',
                align:'left'
            },{
                field:'status',
                title:'用户状态',
                halign:'center',
                width:'10%',
                align:'left',
                formatter : function(value, rowData, rowIndex) {
                    if( value != null && value != '' ){
                        if(value == 0) {
                            return '启用';
                        }else if(value == 1) {
                            return '不启用';
                        }
                    }else{
                        return '';
                    }
                }
            },{
                field:'email',
                title:'账户',
                halign:'center',
                width:'13%',
                align:'left'
            },{
                field:'passport',
                title:'邮箱',
                halign:'center',
                width:'13%',
                align:'left'
            }
        ]
        ],
        singleSelect:  true,
        selectOnCheck: true,
        checkOnSelect: true
    });

    userSpace.initDataTable();

});







