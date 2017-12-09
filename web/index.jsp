<%@ page import="com.entity.Goods" %>
<%@ page import="java.util.List" %>
<%@ page import="static com.service.GoodsManager.selectAllGoods" %><%--
  Created by IntelliJ IDEA.
  User: asus
  Date: 2017/12/7/007
  Time: 13:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
    <%
      List<Goods> goodsList = selectAllGoods(214214);
      for (int i = 0; i < goodsList.size(); i++) {
    %>
      <%=goodsList.get(i).getGname()%>
    <%
      }
    %>
  </body>
</html>
