/**
 * Created by asus on 2017/12/12/012.
 */
/*全局变量声明开始*/
var partName1 = "所有部门"
var partName2 = "业务部";
var partName3 = "人事部";
var partName4 = "财政部";
var partName5 = "管理部";

var upName1 = "升序/降序";
var upName2 = "升序";
var upName3 = "降序";

var goodsSortName1 = "默认排序";
var goodsSortName2 = "按名称排序";
var goodsSortName3 = "按类别排序";
var goodsSortName4 = "按价格排序";
var goodsSortName5 = "按库存排序";

var demandSortName1 = "默认排序";
var demandSortName2 = "按名称排序";
var demandSortName3 = "按类别排序";
var demandSortName4 = "按需求数量排序";

var userSortName1 = "默认排序";
var userSortName2 = "按姓名排序";
var userSortName3 = "按性别排序";
var userSortName4 = "按年龄排序";
var userSortName5 = "按入职时间排序";

var gainSortName1 = "默认排序";
var gainSortName2 = "按时间排序";
var gainSortName3 = "按名称排序";
var gainSortName4 = "按数量排序";
var gainSortName5 = "按行为排序";

var damageSortName1 = "默认排序";
var damageSortName2 = "按时间排序";
var damageSortName3 = "按名称排序";
var damageSortName4 = "按数量排序";
var damageSortName5 = "按状态排序";

var returnSortName1="默认排序";
var returnSortName2="按姓名排序";
var returnSortName3="按员工编号排序";
var returnSortName4="按领取时间排序";
var returnSortName5="按物品名称排序"

/*全局变量声明结束*/

/********************************************获取数据部分***************************************/
/*第一级局部刷新开始*/
function getChart() {
    view();
    classify();
    gainCore();
}

function view() {
    var html = '<div class="chart-div"><div id="chart1" class="ct-chart ct-perfect-fourth"></div><div id="chart1-span"><span>仓库各类物品数量分布表</span></div></div>'
                +'<div class="chart-div"><div id="chart2" class="ct-chart ct-perfect-fourth"></div><div id="chart2-span"><span>领取量较高的物品示意表</span></div></div>';
    $("#main-body").html(html);
}
function classify() {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/forClassify.form",
        data: {cid:cid},
        success:function(data) {
            var classify = [];
            var number = [];
            for(var i = 0;i<data.length;i++) {
                classify[classify.length]=data[i].classify;
                number[number.length]=data[i].number;
            }

            var d = {
                labels:classify,
                series:number
            };
            var options = {
                labelInterpolationFnc: function(value) {
                    return value[0]
                }
            };

            var responsiveOptions = [
                ['screen and (min-width: 640px)', {
                    chartPadding: 30,
                    labelOffset: 100,
                    labelDirection: 'explode',
                    labelInterpolationFnc: function(value) {
                        return value;
                    }
                }],
                ['screen and (min-width: 1024px)', {
                    labelOffset: 60,
                    chartPadding: 100
                }]
            ];

            new Chartist.Pie('#chart1', d, options, responsiveOptions);
        }


    });


}

function gainCore() {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/gainCore.form",
        data: {cid:cid},
        success:function(info) {
            var gname = [];
            var number = [];
            var tmp;
            if(info.length>10) {
                tmp = 10;
            } else {
                tmp = info.length;
            }
            for(var i = 0;i<tmp;i++) {
                gname[gname.length]=info[i].gname;
                number[number.length]=info[i].number;
            }

            new Chartist.Bar('#chart2', {
                labels: gname,
                series: number
            }, {
                distributeSeries: true
            });

        }


    });


}

function getGoods(key, order, up) {
    var cid = $("#cid").val();

    $.ajax({
        type: "POST",
        url: "../select/getGoods.form",
        data: {cid: cid, key: key, order: order, up: up},
        success: function (goodsList) {
            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'
                + '<a id="title" class="navbar-brand">库存信息</a>'
                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<div  class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="goodsTable()"/>'
                + '</div>'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="goodsTableBySort(goodsSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="goodsTableBySort(goodsSortName2)">按名称排序</a></li>'
                + '<li><a href="#" onclick="goodsTableBySort(goodsSortName3)">按类别排序</a></li>'
                + '<li><a href="#" onclick="goodsTableBySort(goodsSortName4)">按价格排序</a></li>'
                + '<li><a href="#" onclick="goodsTableBySort(goodsSortName5)">按库存排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="goodsTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="goodsTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="goodsTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '</div>'
                + '</div>';
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>价格</th> <th>库存</th> <th>总量</th><th class="td-center">操作</th></tr>';
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td id='gname"+i+"'>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td><td style='width: 400px'><input id='change"+i+"' type='text' placeholder='改变量' style='width: 80px'/><input id='add"+i+"' type='button' class='btn btn-primary margin-left' value='增加' onclick='addGoods("+i+")'/><input id='sub"+i+"' type='button' class='btn btn-primary margin-left' value='减少' onclick='subGoods("+i+")'/><input id='remove"+i+"' type='button' class='btn btn-primary margin-left' value='移除' onclick='removeGoods("+i+")'/></td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function newGoods() {
    var html = '<div class="panel panel-primary">'
        +'<div class="navbar navbar-inverse">'
        +'<div class="container-fluid">'
        +'<div id="header" class="navbar-header">'
        +'<a id="title" class="navbar-brand">新增物品</a>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div id="small-body">'
        +'<form class="form-horizontal">'
        +'<div class="form-group">'
        +'<label for="gname" class="col-sm-4 control-label">物品名称</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="gname" placeholder="请输入物品名称">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="classify" class="col-sm-4 control-label">物品类别</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="classify" placeholder="请输入物品类别">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="total" class="col-sm-4 control-label">物品数量</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="total" placeholder="请输入物品数量">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="cost" class="col-sm-4 control-label">物品单价</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="cost" placeholder="请输入物品单价">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<div class="col-sm-offset-4 col-sm-5">'
        +'<input type="button" class="btn btn-default" onclick="addNewGoods()" value="提交"/>'
        +'</div>'
        +'</div>'
        +'</form>'
        +'</div>'
        +'</div>';
    $("#main-body").html(html);

}

function newDemand() {
    var html = '<div class="panel panel-primary">'
        +'<div class="navbar navbar-inverse">'
        +'<div class="container-fluid">'
        +'<div id="header" class="navbar-header">'
        +'<a id="title" class="navbar-brand">添加需求</a>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div id="small-body">'
        +'<form class="form-horizontal">'
        +'<div class="form-group">'
        +'<label for="gname" class="col-sm-4 control-label">物品名称</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="gname" placeholder="请输入物品名称">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="classify" class="col-sm-4 control-label">物品类别</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="classify" placeholder="请输入物品类别">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="need" class="col-sm-4 control-label">需求数量</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="need" placeholder="请输入物品数量">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="part" class="col-sm-4 control-label">部门名称</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="part" placeholder="请输入部门名称">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<div class="col-sm-offset-4 col-sm-5">'
        +'<input type="button" class="btn btn-default" onclick="addNewDemand()" value="提交"/>'
        +'</div>'
        +'</div>'
        +'</form>'
        +'</div>'
        +'</div>';
    $("#main-body").html(html);
}

function newEmployee() {
    var html = '<div class="panel panel-primary">'
        +'<div class="navbar navbar-inverse">'
        +'<div class="container-fluid">'
        +'<div id="header" class="navbar-header">'
        +'<a id="title" class="navbar-brand">添加员工</a>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div id="small-body">'
        +'<form class="form-horizontal">'
        +'<div class="form-group">'
        +'<label for="ename" class="col-sm-4 control-label">姓名</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="ename" placeholder="请输入姓名">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="sex" class="col-sm-4 control-label">性别</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="sex" placeholder="请输入性别">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="age" class="col-sm-4 control-label">年龄</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="age" placeholder="请输入年龄">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="id" class="col-sm-4 control-label">员工编号</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="id" placeholder="请输入员工编号">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="intime" class="col-sm-4 control-label">入职时间</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="intime" placeholder="请输入入职时间">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="part" class="col-sm-4 control-label">部门</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="part" placeholder="请输入部门">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="phone" class="col-sm-4 control-label">联系电话</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="phone" placeholder="请输入联系电话">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="address" class="col-sm-4 control-label">住址</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="address" placeholder="请输入住址">'
        +'</div>'
        +'</div>'

        +'<div class="form-group">'
        +'<div class="col-sm-offset-4 col-sm-5">'
        +'<input type="button" class="btn btn-default" onclick="addNewEmployee()" value="提交"/>'
        +'</div>'
        +'</div>'
        +'</form>'
        +'</div>'
        +'</div>';
    $("#main-body").html(html);

}

function getGain(part, key, order, up) {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/getGain.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (gainList) {
            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'
                + '<a id="title" class="navbar-brand">领取/归还记录</a>'
                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<div  class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="gainTable()"/>'
                + '</div>'
                + '<ul id="part-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="part-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">所有部门<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a id="part1" href="#" onclick="gainTableByPart(partName1)">所有部门</a></li>'
                + '<li><a id="part2" href="#" onclick="gainTableByPart(partName2)">业务部</a></li>'
                + '<li><a id="part3" href="#" onclick="gainTableByPart(partName3)">人事部</a></li>'
                + '<li><a id="part4" href="#" onclick="gainTableByPart(partName4)">财政部</a></li>'
                + '<li><a id="part5" href="#" onclick="gainTableByPart(partName5)">管理部</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="gainTableBySort(gainSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="gainTableBySort(gainSortName2)">按时间排序</a></li>'
                + '<li><a href="#" onclick="gainTableBySort(gainSortName3)">按名称排序</a></li>'
                + '<li><a href="#" onclick="gainTableBySort(gainSortName4)">按数量排序</a></li>'
                + '<li><a href="#" onclick="gainTableBySort(gainSortName5)">按行为排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="gainTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="gainTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="gainTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '</div>'
                + '</div>';
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th><th>员工编号</th> <th>行为</th> <th>时间</th> <th>数量</th> </tr>';
            for (var i = 0; i < gainList.length; i++) {
                var action;
                if(gainList[i].action == 0) {
                    action = "领取";
                } else {
                    action = "归还";
                }
                html = html + "<tr><td>" + gainList[i].gname + "</td><td>" + gainList[i].id+"</td><td>"+action + "</td><td>" + gainList[i].gtime + "</td><td>" + gainList[i].number + "</td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

//进入领取
function enterGainGoods(key, order, up) {
    var cid = $("#cid").val();

    $.ajax({
        type: "POST",
        url: "../table/enterGainGoods.form",
        data: {cid: cid, key: key, order: order, up: up},

        success: function (data) {
            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'
                + '<a id="title" class="navbar-brand">领取物品</a>'
                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="gainGoodsTableBySort(goodsSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="gainGoodsTableBySort(goodsSortName2)">按名称排序</a></li>'
                + '<li><a href="#" onclick="gainGoodsTableBySort(goodsSortName3)">按类别排序</a></li>'
                + '<li><a href="#" onclick="gainGoodsTableBySort(goodsSortName5)">按库存排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="gainGoodsTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="gainGoodsTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="gainGoodsTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<div class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="userid" type="text" class="form-control" placeholder="请输入员工编号"/>'
                + '<input id="take-button" type="button" class="btn btn-primary" value="领取" onclick="doTakeGoods()"/>'
                + '</div>'
                + '</div>'
                + '<div  class="navbar-form navbar-left">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="gainGoodsTable()"/>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div><div id="take-title1">待领取的物品</div><div id="take-title2">物品库存信息</div></div>'
                + '<div id="take-board">'
                + '<div id="take-goods"  class="panel panel-primary">'
                + '<table class="table table-striped">'
                + '<tr>'
                + '<th>物品名称</th>'
                + '<th class="td-center">领取数量</th>'
                + '<th class="td-center">操作</th>'
                + '</tr>'
                + '</table>'
                + '</div>'
                + '<div  id="take-add-goods" class="panel panel-primary">'
                + '<table  class="table table-striped">'
                + '<tr>'
                + '<th>物品名称</th>'
                + '<th class="td-center">物品类别</th>'
                + '<th class="td-center">库存数量</th>'
                + '<th class="td-center">领取数量</th>'
                + '<th class="td-center">操作</th>'
                + '</tr>';

            for(var i = 0; i < data.length; i++) {
                html = html + '<tr><td>'+data[i].gname+'</td>'
                    + '<td class="td-center">'+data[i].classify+'</td>'
                    + '<td class="td-center">'+data[i].store+'</td>'
                    + '<td class="td-center"><input id="take-number'+i+'\" type="text"/></td>'
                    + '<td class="td-center"><input type="button" class="btn btn-primary" value="添加" onclick="addGainGoods(\''+data[i].gname+'\','+i+')"/></td></tr>';
            }
            html = html + '</table>'
                + '</div>'
                + '</div>';

            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function getDemand(part, key, order, up) {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/getDemand.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (demandList) {
            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'
                + '<a id="title" class="navbar-brand">需求信息</a>'
                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<div  class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="demandTable()"/>'
                + '</div>'
                + '<ul id="part-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="part-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">所有部门<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a id="part1" href="#" onclick="demandTableByPart(partName1)">所有部门</a></li>'
                + '<li><a id="part2" href="#" onclick="demandTableByPart(partName2)">业务部</a></li>'
                + '<li><a id="part3" href="#" onclick="demandTableByPart(partName3)">人事部</a></li>'
                + '<li><a id="part4" href="#" onclick="demandTableByPart(partName4)">财政部</a></li>'
                + '<li><a id="part5" href="#" onclick="demandTableByPart(partName5)">管理部</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="demandTableBySort(demandSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="demandTableBySort(demandSortName2)">按名称排序</a></li>'
                + '<li><a href="#" onclick="demandTableBySort(demandSortName3)">按类别排序</a></li>'
                + '<li><a href="#" onclick="demandTableBySort(demandSortName4)">按需求数量排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="demandTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="demandTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="demandTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '</div>'
                + '</div>';
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>需求</th></tr>';
            for (var i = 0; i < demandList.length; i++) {
                html = html + "<tr><td>" + demandList[i].gname + "</td><td>" + demandList[i].classify + "</td><td>" + demandList[i].need + "</td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}


function getDamage(part, key, order, up) {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/getDamage.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (damageList) {
            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'

                + '<a id="title" class="navbar-brand">损坏信息</a>'

                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<div  class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="damageTable()"/>'
                + '</div>'
                + '<ul id="part-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="part-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">所有部门<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a id="part1" href="#" onclick="damageTableByPart(partName1)">所有部门</a></li>'
                + '<li><a id="part2" href="#" onclick="damageTableByPart(partName2)">业务部</a></li>'
                + '<li><a id="part3" href="#" onclick="damageTableByPart(partName3)">人事部</a></li>'
                + '<li><a id="part4" href="#" onclick="damageTableByPart(partName4)">财政部</a></li>'
                + '<li><a id="part5" href="#" onclick="damageTableByPart(partName5)">管理部</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="damageTableBySort(damageSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="damageTableBySort(damageSortName2)">按时间排序</a></li>'
                + '<li><a href="#" onclick="damageTableBySort(damageSortName3)">按名称排序</a></li>'
                + '<li><a href="#" onclick="damageTableBySort(damageSortName4)">按数量排序</a></li>'
                + '<li><a href="#" onclick="damageTableBySort(damageSortName5)">按状态排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="damageTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="damageTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="damageTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '</div>'
                + '</div>';
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>员工号</th> <th>数量</th> <th>时间</th> <th>状态</th> <th>原因</th> </tr>';
            for (var i = 0; i < damageList.length; i++) {
                html = html + "<tr><td>" + damageList[i].gname + "</td><td>" + damageList[i].id + "</td><td>" + damageList[i].number + "</td><td>" + damageList[i].time + "</td><td>" + damageList[i].station + "</td><td>" + damageList[i].cause + "</td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}


function getUser(part, key, order, up) {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/getCuser.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (userList) {

            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'
                + '<a id="title" class="navbar-brand">员工信息</a>'
                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<div  class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="userable()"/>'
                + '</div>'
                + '<ul id="part-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="part-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">所有部门<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a id="part1" href="#" onclick="userTableByPart(partName1)">所有部门</a></li>'
                + '<li><a id="part2" href="#" onclick="userTableByPart(partName2)">业务部</a></li>'
                + '<li><a id="part3" href="#" onclick="userTableByPart(partName3)">人事部</a></li>'
                + '<li><a id="part4" href="#" onclick="userTableByPart(partName4)">财政部</a></li>'
                + '<li><a id="part5" href="#" onclick="userTableByPart(partName5)">管理部</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="userTableBySort(userSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="userTableBySort(userSortName2)">按姓名排序</a></li>'
                + '<li><a href="#" onclick="userTableBySort(userSortName3)">按性别排序</a></li>'
                + '<li><a href="#" onclick="userTableBySort(userSortName4)">按年龄排序</a></li>'
                + '<li><a href="#" onclick="userTableBySort(userSortName5)">按入职时间排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="userTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="userTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="userTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '</div>'
                + '</div>';
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>姓名</th> <th>性别</th> <th>年龄</th> <th>入职时间</th> <th>退休时间</th>  <th>电话</th><th>住址</th><th class="td-center">离职操作</th></tr>';
            for (var i = 0; i < userList.length; i++) {
                if (userList[i].outtime == null) {
                    userList[i].outtime = "未离职";
                }
                html = html + "<tr><td id='ename"+i+"'>" + userList[i].ename + "</td><td>" + userList[i].sex + "</td> <td>" + userList[i].age + "</td><td>" + userList[i].intime + "</td>  <td>" + userList[i].outtime + "</td> <td>" + userList[i].phone + "</td> <td>" + userList[i].address + "</td><td width='350px'><input id='set-out-time"+i+"' type='text' width='100px' placeholder='时间'><input id='out"+i+"' type='button' value='离职' onclick='out("+i+")' class='btn btn-primary margin-left'/></td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function getReturn(part, key, order, up) {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../select/getReturn.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (returnList) {
            var html = '<div class="panel panel-primary">'
                + '<div class="navbar navbar-inverse">'
                + '<div class="container-fluid">'
                + '<div id="header" class="navbar-header">'
                + '<a id="title" class="navbar-brand">归还物品</a>'
                + '</div>'
                + '<div id="action-nav" class="collapse navbar-collapse">'
                + '<div  class="navbar-form navbar-right">'
                + '<div class="form-group">'
                + '<input id="search" type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                + '</div>'
                + '<input type="button" class="btn btn-default" value="搜索" onclick="gainTable()"/>'
                + '</div>'
                + '<ul id="part-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="part-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">所有部门<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a id="part1" href="#" onclick="returnTableByPart(partName1)">所有部门</a></li>'
                + '<li><a id="part2" href="#" onclick="returnTableByPart(partName2)">业务部</a></li>'
                + '<li><a id="part3" href="#" onclick="returnTableByPart(partName3)">人事部</a></li>'
                + '<li><a id="part4" href="#" onclick="returnTableByPart(partName4)">财政部</a></li>'
                + '<li><a id="part5" href="#" onclick="returnTableByPart(partName5)">管理部</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="sort-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">默认排序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="returnTableBySort(returnSortName1)">默认排序</a></li>'
                + '<li><a href="#" onclick="returnTableBySort(returnSortName3)">按员工编号排序</a></li>'
                + '<li><a href="#" onclick="returnTableBySort(returnSortName4)">按时间排序</a></li>'
                + '<li><a href="#" onclick="returnTableBySort(returnSortName4)">按物品名称排序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '<ul id="up-choose" class="nav navbar-nav">'
                + '<li class="dropdown">'
                + '<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                + 'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                + '<ul class="dropdown-menu">'
                + '<li><a href="#" onclick="returnTableByUp(upName1)">升序/降序</a></li>'
                + '<li><a href="#" onclick="returnTableByUp(upName2)">升序</a></li>'
                + '<li><a href="#" onclick="returnTableByUp(upName3)">降序</a></li>'
                + '</ul>'
                + '</li>'
                + '</ul>'
                + '</div>'
                + '</div>'
                + '</div>';
            html = html + '<div id="table-div" class="panel-body"> <table class="table table-striped" id="mainTable"> <tr> <th>员工编号</th><th>物品名称</th><th>领取时间</th><th>数量</th> <th class="td-center">归还数量</th><th class="td-center">操作</th></tr>';
            for (var i = 0; i < returnList.length; i++) {
                html = html + "<tr><td id='user-id"+i+"'>" + returnList[i].id + "</td><td id='gname"+i+"'>" + returnList[i].gname +"</td><td>"+returnList[i].gtime+"</td><td>" + returnList[i].number + "</td><td class='td-center'><input type='text' id='return-number"+i+"'/></td><td class='td-center'><input class='btn btn-primary' type='button' value='归还' onclick='doReturnGoods("+i+")'/></td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function newDamage() {
    var html = '<div class="panel panel-primary">'
        +'<div class="navbar navbar-inverse">'
        +'<div class="container-fluid">'
        +'<div id="header" class="navbar-header">'
        +'<a id="title" class="navbar-brand">添加记录</a>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div id="small-body">'
        +'<form class="form-horizontal">'
        +'<div class="form-group">'
        +'<label for="gname" class="col-sm-4 control-label">物品名称</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="gname" placeholder="请输入物品名称">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="id" class="col-sm-4 control-label">员工编号</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="id" placeholder="请输入员工编号">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="part" class="col-sm-4 control-label">部门名称</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="part" placeholder="请输入部门名称">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="reason" class="col-sm-4 control-label">原因</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="reason" placeholder="请输入损坏原因">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="number" class="col-sm-4 control-label">数量</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="number" placeholder="请输入数量">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<label for="status" class="col-sm-4 control-label">当前状态</label>'
        +'<div class="col-sm-5">'
        +'<input type="text" class="form-control" id="status" placeholder="请输入当前状态">'
        +'</div>'
        +'</div>'
        +'<div class="form-group">'
        +'<div class="col-sm-offset-4 col-sm-5">'
        +'<input type="button" class="btn btn-default" onclick="addNewDamage()" value="提交"/>'
        +'</div>'
        +'</div>'
        +'</form>'
        +'</div>'
        +'</div>';
    $("#main-body").html(html);
}
/*第一级局部刷新结束*/

/* 第二级局部刷新开始 */
function goodsTable() {

    var cid = $("#cid").val();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();

    switch (orderName) {
        case goodsSortName1:
            order = "default";
            break;
        case goodsSortName2:
            order = "gname";
            break;
        case goodsSortName3:
            order = "classify";
            break;
        case goodsSortName4:
            order = "cost";
            break;
        case goodsSortName5:
            order = "store";
            break
    }
    $.ajax({
        type: "POST",
        url: "../select/getGoods.form",
        data: {cid: cid, key: key, order: order, up: up},
        dataType: "json",
        success: function (goodsList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>价格</th> <th>库存</th> <th>总量</th><th class="td-center">操作</th></tr>';
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td id='gname"+i+"'>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td><td style='width: 400px'><input id='change"+i+"' type='text' placeholder='改变量' style='width: 80px'/><input id='add"+i+"' type='button' class='btn btn-primary margin-left' value='增加' onclick='addGoods("+i+")'/><input id='sub"+i+"' type='button' class='btn btn-primary margin-left' value='减少' onclick='subGoods("+i+")'/><input id='remove"+i+"' type='button' class='btn btn-primary margin-left' value='移除' onclick='removeGoods(no)'/></td></tr>";
            }
            html = html + "</table>";
            $("#mainTable").html(html);

        }
    });
}

function returnTable() {

    var cid = $("#cid").val();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();

    switch (orderName) {
        case returnSortName1:
            order = "default";
            break;
        case returnSortName2:
            order = "name";
            break;
        case returnSortName3:
            order = "userid";
            break;
        case returnSortName4:
            order = "time";
            break;
        case returnSortName5:
            order = "gname";
            break
    }
    $.ajax({
        type: "POST",
        url: "../select/getReturn.form",
        data: {cid: cid, key: key, order: order, up: up},
        dataType: "json",
        success: function (returnList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>员工编号</th><th>物品名称</th><th>领取时间</th><th>数量</th> <th class="td-center">归还数量</th><th class="td-center">操作</th></tr>';
            for (var i = 0; i < returnList.length; i++) {
                html = html + "<tr><td id='user-id"+i+"'>" + returnList[i].id + "</td><td id='gname"+i+"'>" + returnList[i].gname +"</td><td>"+returnList[i].gtime+"</td><td>" + returnList[i].number + "</td><td class='td-center'><input type='text' id='return-number"+i+"'/></td>" + returnList[i].time + "</td><td class='td-center'><input class='btn btn-primary' type='button' value='归还' onclick='doReturnGoods("+i+")'/></td></tr>";
            }
            html = html + "</table>";
            $("#mainTable").html(html);

        }
    });
}

function gainTable() {
    var cid = $("#cid").val();
    var part = $("#part-name").text();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();
    switch (orderName) {
        case gainSortName1:
            order = "default";
            break;
        case gainSortName2:
            order = "time";
            break;
        case gainSortName3:
            order = "gname";
            break;
        case gainSortName4:
            order = "number";
            break;
        case gainSortName5:
            order = "action";
            break;
    }
    $.ajax({
        type: "POST",
        url: "../select/getGain.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (gainList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th><th>员工编号</th> <th>行为</th> <th>时间</th> <th>数量</th> </tr>';
            for (var i = 0; i < gainList.length; i++) {
                var action;
                if(gainList[i].action == 0) {
                    action = "领取";
                } else {
                    action = "归还";
                }
                html = html + "<tr><td>" + gainList[i].gname + "</td><td>"+gainList[i].id+"</td><td>" + action + "</td><td>" + gainList[i].gtime + "</td><td>" + gainList[i].number + "</td></tr>";
            }
            html = html + "</table>";
            $("#mainTable").html(html);

        }
    });
}


function demandTable() {
    var cid = $("#cid").val();
    var part = $("#part-name").text();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();
    switch (orderName) {
        case demandSortName1:
            order = "default";
            break;
        case demandSortName2:
            order = "gname";
            break;
        case demandSortName3:
            order = "classify";
            break;
        case demandSortName4:
            order = "number";
            break;
        case demandSortName5:
            order = "cost";
            break;
    }
    $.ajax({
        type: "POST",
        url: "../select/getDemand.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (demandList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>需求</th></tr>';
            for (var i = 0; i < demandList.length; i++) {
                html = html + "<tr><td>" + demandList[i].gname + "</td><td>" + demandList[i].classify + "</td><td>" + demandList[i].need + "</td></tr>";
            }
            html = html + "</table>";
            $("#mainTable").html(html);

        }
    });
}

function damageTable() {
    var cid = $("#cid").val();
    var part = $("#part-name").text();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();
    switch (orderName) {
        case damageSortName1:
            order = "default";
            break;
        case damageSortName2:
            order = "time";
            break;
        case damageSortName3:
            order = "gname";
            break;
        case damageSortName4:
            order = "number";
            break;
        case damageSortName5:
            order = "state";
            break;
    }
    $.ajax({
        type: "POST",
        url: "../select/getDamage.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (damageList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>员工号</th> <th>数量</th> <th>时间</th> <th>状态</th> <th>原因</th> </tr>';
            for (var i = 0; i < damageList.length; i++) {
                html = html + "<tr><td>" + damageList[i].gname + "</td><td>" + damageList[i].id + "</td><td>" + damageList[i].number + "</td><td>" + damageList[i].time + "</td><td>" + damageList[i].station + "</td><td>" + damageList[i].cause + "</td></tr>";
            }
            html = html + "</table>";
            $("#mainTable").html(html);

        }
    });
}

function userTable() {
    var cid = $("#cid").val();
    var part = $("#part-name").text();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();
    switch (orderName) {
        case userSortName1:
            order = "default";
            break;
        case userSortName2:
            order = "name";
            break;
        case userSortName3:
            order = "sex";
            break;
        case userSortName4:
            order = "age";
            break;
        case userSortName5:
            order = "intime";
            break;
    }
    $.ajax({
        type: "POST",
        url: "../select/getCuser.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (userList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>姓名</th> <th>性别</th> <th>年龄</th> <th>入职时间</th> <th>退休时间</th>  <th>电话</th><th>住址</th><th class="td-center">离职操作</th></tr>';
            for (var i = 0; i < userList.length; i++) {
                if (userList[i].outtime == null) {
                    userList[i].outtime = "未离职";
                }
                html = html + "<tr><td id='ename"+i+"'>" + userList[i].ename + "</td><td>" + userList[i].sex + "</td> <td>" + userList[i].age + "</td><td>" + userList[i].intime + "</td>  <td>" + userList[i].outtime + "</td> <td>" + userList[i].phone + "</td> <td>" + userList[i].address + "</td><td width='350px'><input id='set-out-time"+i+"' type='text' width='100px' placeholder='时间'><input id='out"+i+"' type='button' value='离职' onclick='out("+i+")' class='btn btn-primary margin-left'/></td></tr>";
            }
            html = html + "</table></div>";

            html = html + "</table>";
            $("#mainTable").html(html);

        }
    });
}

function gainGoodsTable() {

    var cid = $("#cid").val();
    var key = $("#search").val();
    var orderName = $("#sort-name").text();
    var order = null;
    var up = $("#up-name").text();

    switch (orderName) {
        case goodsSortName1:
            order = "default";
            break;
        case goodsSortName2:
            order = "gname";
            break;
        case goodsSortName3:
            order = "classify";
            break;
        case goodsSortName5:
            order = "store";
            break
    }
    $.ajax({
        type: "POST",
        url: "../select/getGoods.form",
        data: {cid: cid, key: key, order: order, up: up},
        dataType: "json",
        success: function (data) {
            var html = '<table class="table table-striped"><tr><th>物品名称</th><th  class="td-center">物品类别</th><th  class="td-center">库存数量</th><th  class="td-center">领取数量</th><th  class="td-center">操作</th></tr>';
            for(var i = 0; i < data.length; i++) {
                html = html + '<tr><td>'+data[i].gname+'</td>'
                    + '<td class="td-center">'+data[i].classify+'</td>'
                    + '<td class="td-center">'+data[i].store+'</td>'
                    + '<td class="td-center" id="take-goods-numbLer'+i+'"><input id="take-number'+i+'\" type="text"/></td>'
                    + '<td class="td-center"><input type="button" class="btn btn-primary" value="添加" onclick="addGainGoods(\"'+data[i].gname+'\",'+'$("#take-number'+i+'").val())"/></td></tr>';
            }
            html = html + '</table>';
            $("#take-add-goods").html(html);

        }
    });
}

/* 第三级调用开始 */

//按部门
function returnTableByPart(partName) {
    $("#part-name").html(partName + "<span class='caret'></span>");
    returnTable();
}
function gainTableByPart(partName) {
    $("#part-name").html(partName + "<span class='caret'></span>");
    gainTable();
}

function demandTableByPart(partName) {
    $("#part-name").html(partName + "<span class='caret'></span>");
    demandTable();
}

function damageTableByPart(partName) {
    $("#part-name").html(partName + "<span class='caret'></span>");
    damageTable();
}

function userTableByPart(partName) {
    $("#part-name").html(partName + "<span class='caret'></span>");
    userTable();
}
function gainGoodsTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    gainGoodsTable();
}
//升序降序
function returnTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    returnTable();
}
function goodsTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    goodsTable();
}
function gainTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    gainTable();
}

function demandTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    demandTable();
}

function damageTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    damageTable();
}

function userTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    userTable();
}
function gainGoodsTableByUp(upName) {
    $("#up-name").html(upName + "<span class='caret'></span>");
    gainGoodsTable();
}
//排序依据
function returnTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    returnTable();
}
function goodsTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    goodsTable();
}
function gainTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    gainTable();
}

function demandTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    demandTable();
}

function damageTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    damageTable();
}

function userTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    userTable();
}
function gainGoodsTableBySort(sortName) {
    $("#sort-name").html(sortName + "<span class='caret'></span>");
    gainGoodsTable();
}
/******************************************************获取数据部分结束************************************/

/******************************************************操作部分******************************************/
//库存信息，“增加”
function addGoods(no) {
    var cid = $("#cid").val();
    var gnameId="#gname"+no;
    var changeId="#change"+no;
    var gname = $(gnameId.toString()).text();
    var change = $(changeId.toString()).val();
    $.ajax({
        type:"POST",
        url:"../table/addGoods.form",
        data:{cid:cid, gname:gname, change:change},
        dataType:"json",
        error:function () {
            goodsTable();
        }
    });
}
//库存信息，“减少”
function subGoods(no) {
    var cid = $("#cid").val();
    var gnameId="#gname"+no;
    var changeId="#change"+no;
    var gname = $(gnameId.toString()).text();
    var change = $(changeId.toString()).val();
    $.ajax({
        type:"POST",
        url:"../table/subGoods.form",
        data:{cid:cid, gname:gname, change:change},
        dataType:"json",
        error:function () {
            goodsTable();
        }
    });
}
//库存信息，“移除”
function removeGoods(no) {
    var cid = $("#cid").val();
    var gnameId="#gname"+no;
    var gname = $(gnameId.toString()).text();
    $.ajax({
        type:"POST",
        url:"../table/removeGoods.form",
        data:{cid:cid, gname:gname},
        dataType:"json",
        error:function () {
            goodsTable();
        }
    });
}




//领取物品，“添加”
function addGainGoods(gname, no) {
    var tid = "#take-number"+no;
    var cid = $("#cid").val();
    var number = $(tid.toString()).val();
    $.ajax({
        type: "POST",
        url: "../table/onTakingGoods.form",
        data: {cid: cid, gname: gname, number: number},
        dataType: "json",
        success: function (data) {
            var html = '<table class="table table-striped"><tr><th>物品名称</th><th class="td-center">领取数量</th><th class="td-center">操作</th></tr>';
            for (var i = 0; i < data.length; i++) {
                html = html + "<tr><td>" + data[i].gname + "</td><td class='td-center'>" + data[i].number + "</td><td><input type='button' class='btn btn-primary' value='取消' onclick='deleteGainGoods(\"" + data[i].gname + "\")'/></td></tr>";
            }
            html = html + "</table>";
            $("#take-goods").html(html);
        }
    });
}

//领取物品，“取消”
function deleteGainGoods(gname) {
    var cid = $("#cid").val();
    $.ajax({
        type: "POST",
        url: "../table/cancelTakingGoods.form",
        data: {cid: cid, gname: gname},
        dataType: "json",
        success: function (data) {
            var html = '<table class="table table-striped"><tr><th>物品名称</th><th class="td-center">领取数量</th><th class="td-center">操作</th></tr>';
            for (var i = 0; i < data.length; i++) {
                html = html + "<tr><td>" + data[i].gname + "</td><td class='td-center'>" + data[i].number + "</td><td><input type='button' class='btn btn-primary' value='取消' onclick='deleteGainGoods(\"" + data[i].gname + "\")'/></td></tr>";
            }
            html = html + "</table>";
            $("#take-goods").html(html);
        }
    });
}

//领取物品，“领取”
function doTakeGoods() {
    var cid = $("#cid").val();
    var userid = $("#userid").val();
    $.ajax({
        type:"POST",
        url:"../table/doTakeGoods.form",
        data:{cid:cid, userid:userid},
        success:function() {
            alert("领取成功!");
            enterGainGoods('','','');
        }
    });

}

//归还物品，“归还”
function doReturnGoods(no) {
    var cid = $("#cid").val();
    var tid = "#user-id"+no;
    alert(tid);
    var id = $(tid.toString()).text();
    alert(id);
    var tgname = "#gname"+no;
    var gname = $(tgname.toString()).text();
    var numberid ="#return-number"+no;
    var number = $(numberid).val();
    $.ajax({
        type:"POST",
        url:"../table/doReturnGoods.form",
        data:{cid:cid, id:id, gname:gname, number:number},
        success:function() {
            alert("归还成功");
            getReturn('所有部门','','','默认排序');
        }
    });
}

function addNewGoods() {
    var cid = $("#cid").val();
    var gname = $("#gname").val();
    var classify = $("#classify").val();
    var total = $("#total").val();
    var cost = $("#cost").val();
    var part = $("#part").val();
    $.ajax({
        type:"POST",
        url:"../table/addNewGoods.form",
        data:{cid:cid, gname:gname, classify:classify, total:total, cost:cost, part:part},
        success:function (data) {
            alert("插入成功");
            newGoods();
        }
    });
}

function addNewDemand() {
    var cid = $("#cid").val();
    var gname = $("#gname").val();
    var classify = $("#classify").val();
    var need = $("#need").val();
    var part = $("#part").val();
    /*if((!part.isEqual("财政部"))||(!part.isEqual("业务部"))||(!part.isEqual("人事部"))||(!part.isEqual("管理部"))) {
        alert("部门不存在");
        return;
    }*/
    $.ajax({
        type:"POST",
        url:"../table/addNewDemand.form",
        data:{cid:cid, gname:gname, classify:classify, need:need, part:part},
        success:function (data) {
            alert("需求添加成功");
            newDemand();
        }
    });
}

//添加新雇员
function addNewEmployee() {
    var cid = $("#cid").val();
    var ename = $("#ename").val();
    var sex = $("#sex").val();
    var age = $("#age").val();
    var intime = $("#intime").val();
    var part = $("#part").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
    $.ajax({
        type:"POST",
        url:"../table/addNewEmployee.form",
        data:{cid:cid, id:id, ename:ename, sex:sex, age:age, intime:intime, phone:phone, address:address, part:part},
        success:function (data) {
            alert("添加员工成功");
            newEmployee();
        }
    });
}

//离职
function out(no) {
    var cid = $("#cid").val();
    var enameId = "#ename"+no;
    var setOutTimeId = "#set-out-time"+no;
    var ename = $(enameId).val();
    var setOutTime = $(setOutTimeId).val();

    $.ajax({
        type:"POST",
        url:"../table/outEmployee.form",
        data:{cid:cid, ename:ename, setOutTime:setOutTime},
        success:function (data) {
            alert("离职员工成功");
            getUser('所有部门', '', '', '默认排序');
        }
    });
}

//添加损坏记录
function addNewDamage() {
    var cid = $("#cid").val();
    var gname = $("#gname").val();
    var number = $("#number").val();
    var status = $("#status").val();
    var reason = $("#reason").val();
    var part = $("#part").val();

    $.ajax({
        type:"POST",
        url:"../table/addNewDamage.form",
        data:{cid:cid, gname:gname, number:number, status:status, reason:reason, part:part},
        success:function(data) {
            alert("添加记录成功");
            newDamage();
        }
    });
}




