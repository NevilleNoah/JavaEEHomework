package com.service;

import com.entity.Cuser;
import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

import static com.dbtools.GetSqlSession.getSqlSession;

/**
 * Created by 16-计算机一班卢毅恒 on 2017/12/27.
 */
public class LoginManager {

    public static void checklogin( Integer id, Integer password, Integer cid) throws IOException {

        SqlSession sqlSession = getSqlSession();

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        Login login = (Cuser) applicationContext.getBean("cuser");


        login.setId(id);
        login.setPassword(password);
        login.setCid(cid);



        LoginMapper cuserMapper = sqlSession.getMapper(Login.class);

        cuserMapper.insert(cuser);

        sqlSession.commit();
        sqlSession.close();
    }

}
