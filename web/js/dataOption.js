/**
 * Created by asus on 2017/12/12/012.
 */


function getGoods(cid, key, order, up) {
    $.ajax({
        type: "POST",
        url: "../select/getGoods.form",
        data: {cid: cid, key: key, order: order, up: up},
        dataType: "json",
        success: function (data) {
            var html = '<div class="panel panel-primary">'
                +'<div class="navbar navbar-inverse">'
                +'<div class="container-fluid">'
                +'<div id="header" class="navbar-header">'

                +'<a id="title" class="navbar-brand">库存信息</a>'

                +'</div>'
                +'<div id="action-nav" class="collapse navbar-collapse">'
                +'<form id="search" class="navbar-form navbar-right">'
                +'<div class="form-group">'
                +'<input type="text" class="form-control" placeholder="请输入您要搜索的内容">'
                +'</div>'
                +'<button type="submit" class="btn btn-default">搜索</button>'
                +'</form>'
                +'<ul id="part-choose" class="nav navbar-nav">'
                +'<li class="dropdown">'
                +'<a id="part-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                +'aria-haspopup="true" aria-expanded="false">选择部门<span class="caret"></span></a>'
                +'<ul class="dropdown-menu">'
                +'<li><a href="#">业务部</a></li>'
                +'<li><a href="#">人事部</a></li>'
                +'<li><a href="#">财政部</a></li>'
                +'<li><a href="#">管理部</a></li>'
                +'</ul>'
                +'</li>'
                +'</ul>'
                +'<ul id="sort-choose" class="nav navbar-nav">'
                +'<li class="dropdown">'
                +'<a id="sort-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                +'aria-haspopup="true" aria-expanded="false">排序方式<span class="caret"></span></a>'
                +'<ul class="dropdown-menu">'
                +'<li><a href="#">按排序</a></li>'
                +'<li><a href="#">按排序</a></li>'
                +'<li><a href="#">按排序</a></li>'
                +'<li><a href="#">按排序</a></li>'
                +'</ul>'
                +'</li>'
                +'</ul>'
                +'<ul id="up-choose" class="nav navbar-nav">'
                +'<li class="dropdown">'
                +'<a id="up-name" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
                +'aria-haspopup="true" aria-expanded="false">升序/降序<span class="caret"></span></a>'
                +'<ul class="dropdown-menu">'
                +'<li><a href="#">升序</a></li>'
                +'<li><a href="#">降序</a></li>'
                +'</ul>'
                +'</li>'
                +'</ul>'
                +'</div>'
                +'</div>'
                +'</div>'
            html = html+ '<div id="table-div" class="panel-body"><table class="table table-striped" id="mainTable"> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>';
            for (var i = 0; i < data.length; i++) {
                html = html + "<tr><td>" + data[i].gname + "</td><td>" + data[i].classify + "</td><td>" + data[i].cost + "</td><td>" + data[i].store + "</td><td>" + data[i].total + "</td></tr>";
            }
            html = html + "</table></div>";
            $("#main-body").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function getGain(cid, part, key, order, up) {
    $.ajax({
        type: "POST",
        url: "select/getGain.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (data) {
            var html = "<table class='table table-striped' id='mainTable'> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>";
            for (var i = 0; i < data.length; i++) {
                html = html + "<tr><td>" + data[i].gname + "</td><td>" + data[i].classify + "</td><td>" + data[i].cost + "</td><td>" + data[i].store + "</td><td>" + data[i].total + "</td></tr>";
            }
            html = html + "</table>";
            $("#table-div").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function getDemand(cid, part, key, order, up) {
    $.ajax({
        type: "POST",
        url: "select/getDemand.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (goodsList) {
            var html = "<table class='table table-striped' id='mainTable'> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>";
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td></tr>";
            }
            html = html + "</table>";
            $("#table-div").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}


function getDamage(cid, part, key, order, up) {
    $.ajax({
        type: "POST",
        url: "select/getDamage.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (goodsList) {
            var html = "<table class='table table-striped' id='mainTable'> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>";
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td></tr>";
            }
            html = html + "</table>";
            $("#table-div").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}

function getUser(cid, part, key, order, up) {
    $.ajax({
        type: "POST",
        url: "select/getUser.form",
        data: {cid: cid, part: part, key: key, order: order, up: up},
        dataType: "json",
        success: function (goodsList) {
            var html = "<table class='table table-striped' id='mainTable'> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>";
            for (var i = 0; i < goodsList.length; i++) {
                html = html + "<tr><td>" + goodsList[i].gname + "</td><td>" + goodsList[i].classify + "</td><td>" + goodsList[i].cost + "</td><td>" + goodsList[i].store + "</td><td>" + goodsList[i].total + "</td></tr>";
            }
            html = html + "</table>";
            $("#table-div").html(html);
        },
        error: function () {
            alert("error");
        }
    });
}
