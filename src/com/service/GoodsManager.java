package com.service;

import com.dbtools.GetSqlSession;
import com.entity.Goods;
import com.entity.GoodsExample;
import org.apache.ibatis.session.SqlSession;

import java.io.IOException;
import java.util.List;

/**
 * Created by asus on 2017/12/9/009.
 */
public class GoodsManager {
    public static List<Goods> selectAllGoods(Integer companyId) throws IOException {

        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GoodsExample goodsExample = new GoodsExample();
        goodsExample.or().andCidEqualTo(companyId);

        List<Goods> goodsList = sqlSession.selectList("com.mapper.GoodsMapper.selectByExample");
        return goodsList;


    }
}
