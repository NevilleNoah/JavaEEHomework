
<%--
  Created by IntelliJ IDEA.
  User: asus
  Date: 2017/12/7/007
  Time: 13:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<html>
<head>
    <title>$Title$</title>
    <!-- Java Script-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!-- CSS -->
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/index.css"?v=<%= System.currentTimeMillis()%>/>
    <link rel="stylesheet" href="vendor/linearicons/style.css"/>

</head>
<body>
<div id="login-group" class="panel panel-primary">
    <div class="panel-heading">
        <h3 class="panel-title">登录</h3>
    </div>
    <div class="panel-body">
        <form id="login-form" action="/login/checkLogin.form" method="post">
            <br/>
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="lnr lnr-coffee-cup"></i></span>
                <input type="text" class="form-control" placeholder="请输入公司名" name="cname" aria-describedby="basic-addon1">
            </div>
            <br/><span id="cid-remind"></span>
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon2"><i class="lnr lnr-book"></i></span>
                <input type="text" class="form-control" placeholder="请输入工号" name="username" aria-describedby="basic-addon2">
            </div>
            <br/><span id="username-remind"></span>
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon3"><i class="lnr lnr-lock"></i></span>
                <input type="password" class="form-control" placeholder="请输入密码" name="password" aria-describedby="basic-addon3">
            </div>
            <br/><span id="password-remind"></span>
            <input id="submit" type="submit" class="btn btn-primary" value="提交"/>
        </form>
    </div>
</div>

</body>
</html>
