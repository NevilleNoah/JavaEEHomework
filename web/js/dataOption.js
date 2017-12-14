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
