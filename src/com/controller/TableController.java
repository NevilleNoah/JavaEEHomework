package com.controller;

import com.entity.GainGoods;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static com.service.GainManager.*;

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
        if(isRepeat) {
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
}
