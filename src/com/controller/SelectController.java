package com.controller;

import com.entity.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static com.service.CuserManager.selectCuser;
import static com.service.DamageManager.selectDamage;
import static com.service.DemandManager.selectDemand;
import static com.service.GainManager.selectGain;
import static com.service.GainManager.selectGainGoods;
import static com.service.GainManager.selectReturn;
import static com.service.GoodsManager.*;


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

    @RequestMapping("/getCuser")
    @ResponseBody
    public static List<Cuser> getCuser(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String str = request.getParameter("str");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<Cuser> cuserList;
        cuserList = selectCuser(cid, part, str, order, up);

        return cuserList;
    }


    @RequestMapping("/getGainGoods")
    @ResponseBody
    public static List<GainGoods> getGainGoods(HttpServletRequest request, HttpServletResponse response) throws  IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));

        List<GainGoods> gainGoodsList = selectGainGoods(cid);

        return gainGoodsList;

    }

    @RequestMapping("/getReturn")
    @ResponseBody
    public static List<Gain> getReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String str = request.getParameter("str");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        List<Gain> returnList;
        returnList = selectReturn(cid, part, str, order, up);

        return returnList;
    }

}
