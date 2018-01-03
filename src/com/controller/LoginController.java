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
        String cname = request.getParameter("cname");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        model.addAttribute("cid", 214214);
        model.addAttribute("username", username);


        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("main");
        return modelAndView;
    }


    @RequestMapping("/inLogin")
    @ResponseBody
    public static void login(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        Integer id = Integer.valueOf(request.getParameter("id"));
        Integer password = Integer.valueOf(request.getParameter("password"));


    }
}








