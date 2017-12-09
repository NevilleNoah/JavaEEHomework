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
    <!-- JavaScript -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>


    <!-- External CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>

<div class="panel-group" id="accordion" style="" role="tablist" aria-multiselectable="true">

    <div class="panel panel-warning">
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
                <div id="store_info" class="list_choose">
                    库存信息
                </div>
                <div id="add_store" class="list_choose">
                    添加总量
                </div>
                <div id="sub_store" class="list_choose">
                    减少总量
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-warning">
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
                <div id="demand_info" class="list_choose">
                    需求信息
                </div>
                <div id="demand_add" class="list_choose">
                    添加需求
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-warning">
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
                <div id="employee_info" class="list_choose">
                    员工信息
                </div>
                <div id="employee_add" class="list_choose">
                    添加员工
                </div>
                <div id="employee_fire" class="list_choose">
                    员工离职
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-warning">
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
                <div id="goods_take" class="list_choose">
                    领取
                </div>
                <div id="goods_return" class="list_choose">
                    归还
                </div>
                <div id="goods_record" class="list_choose">
                    记录
                </div>
            </div>
        </div>
    </div>
    <div class="panel panel-warning">
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
                <div id="demage_add" class="list_choose">
                    添加记录
                </div>
                <div id="demage_record" class="list_choose">
                    损坏记录
                </div>
            </div>
        </div>
    </div>
</div>


</body>
</html>
