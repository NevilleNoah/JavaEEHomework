<%--
  Created by IntelliJ IDEA.
  User: asus
  Date: 2017/12/7/007
  Time: 18:12
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>办公用品管理系统</title>

    <!-- Javascript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="vendor/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js"></script>
    <script src="vendor/chartist/js/chartist.min.js"></script>
    <script src="js/klorofil-common.js"></script>


    <!-- CSS -->
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendor/linearicons/style.css">
    <link rel="stylesheet" href="vendor/chartist/css/chartist-custom.css">
    <link rel="stylesheet" href="css/main.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="css/demo.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700">

    <script>
        function getAllGoods(cid) {
            $.ajax({
                type: "POST",
                url: "goods/getGoodsByCompanyId.form",
                data: {cid:cid},
                dataType: "json",
                success: function (goodsList) {
                    var html = "<table class='table table-striped' id='mainTable'> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>";
                    for(var i=0;i<goodsList.length;i++)
                    {
                        html=html+"<tr><td>"+goodsList[i].gname+"</td><td>"+goodsList[i].classify+"</td><td>"+goodsList[i].cost+"</td><td>"+goodsList[i].store+"</td><td>"+goodsList[i].total+"</td></tr>";
                    }
                    html= html+"</table>";
                    $("#tableDiv").html(html);
                },
                error:function () {
                    alert("error");
                }
            });
        }

        function sortGoodsCostBy(cid,up,str) {
            $.ajax({
                type: "POST",
                url: "goods/sortGoodsByCost.form",
                data: {cid:cid,up:up,str:str},
                dataType: "json",
                success: function (goodsList) {
                    var html = "<table class='table table-striped' id='mainTable'> <tr> <th>商品名称</th> <th>商品类别</th> <th>价格</th> <th>库存</th> <th>总量</th> </tr>";

                    for(var i=0;i<goodsList.length;i++){
                        html=html+"<tr><td>"+goodsList[i].gname+"</td><td>"+goodsList[i].classify+"</td><td>"+goodsList[i].cost+"</td><td>"+goodsList[i].store+"</td><td>"+goodsList[i].total+"</td></tr>";
                    }


                    html= html+"</table>";
                    $("#tableDiv").html(html);
                },
                error:function () {
                    alert("error");
                }
            });
        }


        $(document).ready(function () {
            var trigger = $('.hamburger'),
                overlay = $('.overlay'),
                isClosed = false;

            trigger.click(function () {
                hamburger_cross();
            });

            function hamburger_cross() {

                if (isClosed == true) {
                    overlay.hide();
                    trigger.removeClass('is-open');
                    trigger.addClass('is-closed');
                    isClosed = false;
                } else {
                    overlay.show();
                    trigger.removeClass('is-closed');
                    trigger.addClass('is-open');
                    isClosed = true;
                }
            }

            $('[data-toggle="offcanvas"]').click(function () {
                $('#wrapper').toggleClass('toggled');
            });
        });

    </script>
</head>
<body>


<%--<div id="mainDiv" >
<div class="panel-group" id="accordion" style="" role="tablist" aria-multiselectable="true">

    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                   aria-expanded="false" aria-controls="collapseThree">
                    库存管理
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
                <div id="store_info" class="">
                    库存信息
                </div>
                <div id="add_store" class="">
                    添加总量
                </div>
                <div id="sub_store" class="">
                    减少总量
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingTwo">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"
                   aria-expanded="false" aria-controls="collapseTwo">
                    需求管理
                </a>
            </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div class="panel-body">
                <div id="demand_info" class="">
                    需求信息
                </div>
                <div id="demand_add" class="">
                    添加需求
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingThree">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"
                   aria-expanded="false" aria-controls="collapseThree">
                    员工管理
                </a>
            </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div class="panel-body">
                <div id="employee_info" class="">
                    员工信息
                </div>
                <div id="employee_add" class="">
                    添加员工
                </div>
                <div id="employee_fire" class="">
                    员工离职
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingFour">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"
                   aria-expanded="false" aria-controls="collapseTwo">
                    领取/归还
                </a>
            </h4>
        </div>
        <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
            <div class="panel-body">
                <div id="goods_take" class="">
                    领取
                </div>
                <div id="goods_return" class="">
                    归还
                </div>
                <div id="goods_record" class="">
                    记录
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingFive">
            <h4 class="panel-title">
                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive"
                   aria-expanded="false" aria-controls="collapseThree">
                    损坏管理
                </a>
            </h4>
        </div>
        <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
            <div class="panel-body">
                <div id="demage_add" class="">
                    添加记录
                </div>
                <div id="demage_record" class="">
                    损坏记录
                </div>
            </div>
        </div>
    </div>
</div>--%>
<div id="sidebar-nav" class="sidebar">
    <div class="sidebar-scroll">
        <nav>
            <ul class="nav">
                <li>
                    <a href="#subPages1" data-toggle="collapse" class="collapsed"><i class="lnr lnr-file-empty"></i> <span>库存管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                    <div id="subPages1" class="collapse ">
                        <ul class="nav">
                            <li><a class="">库存信息</a></li>
                            <li><a class="">添加总量</a></li>
                            <li><a class="">减少总量</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#subPages2" data-toggle="collapse" class="collapsed"><i class="lnr lnr-neutral"></i> <span>需求管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                    <div id="subPages2" class="collapse">
                        <ul class="nav">
                            <li><a class="">需求信息</a></li>
                            <li><a class="">添加需求</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#subPages3" data-toggle="collapse" class="collapsed"><i class="lnr lnr-users"></i> <span>员工管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                    <div id="subPages3" class="collapse">
                        <ul class="nav">
                            <li><a class="">员工信息</a></li>
                            <li><a class="">添加员工</a></li>
                            <li><a class="">离职员工</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#subPages4" data-toggle="collapse" class="collapsed"><i class="lnr lnr-arrow-down"></i> <span>领取/归还</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                    <div id="subPages4" class="collapse ">
                        <ul class="nav">
                            <li><a class="">信息记录</a></li>
                            <li><a class="">领取物品</a></li>
                            <li><a class="">归还物品</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#subPages5" data-toggle="collapse" class="collapsed"><i class="lnr lnr-page-break"></i> <span>损坏管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                    <div id="subPages5" class="collapse ">
                        <ul class="nav">
                            <li><a class="">损坏记录</a></li>
                            <li><a class="">添加记录</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</div>
<div id="tableDiv">
    <script>
        sortGoodsCostBy(214214, false, "纸");
    </script>
</div>
<%--<input id="all" type="button" value="点击" onclick="getAllGoods()"/>--%>

</div>
</body>
</html>
