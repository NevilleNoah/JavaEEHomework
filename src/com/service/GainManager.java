package com.service;

import com.dao.GainGoodsMapper;
import com.dao.GainMapper;
import com.dbtools.GetSqlSession;
import com.entity.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.dbtools.GetSqlSession.*;


/**
 * Created by asus on 2017/12/12/012.
 */
public class GainManager {

    /**
     * 搜索领取归还的记录
     * @param companyId 公司ID
     * @param key 关键词
     * @param order 排序依据
     * @param up 排序方式，0为升序，1为降序，否则为默认排序
     * @return
     * @throws IOException
     */
    public static List<Gain> selectGain(Integer companyId, String part, String key, String order, String up) throws IOException {
        SqlSession sqlSession = getSqlSession();
        GainExample gainExample = new GainExample();

        //关键字为空则搜索全部，否则根据关键字搜索
        if(key == null || key.length() == 0) {
            gainExample.or().andCidEqualTo(companyId);
        } else {
            gainExample.or().andCidEqualTo(companyId).andGnameLike("%"+key+"%");
        }
        //设置升序降序或默认排序
        if(!order.equals("default")) {
            String sortWay;
            if (up.equals("升序")) {
                sortWay = " ASC";
                gainExample.setOrderByClause(order + sortWay);
            } else if (up.equals("降序")) {
                sortWay = " DESC";
                gainExample.setOrderByClause(order + sortWay);
            } else {

            }
        }

        List<Gain> gainList = sqlSession.selectList("com.dao.GainMapper.selectByExample", gainExample);

        sqlSession.commit();
        sqlSession.close();
        return gainList;
    }

    public static List<GainGoods> selectGainGoods(Integer cid) throws IOException {
        SqlSession sqlSession = getSqlSession();
        GainGoodsExample gainGoodsExample = new GainGoodsExample();
        gainGoodsExample.or().andCidEqualTo(cid);

        List<GainGoods> gainGoodsList = sqlSession.selectList("com.dao.GainGoodsMapper.selectByExample",gainGoodsExample);

        sqlSession.commit();
        sqlSession.close();
        return gainGoodsList;
    }

    public static void clearGainGoods(Integer cid) throws IOException {

        SqlSession sqlSession = getSqlSession();

        GainGoodsExample gainGoodsExample = new GainGoodsExample();
        gainGoodsExample.or().andCidEqualTo(cid);

        sqlSession.delete("com.dao.GainGoodsMapper.deleteByExample", gainGoodsExample);

        sqlSession.commit();
        sqlSession.close();
    }


    public static boolean gainGoodsCheckRepeat(Integer cid, String gname) throws IOException {
        SqlSession sqlSession = getSqlSession();

        GainGoodsExample example = new GainGoodsExample();
        example.or().andCidEqualTo(cid).andGnameLike(gname);

        List<GainGoods> gainGoods = sqlSession.selectList("com.dao.GainGoodsMapper.selectByExample", example);

        sqlSession.commit();
        sqlSession.close();

        return gainGoods.size()>0;
    }

    public static void addGainGoods(Integer cid, String gname, Integer number) throws IOException {

        SqlSession sqlSession = getSqlSession();

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        GainGoods gainGoods = (GainGoods) applicationContext.getBean("gainGoods");

        gainGoods.setCid(cid);
        gainGoods.setGname(gname);
        gainGoods.setNumber(number);

        GainGoodsMapper gainGoodsMapper = sqlSession.getMapper(GainGoodsMapper.class);
        gainGoodsMapper.insert(gainGoods);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void deleteGainGoods(Integer cid, String gname) throws IOException {

        SqlSession sqlSession = getSqlSession();

        GainGoodsMapper gainGoodsMapper = sqlSession.getMapper(GainGoodsMapper.class);

        GainGoodsExample example = new GainGoodsExample();
        example.or().andCidEqualTo(cid).andGnameEqualTo(gname);

        gainGoodsMapper.deleteByExample(example);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void updateGainGoods(Integer cid, String gname, Integer number) throws IOException {

        SqlSession sqlSession = getSqlSession();

        GainGoodsExample example = new GainGoodsExample();
        example.or().andCidEqualTo(cid).andGnameEqualTo(gname);

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        GainGoods gainGoods = (GainGoods) applicationContext.getBean("gainGoods");

        gainGoods.setCid(cid);
        gainGoods.setGname(gname);
        gainGoods.setNumber(number);

        GainGoodsMapper gainGoodsMapper = sqlSession.getMapper(GainGoodsMapper.class);
        gainGoodsMapper.updateByExample(gainGoods, example);

        sqlSession.commit();
        sqlSession.close();
    }

    public static List<Gain> selectReturn(Integer companyId, String part, String key, String order, String up) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        GainExample gainExample = new GainExample();

        //关键字为空则搜索全部，否则根据关键字搜索
        if(key == null || key.length() == 0) {
            gainExample.or().andCidEqualTo(companyId).andActionEqualTo(0);
        } else {
            gainExample.or().andCidEqualTo(companyId).andGnameLike("%"+key+"%").andActionEqualTo(0);
        }
        //设置升序降序或默认排序
        if(!order.equals("default")) {
            String sortWay;
            if (up.equals("升序")) {
                sortWay = " ASC";
                gainExample.setOrderByClause(order + sortWay);
            } else if (up.equals("降序")) {
                sortWay = " DESC";
                gainExample.setOrderByClause(order + sortWay);
            } else {

            }
        }

        List<Gain> gainList = sqlSession.selectList("com.dao.GainMapper.selectByExample", gainExample);

        sqlSession.commit();
        sqlSession.close();
        return gainList;
    }

    public static void takeGoods(Integer cid, Integer id) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();

        GainMapper gainMapper = sqlSession.getMapper(GainMapper.class);
        gainMapper.take(cid, id);



        sqlSession.commit();
        sqlSession.close();
    }


}

