package com.controller;

import com.entity.Goods;
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

import static com.service.GoodsManager.selectGoodsByCompanyId;
import static com.service.GoodsManager.sortGoodsByCostDown;
import static com.service.GoodsManager.sortGoodsByCostUp;

/**
 * Created by asus on 2017/12/10/010.
 */
@Controller
@RequestMapping("/goods")
public class GoodsController {

    @RequestMapping("/getGoodsByCompanyId")
    @ResponseBody
    public List<Goods> getGoodsByCompanyId(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        List<Goods> goodsList = selectGoodsByCompanyId(cid);
        return goodsList;

    }

    @RequestMapping("/sortGoodsByCost")
    @ResponseBody
    public List<Goods> sortGoodsByCost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("action");
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String str = request.getParameter("str");
        Boolean up = Boolean.valueOf(request.getParameter("up"));

        List<Goods> goodsList;

        if(up) {
            System.out.println("true");
            goodsList = sortGoodsByCostUp(cid, str);
        } else {
            System.out.println("false");
            goodsList = sortGoodsByCostDown(cid, str);
        }
        if(goodsList == null) {
            System.out.println(goodsList.toString());
        }
        return goodsList;
    }





}
