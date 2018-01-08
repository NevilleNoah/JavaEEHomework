
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
<div class="rectangle"><h1 class="biaoti">办公用品管理系统</h1></div>
<img src="img/城市.png"  class="chengshi">
<div class="eform">
<div id="login-group" class="panel panel-primary">
    <div class="panel-heading" style="background-color:#0f0f0f;height: 50px;padding-top: 17px">
        <h3 class="panel-title" style="font-size: 18px"><center>登&nbsp;&nbsp;&nbsp;&nbsp;录</center></h3>
    </div>
    <div class="panel-body">
        <form id="login-form" action="/login/checkLogin.form" name="login" method="post">
            <br/>
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="lnr lnr-coffee-cup"></i></span>
                <input type="text" class="form-control" placeholder="请输入公司名" name="cid" aria-describedby="basic-addon1">
            </div>
            <br/><span id="cid-remind"></span>
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon2"><i class="lnr lnr-book"></i></span>
                <input type="text" class="form-control" placeholder="请输入工号" name="id" aria-describedby="basic-addon2">
            </div>
            <br/><span id="username-remind"></span>
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon3"><i class="lnr lnr-lock"></i></span>
                <input type="password" class="form-control" placeholder="请输入密码" name="password" aria-describedby="basic-addon3">
            </div>
            <br/><span id="password-remind"></span>
            <input id="submit" type="submit" class="btn btn-default" value="提交" style="background-color: #0f0f0f;color: #ffffff" onClick="return validateLogin()"  />
            <input id="hidbtn" type="hidden" value="${ename}">

        </form>
    </div>
</div>
</div>

<script language="javascript">
    function validateLogin(){
        var id = document.login.id.value ;
        var sPassword = document.login.password.value ;
        var cid = document.login.cid.value ;

        if (cid ==""){
            alert("请输入公司号!");
            return false ;
        }

        if (id ==""){
            alert("请输入员工号!");
            return false ;
        }

        if (sPassword ==""){
            alert("请输入密码!");
            return false ;
        }


    }

</script>

</body>
</html>
