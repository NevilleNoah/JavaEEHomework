package com.service;

import com.dao.GainGoodsMapper;
import com.dao.UserMapper;
import com.dbtools.GetSqlSession;
import com.entity.GainGoods;
import com.entity.GainGoodsExample;
import com.entity.User;
import com.entity.UserExample;
import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.util.List;

import static com.dbtools.GetSqlSession.getSqlSession;

/**
 * Created by asus on 2017/12/12/012.
 */
public class UserManager {
    /**
     * 搜索员工信息
     * @param companyId 公司ID
     * @param key 关键词
     * @param order 排序依据
     * @param up 排序方式，0为升序，1为降序，否则为默认排序
     * @return
     * @throws IOException
     */
    public static List<User> selectUser(Integer companyId, String part, String key, String order, String up) throws IOException {
        SqlSession sqlSession = GetSqlSession.getSqlSession();
        UserExample userExample = new UserExample();

        //关键字为空则搜索全部，否则根据关键字搜索
        if(key == null || key.length() == 0) {
            if(part.equals("所有部门")) {
                userExample.or().andCidEqualTo(companyId);
            } else {
                userExample.or().andCidEqualTo(companyId).andPartEqualTo(part);
            }
        } else {
            if(part.equals("所有部门")) {
                userExample.or().andCidEqualTo(companyId).andEnameLike("%"+key+"%");
            } else {
                userExample.or().andCidEqualTo(companyId).andPartEqualTo(part).andEnameLike("%"+key+"%");
            }
        }
        //设置升序降序或默认排序
        if(!order.equals("default")) {
            String sortWay;
            if (up.equals("升序")) {
                sortWay = " ASC";
                userExample.setOrderByClause(order + sortWay);
            } else if (up.equals("降序")) {
                sortWay = " DESC";
                userExample.setOrderByClause(order + sortWay);
            } else {

            }
        }

        List<User> userList = sqlSession.selectList("com.dao.UserMapper.selectByExample", userExample);

        sqlSession.commit();
        sqlSession.close();
        return userList;
    }




    public static void addUser( Integer id, Integer ismanager, String ename, String sex, Integer age, String intime, String outtime, String img, Integer phone, String address, Integer cid, String part) throws IOException {

        SqlSession sqlSession = getSqlSession();

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        User user = (User) applicationContext.getBean("user");


        user.setId(id);
        user.setIsmanager(ismanager);
        user.setEname(ename);
        user.setSex(sex);
        user.setAge(age);
        user.setIntime(intime);
        user.setOuttime(outtime);
        user.setImg(img);
        user.setPhone(phone);
        user.setAddress(address);
        user.setCid(cid);
        user.setPart(part);


        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        userMapper.insert(user);

        sqlSession.commit();
        sqlSession.close();
    }


}
