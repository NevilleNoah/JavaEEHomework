package com.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Gain {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.id
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private Integer id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.gname
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private String gname;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.action
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private Integer action;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.gtime
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private Date gtime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.number
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private Integer number;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.cid
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private Integer cid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gain.part
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    private String part;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.id
     *
     * @return the value of gain.id
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.id
     *
     * @param id the value for gain.id
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.gname
     *
     * @return the value of gain.gname
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public String getGname() {
        return gname;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.gname
     *
     * @param gname the value for gain.gname
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setGname(String gname) {
        this.gname = gname == null ? null : gname.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.action
     *
     * @return the value of gain.action
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public Integer getAction() {
        return action;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.action
     *
     * @param action the value for gain.action
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setAction(Integer action) {
        this.action = action;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.gtime
     *
     * @return the value of gain.gtime
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public String getGtime() {
        String sdate;
        sdate=(new SimpleDateFormat("yyyy-MM-dd")).format(gtime);
        return sdate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.gtime
     *
     * @param gtime the value for gain.gtime
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setGtime(Date gtime) {
        this.gtime = gtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.number
     *
     * @return the value of gain.number
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public Integer getNumber() {
        return number;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.number
     *
     * @param number the value for gain.number
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setNumber(Integer number) {
        this.number = number;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.cid
     *
     * @return the value of gain.cid
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public Integer getCid() {
        return cid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.cid
     *
     * @param cid the value for gain.cid
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setCid(Integer cid) {
        this.cid = cid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gain.part
     *
     * @return the value of gain.part
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public String getPart() {
        return part;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gain.part
     *
     * @param part the value for gain.part
     *
     * @mbg.generated Mon Jan 08 11:29:55 CST 2018
     */
    public void setPart(String part) {
        this.part = part == null ? null : part.trim();
    }
}