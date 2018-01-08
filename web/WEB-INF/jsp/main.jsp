<%--
  Created by IntelliJ IDEA.
  User: asus
  Date: 2017/12/7/007
  Time: 18:12
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>办公用品管理系统</title>

    <!-- Javascript -->
    <script src="../../vendor/jquery/jquery.min.js"></script>
    <script src="../../vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="../../vendor/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="../../vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js"></script>
    <script src="../../vendor/chartist/js/chartist.min.js"></script>
    <script src="../../js/klorofil-common.js"></script>
    <script src="../../js/dataOption.js"></script>


    <!-- CSS -->
    <link rel="stylesheet" href="../../vendor/bootstrap/css/bootstrap.min.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="../../vendor/font-awesome/css/font-awesome.min.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="../../vendor/linearicons/style.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="../../vendor/chartist/css/chartist-custom.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="../../css/demo.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="../../css/formStyle.css?v=<%= System.currentTimeMillis()%>">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700">
    <link rel="stylesheet" href="../../css/main.css?v=<%= System.currentTimeMillis()%>">
    <script>

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


<div id="wrapper">
    <div class="navbar navbar-myset navbar-fixed-top"></div>
    <div id="sidebar-nav" class="sidebar" style="width: 14%">
        <div class="sidebar-scroll">
            <nav>
                <ul class="nav">
                    <li>
                        <a href="#subPages0" data-toggle="collapse" class="collapsed"><i class="lnr lnr-book"></i>
                            <span>信息概览</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages0" class="collapse">
                            <ul class="nav">
                                <li><a class="choose" onclick="getChart()">图表概览</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#subPages1" data-toggle="collapse" class="collapsed"><i class="lnr lnr-file-empty"></i>
                            <span>库存管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages1" class="collapse ">
                            <ul class="nav">
                                <li><a class="choose" onclick="getGoods('', '', '默认排序')">库存信息</a></li>
                                <li><a class="choose" onclick="newGoods()">新增物品</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#subPages2" data-toggle="collapse" class="collapsed"><i class="lnr lnr-neutral"></i>
                            <span>需求管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages2" class="collapse">
                            <ul class="nav">
                                <li><a class="choose" onclick="getDemand('所有部门', '', '', '默认排序')">需求信息</a></li>
                                <li><a class="choose" onclick="newDemand()">添加需求</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#subPages3" data-toggle="collapse" class="collapsed"><i class="lnr lnr-users"></i>
                            <span>员工管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages3" class="collapse">
                            <ul class="nav">
                                <li><a class="choose" onclick="getUser('所有部门', '', '', '默认排序')">员工信息</a></li>
                                <li><a class="choose" onclick="newEmployee()">添加员工</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#subPages4" data-toggle="collapse" class="collapsed"><i class="lnr lnr-arrow-down"></i>
                            <span>领取/归还</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages4" class="collapse ">
                            <ul class="nav">
                                <li><a class="choose" onclick="getGain('所有部门', '', '', '默认排序')">信息记录</a></li>
                                <li><a class="choose" onclick="enterGainGoods('', '', '默认排序')">领取物品</a></li>
                                <li><a class="choose" onclick="getReturn('所有部门','','','默认排序')">归还物品</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#subPages5" data-toggle="collapse" class="collapsed"><i class="lnr lnr-page-break"></i>
                            <span>损坏管理</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
                        <div id="subPages5" class="collapse ">
                            <ul class="nav">
                                <li><a class="choose" onclick="getDamage('所有部门', '', '', '默认排序')">损坏记录</a></li>
                                <li><a class="choose" onclick="newDamage()">添加记录</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <input id="cid" type="hidden" value="214214"/>
    <div id="main-body">


    </div>
</div>

<script>
    /*var cid = $("#cid").val();
    document.getElementById('company').value=cid;*/
    getChart();


</script>
</body>
</html>
