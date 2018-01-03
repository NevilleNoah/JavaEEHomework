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
import java.net.URLDecoder;
import java.util.List;

import static com.service.CuserManager.addCuser;
import static com.service.GainManager.addGainGoods;

/**
 * Created by asus on 2017/12/17/017.
 */
@Controller
@RequestMapping("/employee")
public class  EmployeeController {

    @RequestMapping("/employeeAdd")
    @ResponseBody
    public static void cuserAdd(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Integer id = Integer.valueOf(request.getParameter("id"));
        Integer ismanager = Integer.valueOf(request.getParameter("ismanager"));
        String ename = request.getParameter("ename");
        String sex = request.getParameter("sex");
        Integer age = Integer.valueOf(request.getParameter("age"));
        String intime = request.getParameter("intime");
        Integer phone = Integer.valueOf(request.getParameter("phone"));
        String address = request.getParameter("address");
        Integer cid = Integer.valueOf(request.getParameter("cid"));
        String part = request.getParameter("part");
        String outtime = request.getParameter("outtime");
        String img = request.getParameter("img");




        ename = new String(ename.getBytes("ISO-8859-1"),"UTF-8");
        sex = new String(sex.getBytes("ISO-8859-1"),"UTF-8");
        intime = new String(intime.getBytes("ISO-8859-1"),"UTF-8");
        address = new String(address.getBytes("ISO-8859-1"),"UTF-8");
        part = new String(part.getBytes("ISO-8859-1"),"UTF-8");
        outtime = new String(outtime.getBytes("ISO-8859-1"),"UTF-8");
        img = new String(img.getBytes("ISO-8859-1"),"UTF-8");





        addCuser(id, ismanager, ename, sex, age, intime, outtime, img, phone, address, cid, part);

    }
}



