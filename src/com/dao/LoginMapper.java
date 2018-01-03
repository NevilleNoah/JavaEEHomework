package com.dao;

import com.entity.Login;
import com.entity.LoginExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface LoginMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    long countByExample(LoginExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    int deleteByExample(LoginExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    int insert(Login record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    int insertSelective(Login record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    List<Login> selectByExample(LoginExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    int updateByExampleSelective(@Param("record") Login record, @Param("example") LoginExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table login
     *
     * @mbg.generated Wed Jan 03 16:16:20 CST 2018
     */
    int updateByExample(@Param("record") Login record, @Param("example") LoginExample example);
}