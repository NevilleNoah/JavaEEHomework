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
var demandSortName5 = "按花费排序";

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
/*全局变量声明结束*/

/********************************************获取数据部分***************************************/
/*第一级局部刷新开始*/
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
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>';
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
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
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>行为</th> <th>时间</th> <th>数量</th> </tr>';
            for (var i = 0; i < gainList.length; i++) {
                html = html + "<tr><td>" + gainList[i].gname + "</td><td>" + gainList[i].action + "</td><td>" + gainList[i].time + "</td><td>" + gainList[i].number + "</td></tr>";
            }
            html = html + "</table></div>";
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
                + '<li><a href="#" onclick="demandTableBySort(demandSortName5)">按花费排序</a></li>'
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
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>需求</th> <th>花费</th> </tr>';
            for (var i = 0; i < demandList.length; i++) {
                html = html + "<tr><td>" + demandList[i].gname + "</td><td>" + demandList[i].classify + "</td><td>" + demandList[i].need + "</td><td>" + demandList[i].cost + "</td></tr>";
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
        url: "../select/getUser.form",
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
            html = html + '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>姓名</th> <th>性别</th> <th>年龄</th> <th>入职时间</th> <th>退休时间</th>  <th>电话</th>  <th>住址</th> </tr>';
            for (var i = 0; i < userList.length; i++) {
                if (userList[i].outtime == null) {
                    userList[i].outtime = "未离职";
                }
                html = html + "<tr><td>" + userList[i].name + "</td> <td>" + userList[i].sex + "</td> <td>" + userList[i].age + "</td> <td>" + userList[i].intime + "</td>  <td>" + userList[i].outtime + "</td> <td>" + userList[i].phone + "</td> <td>+" + userList[i].address + "</td> </tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
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
            var html = '<table class="table table-striped" id="mainTable"><tr><th>物品名称</th> <th>物品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>';
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td></tr>";

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
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>行为</th> <th>时间</th> <th>数量</th> </tr>';
            for (var i = 0; i < gainList.length; i++) {
                html = html + "<tr><td>" + gainList[i].gname + "</td><td>" + gainList[i].action + "</td><td>" + gainList[i].time + "</td><td>" + gainList[i].number + "</td></tr>";
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
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>物品名称</th> <th>物品类别</th> <th>需求</th> <th>花费</th> </tr>';
            for (var i = 0; i < demandList.length; i++) {
                html = html + "<tr><td>" + demandList[i].gname + "</td><td>" + demandList[i].classify + "</td><td>" + demandList[i].need + "</td><td>" + demandList[i].cost + "</td></tr>";
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
        url: "../select/getUser.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (userList) {
            var html = '<table class="table table-striped" id="mainTable"> <tr> <th>姓名</th> <th>性别</th> <th>年龄</th> <th>入职时间</th> <th>退休时间</th>  <th>电话</th>  <th>住址</th> </tr>';
            for (var i = 0; i < userList.length; i++) {
                if (userList[i].outtime == null) {
                    userList[i].outtime = "未离职";
                }
                html = html + "<tr><td>" + userList[i].name + "</td> <td>" + userList[i].sex + "</td> <td>" + userList[i].age + "</td> <td>" + userList[i].intime + "</td>  <td>" + userList[i].outtime + "</td> <td>" + userList[i].phone + "</td> <td>+" + userList[i].address + "</td> </tr>";
            }
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
                + '<input id="take-button" class="btn btn-primary" value="领取"/>'
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
//领取物品，“添加”
function addGainGoods(gname, no) {
    var tid = "#take-number"+no;
    var cid = $("#cid").val();
    var number = $(tid.toString()).val();
    alert(number);
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


