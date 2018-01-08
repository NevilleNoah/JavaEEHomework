package com.service;

import com.dao.LoginMapper;
import com.entity.Login;
import org.apache.ibatis.session.SqlSession;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

import static com.dbtools.GetSqlSession.getSqlSession;

/**
 * Created by 16-计算机一班卢毅恒 on 2017/12/27.
 */
public class LoginManager {

    public static String checklogin( Integer cid, Integer id, String password) throws IOException {

        SqlSession sqlSession = getSqlSession();
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("com/beans.xml");
        Login login = (Login) applicationContext.getBean("login");


        LoginMapper mapper = sqlSession.getMapper(LoginMapper.class);
        String  ename = mapper.selectLogin(cid, id, password);





        sqlSession.commit();

        sqlSession.close();




            return ename;





    }

}
