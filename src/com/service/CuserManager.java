package com.service;

import com.dao.CuserMapper;
import com.dbtools.GetSqlSession;
import com.entity.Cuser;
import com.entity.CuserExample;
import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.util.List;

import static com.dbtools.GetSqlSession.getSqlSession;

/**
 * Created by asus on 2017/12/12/012.
 */

public class CuserManager {
    /**
     * 搜索员工信息
     * @param companyId 公司ID
     * @param key 关键词
     * @param order 排序依据
     * @param up 排序方式，0为升序，1为降序，否则为默认排序
     * @return
     * @throws IOException
     */
    public static List<Cuser> selectCuser(Integer companyId, String part, String key, String order, String up) throws IOException {
        SqlSession sqlSession = getSqlSession();
        CuserExample cuserExample = new CuserExample();

        //关键字为空则搜索全部，否则根据关键字搜索
        if(key == null || key.length() == 0) {
            if(part.equals("所有部门")) {
                cuserExample.or().andCidEqualTo(companyId);
            } else {
                cuserExample.or().andCidEqualTo(companyId).andPartEqualTo(part);
            }
        } else {
            if(part.equals("所有部门")) {
                cuserExample.or().andCidEqualTo(companyId).andEnameLike("%"+key+"%");
            } else {
                cuserExample.or().andCidEqualTo(companyId).andPartEqualTo(part).andEnameLike("%"+key+"%");
            }
        }
        //设置升序降序或默认排序
        if(!order.equals("default")) {
            String sortWay;
            if (up.equals("升序")) {
                sortWay = " ASC";
                cuserExample.setOrderByClause(order + sortWay);
            } else if (up.equals("降序")) {
                sortWay = " DESC";
                cuserExample.setOrderByClause(order + sortWay);
            } else {

            }
        }

        List<Cuser> cuserList = sqlSession.selectList("com.dao.CuserMapper.selectByExample", cuserExample);

        sqlSession.commit();
        sqlSession.close();
        return cuserList;
    }




    public static void addCuser( Integer id, Integer ismanager, String ename, String sex, Integer age, String intime, String outtime, String img, Integer phone, String address, Integer cid, String part) throws IOException {

        SqlSession sqlSession = getSqlSession();

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        Cuser cuser = (Cuser) applicationContext.getBean("cuser");


        cuser.setId(id);
        cuser.setIsmanager(ismanager);
        cuser.setEname(ename);
        cuser.setSex(sex);
        cuser.setAge(age);
        cuser.setIntime(intime);
        cuser.setOuttime(outtime);
        cuser.setImg(img);
        cuser.setPhone(phone);
        cuser.setAddress(address);
        cuser.setCid(cid);
        cuser.setPart(part);


        CuserMapper cuserMapper = sqlSession.getMapper(CuserMapper.class);

        cuserMapper.insert(cuser);

        sqlSession.commit();
        sqlSession.close();
    }

    public static void doOutEmployee(Integer cid, String ename, String time) throws IOException {
        SqlSession sqlSession = getSqlSession();

        CuserMapper mapper = sqlSession.getMapper(CuserMapper.class);
        mapper.out(cid, ename, time);

        sqlSession.commit();
        sqlSession.close();
    }


}