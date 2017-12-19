package com.controller;

import com.entity.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.portlet.ModelAndView;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.service.DamageManager.selectDamage;
import static com.service.DemandManager.selectDemand;
import static com.service.GainManager.selectGain;
import static com.service.GainManager.selectGainGoods;
import static com.service.GoodsManager.*;
import static com.service.UserManager.selectUser;

/**
 * Created by asus on 2017/12/10/010.
 */
@Controller
@RequestMapping("/select")
public class SelectController {

    @RequestMapping("/getGoods")
    @ResponseBody
    public static List<Goods> getGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String key = request.getParameter("key");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<Goods> goodsList;
        goodsList = selectGoods(cid, key, order, up);

        return goodsList;
    }

    @RequestMapping("/getGain")
    @ResponseBody
    public static List<Gain> getGain(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String str = request.getParameter("str");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<Gain> gainList;
        gainList = selectGain(cid, part, str, order, up);

        return gainList;
    }

    @RequestMapping("/getDamage")
    @ResponseBody
    public static List<Damage> getDamage(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String str = request.getParameter("str");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<Damage> damageList;
        damageList = selectDamage(cid, part, str, order, up);


        return damageList;
    }

    @RequestMapping("/getDemand")
    @ResponseBody
    public static List<Demand> getDemand(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String str = request.getParameter("str");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<Demand> demandList;
        demandList = selectDemand(cid, part, str, order, up);


        return demandList;
    }

    @RequestMapping("/getUser")
    @ResponseBody
    public static List<User> getUser(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String str = request.getParameter("str");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<User> userList;
        userList = selectUser(cid, part, str, order, up);

        return userList;
    }


    @RequestMapping("/getGainGoods")
    @ResponseBody
    public static List<GainGoods> getGainGoods(HttpServletRequest request, HttpServletResponse response) throws  IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));

        List<GainGoods> gainGoodsList = selectGainGoods(cid);

        return gainGoodsList;

    }

}
