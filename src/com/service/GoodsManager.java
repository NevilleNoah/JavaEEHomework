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
    public static List<Goods> sortGoodsByCostUp(Integer companyId, String gname) throws IOException {
        System.out.println("begin sort");
        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GoodsExample goodsExample = new GoodsExample();
        GoodsExample.Criteria criteria = goodsExample.createCriteria();
        criteria.andCidEqualTo(companyId);
        criteria.andGnameLike("%"+gname+"%");
        goodsExample.setOrderByClause("cost ASC");
        System.out.println("set");

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;
    }

    /**
     * 按价格降序
     * @param companyId 公司ID
     * @return 物品列表
     * @throws IOException
     */
    public static List<Goods> sortGoodsByCostDown(Integer companyId, String gname) throws IOException {
        System.out.println("begin sort");
        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GoodsExample goodsExample = new GoodsExample();
        GoodsExample.Criteria criteria = goodsExample.createCriteria();
        criteria.andCidEqualTo(companyId);
        criteria.andGnameLike("%"+gname+"%");
        goodsExample.setOrderByClause("cost DESC");
        System.out.println("set");

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;
    }

    /**
     * 按类别升序
     * @param companyId
     * @param gname
     * @return
     * @throws IOException
     */
    public static List<Goods> sortGoodsByClassifyUp(Integer companyId, String gname) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GoodsExample goodsExample = new GoodsExample();
        GoodsExample.Criteria criteria = goodsExample.createCriteria();
        criteria.andCidEqualTo(companyId);
        criteria.andGnameLike(gname);
        goodsExample.setOrderByClause("classify ASC");

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;
    }

    /**
     * 按类别降序
     * @param companyId
     * @param gname
     * @return
     * @throws IOException
     */
    public static List<Goods> sortClassifyByDown(Integer companyId, String gname) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GoodsExample goodsExample = new GoodsExample();
        GoodsExample.Criteria criteria = goodsExample.createCriteria();
        criteria.andCidEqualTo(companyId);
        criteria.andGnameLike(gname);
        goodsExample.setOrderByClause("classify DESC");

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;
    }


}
