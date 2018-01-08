package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

import static com.service.LoginManager.checklogin;

/**
 * Created by asus on 2017/12/13/013.
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    /*@RequestMapping(value = "/checkLogin" , method = RequestMethod.POST)
    public String checkLogin(String cname, String username, String password, Model model) {
        model.addAttribute("cname", cname);
        model.addAttribute("username", username);

        return "redirect:/main.jsp";
    }*/

    @RequestMapping(value = "/checkLogin" , method = RequestMethod.POST)
    public ModelAndView checkLogin(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        Integer id = Integer.valueOf(request.getParameter("id"));
        String password = request.getParameter("password");

        String ename  = checklogin(cid, id, password);

        if (ename==null) {
            // 如果记录集非空，表明有匹配的用户名和密码，登陆成功
            response.sendRedirect("../index.jsp");
            System.out.println("登录失败，用户名或密码不正确");
        }
        System.out.println("ename的值为"+ename);
        model.addAttribute("cid",cid);
        model.addAttribute("id", id);
        model.addAttribute("ename", ename);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("main");
        return modelAndView;



    }



}








