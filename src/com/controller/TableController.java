package com.controller;

import com.entity.GainGoods;
import com.entity.Goods;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static com.service.CuserManager.addCuser;
import static com.service.DemandManager.doAddNewDemand;
import static com.service.GainManager.*;
import static com.service.GoodsManager.*;

/**
 * Created by asus on 2017/12/19/019.
 */
@Controller
@RequestMapping("/table")
public class TableController {
    @RequestMapping("/onTakingGoods")
    @ResponseBody
    public static List<GainGoods> onTakingGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");
        Integer number = Integer.valueOf(request.getParameter("number"));

        Boolean isRepeat = gainGoodsCheckRepeat(cid, gname);//检查元素是否已存在
        if (isRepeat) {
            //若存在则更新
            updateGainGoods(cid, gname, number);
        } else {
            //不存在则添加
            addGainGoods(cid, gname, number);
        }

        List<GainGoods> gainGoodsList = selectGainGoods(cid);

        return gainGoodsList;
    }

    @RequestMapping("/cancelTakingGoods")
    @ResponseBody
    public static List<GainGoods> cancelTakingGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");

        deleteGainGoods(cid, gname);

        List<GainGoods> gainGoodsList = selectGainGoods(cid);

        return gainGoodsList;
    }

    @RequestMapping("/clearTakingGoods")
    @ResponseBody
    public static void clearTakingGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));

        clearGainGoods(cid);

    }

    @RequestMapping("/enterGainGoods")
    @ResponseBody
    public static List<Goods> enterGainGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String key = request.getParameter("key");
        String order = request.getParameter("order");
        String up = request.getParameter("up");

        clearGainGoods(cid);

        List<Goods> goodsList;
        goodsList = selectGoods(cid, key, order, up);

        return goodsList;
    }

    @RequestMapping("/doTakeGoods")
    public static void doTakeGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        Integer id = Integer.valueOf(request.getParameter("userid"));

        takeGoods(cid, id);
    }

    @RequestMapping("/doReturnGoods")
    public static void doReturnGoods(HttpServletRequest request, HttpServletResponse response) {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        Integer id = Integer.valueOf(request.getParameter("id"));


    }

    @RequestMapping("/addGoods")
    public static void addGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");
        Integer change = Integer.valueOf(request.getParameter("change"));

        doAddGoods(cid, gname, change);
    }

    @RequestMapping("/subGoods")
    public static void subGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");
        Integer change = Integer.valueOf(request.getParameter("change"));

        doSubGoods(cid, gname, change);
    }

    @RequestMapping("/removeGoods")
    public static void removeGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");

        doRemoveGoods(cid, gname);
    }

    @RequestMapping("/addNewGoods")
    public static void addNewGoods(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");
        String classify = request.getParameter("classify");
        Integer total = Integer.valueOf(request.getParameter("total"));
        Double cost = Double.valueOf(request.getParameter("cost"));

        doAddNewGoods(cid, gname, classify, total, cost);
    }

    @RequestMapping("/addNewDemand")
    public static void addNewDemand(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("addNewDemand执行了");
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");
        String classify = request.getParameter("classify");
        Integer need = Integer.valueOf(request.getParameter("need"));
        String part = request.getParameter("part");

        doAddNewDemand(cid, gname, classify, need, part);

    }

    @RequestMapping("/addNewEmployee")
    public static void addNewEmployee(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer id = Integer.valueOf(request.getParameter("id"));
        Integer ismanager = 0;
        String ename = request.getParameter("ename");
        String sex = request.getParameter("sex");
        Integer age = Integer.valueOf(request.getParameter("age"));
        String intime = request.getParameter("intime");
        Integer phone = Integer.valueOf(request.getParameter("phone"));
        String address = request.getParameter("address");
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String outtime = null;
        String img = null;

        addCuser(id, ismanager, ename, sex, age, intime, outtime, img, phone, address, cid, part);

    }
}
