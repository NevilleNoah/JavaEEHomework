package com.dbtools;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by asus on 2017/11/30/030.
 */
public abstract class GetSqlSession {

    public static SqlSession getSqlSession() throws IOException {
        String resource = "mybatis/mybatisConfig.xml";
        InputStream inputStream =
                Resources.getResourceAsStream(resource);

        SqlSessionFactory sqlSessionFactory =
                new SqlSessionFactoryBuilder()
                .build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();

        return sqlSession;
    }

}
