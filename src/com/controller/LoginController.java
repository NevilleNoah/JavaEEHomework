package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

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
    public ModelAndView checkLogin(String cname, String username, String password, Model model) {
        model.addAttribute("cname", cname);
        model.addAttribute("username", username);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("main");
        return modelAndView;
    }
}
