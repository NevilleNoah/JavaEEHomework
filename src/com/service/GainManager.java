package com.service;

import com.dbtools.GetSqlSession;
import com.entity.Gain;
import com.entity.GainExample;
import com.entity.Goods;
import org.apache.ibatis.session.SqlSession;

import java.io.IOException;
import java.util.List;

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
        SqlSession sqlSession = GetSqlSession.getSqlSession();
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
}
