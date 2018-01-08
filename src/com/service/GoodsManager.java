package com.service;

import com.dao.CuserMapper;
import com.dao.GainMapper;
import com.dao.GoodsMapper;
import com.dbtools.GetSqlSession;
import com.entity.ForClassify;
import com.entity.Goods;
import com.entity.GoodsExample;
import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
    public static List<Goods> selectGoods(Integer companyId, String key, String order, String up) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        GoodsExample goodsExample = new GoodsExample();
        //关键字为空则搜索全部，否则根据关键字搜索
        if(key == null || key.length() == 0) {
            goodsExample.or().andCidEqualTo(companyId);
        } else {
            goodsExample.or().andCidEqualTo(companyId).andGnameLike("%"+key+"%");
        }
        //设置升序降序或默认排序
        if(!order.equals("default")) {
            String sortWay;
            if (up.equals("升序")) {
                sortWay = " ASC";
                goodsExample.setOrderByClause(order + sortWay);
            } else if (up.equals("降序")) {
                sortWay = " DESC";
                goodsExample.setOrderByClause(order + sortWay);
            }
        }

        List<Goods> goodsList = sqlSession.selectList("com.dao.GoodsMapper.selectByExample", goodsExample);

        sqlSession.commit();
        sqlSession.close();
        return goodsList;
    }


    public static void doAddGoods(Integer cid, String gname, Integer change) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();
        GoodsMapper mapper = sqlSession.getMapper(GoodsMapper.class);

        mapper.addGoods(cid, gname, change);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void doSubGoods(Integer cid, String gname, Integer change) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();
        GoodsMapper mapper = sqlSession.getMapper(GoodsMapper.class);

        mapper.subGoods(cid, gname, change);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void doRemoveGoods(Integer cid, String gname) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();
        GoodsMapper mapper = sqlSession.getMapper(GoodsMapper.class);

        mapper.removeGoods(cid, gname);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void doAddNewGoods(Integer cid, String gname, String classify, Integer total, Double cost) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();
        GoodsMapper mapper = sqlSession.getMapper(GoodsMapper.class);

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        Goods goods = (Goods)applicationContext.getBean("goods");
        goods.setGname(gname);
        goods.setCid(cid);
        goods.setClassify(classify);
        goods.setTotal(total);
        goods.setStore(total);
        goods.setCost(cost);
        goods.setImg(null);
        mapper.insert(goods);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void returnGoods(Integer cid, Integer id, String gname, Integer number) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();

        GainMapper gainMapper = sqlSession.getMapper(GainMapper.class);
        gainMapper.returnGoods(cid, id, gname, number);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void returnAllGoods(Integer cid, Integer id, String gname) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();

        GainMapper gainMapper = sqlSession.getMapper(GainMapper.class);
        gainMapper.returnAll(cid, id, gname);

        sqlSession.commit();
        sqlSession.close();
    }

    public static List<ForClassify> classify(Integer cid) throws IOException {
        SqlSession sqlSession  = GetSqlSession.getSqlSession();

        GoodsMapper goodsMapper = sqlSession.getMapper(GoodsMapper.class);
        List<ForClassify> list = goodsMapper.classify(cid);

        sqlSession.commit();
        sqlSession.close();

        return list;
    }
}
