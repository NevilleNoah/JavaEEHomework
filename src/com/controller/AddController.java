package com.controller;

import com.entity.GainGoods;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import static com.service.GainManager.addGainGoods;

/**
 * Created by asus on 2017/12/17/017.
 */
@Controller
@RequestMapping("/add")
public class AddController {

    @RequestMapping("/gainGoodsAdd")
    @ResponseBody
    public static void gainGoodsAdd(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String gname = request.getParameter("gname");
        Integer number = Integer.valueOf(request.getParameter("number"));

        addGainGoods(cid, gname, number);

    }
}
