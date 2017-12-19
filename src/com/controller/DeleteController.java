package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

import static com.service.GainManager.clearGainGoods;

/**
 * Created by asus on 2017/12/17/017.
 */
@Controller
@RequestMapping("/delete")
public class DeleteController {

    @RequestMapping("/deleteGainGoodsAll")
    public void DeleteGainGoodsAll(Integer cid) throws IOException {
        clearGainGoods(cid);
    }
}
