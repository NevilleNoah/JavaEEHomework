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
     * 搜索库存物品
     * @param companyId 公司ID
     * @param key 关键词
     * @param order 排序依据
     * @param up 排序方式，0为升序，1为降序，否则为默认排序
     * @return
     * @throws IOException
     */
    public static List<Goods> selectGoods(Integer companyId, String key, String order, Integer up) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        GoodsExample goodsExample = new GoodsExample();

        //关键字为空则搜索全部，否则根据关键字搜索
        if(key == null || key.length()!=0) {
            goodsExample.or().andCidEqualTo(companyId);
        } else {
            goodsExample.or().andCidEqualTo(companyId).andGnameLike("%"+key+"%");
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
