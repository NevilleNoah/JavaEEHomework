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

    /**
     * 搜索该公司所有商品
     * @param companyId 公司ID
     * @return 物品列表
     * @throws IOException
     */
    public static List<Goods> selectGoodsByCompanyId(Integer companyId) throws IOException {

        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GoodsExample goodsExample = new GoodsExample();
        goodsExample.createCriteria().andCidEqualTo(companyId);

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;

    }

    /**
     * 按价格升序
     * @param companyId 公司ID
     * @return 物品列表
     * @throws IOException
     */
    public static List<Goods> selectGoods(Integer companyId, String gname, String order, Integer up) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        GoodsExample goodsExample = new GoodsExample();
        GoodsExample.Criteria criteria = goodsExample.createCriteria();
        criteria.andCidEqualTo(companyId);

        //关键字为空则搜索全部，否则根据关键字搜索
        if(gname == null || gname.length()!=0) {

        } else {
            criteria.andGnameLike("%"+gname+"%");
        }
        //设置升序降序或默认排序
        String sortWay;
        if(up == 0) {
            sortWay = " ASC";
            goodsExample.setOrderByClause(order+sortWay);

        } else if(up == 1) {
            sortWay = " DESC";
            goodsExample.setOrderByClause(order+sortWay);

        } else {

        }

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;
    }





}
