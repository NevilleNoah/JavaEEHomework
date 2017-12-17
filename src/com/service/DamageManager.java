package com.service;

import com.dbtools.GetSqlSession;
import com.entity.Damage;
import com.entity.DamageExample;
import org.apache.ibatis.session.SqlSession;

import java.io.IOException;
import java.util.List;

/**
 * Created by asus on 2017/12/12/012.
 */
public class DamageManager {
    /**
     * 搜索受损物品
     *
     * @param companyId 公司ID
     * @param key     关键词
     * @param order     排序依据
     * @param up        排序方式，0为升序，1为降序，否则为默认排序
     * @return
     * @throws IOException
     */
    public static List<Damage> selectDamage(Integer companyId, String part, String key, String order, String up) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        DamageExample damageExample = new DamageExample();

        //关键字为空则搜索全部，否则根据关键字搜索
        if (key == null || key.length() == 0) {
            if(part.equals("所有部门")) {
                damageExample.or().andCidEqualTo(companyId);
            } else {
                damageExample.or().andCidEqualTo(companyId).andPartEqualTo(part);
            }
        } else {
            if(part.equals("所有部门")) {
                damageExample.or().andCidEqualTo(companyId).andGnameLike("%" + key + "%");
            } else {
                damageExample.or().andCidEqualTo(companyId).andPartEqualTo(part).andGnameLike("%" + key + "%");
            }
        }
        //设置升序降序或默认排序
        if(!order.equals("default")) {
            String sortWay;
            if (up.equals("升序")) {
                sortWay = " ASC";
                damageExample.setOrderByClause(order + sortWay);
            } else if (up.equals("降序")) {
                sortWay = " DESC";
                damageExample.setOrderByClause(order + sortWay);
            } else {

            }
        }


        List<Damage> damageList = sqlSession.selectList("com.dao.DamageMapper.selectByExample", damageExample);

        sqlSession.commit();
        sqlSession.close();
        return damageList;
    }
}
