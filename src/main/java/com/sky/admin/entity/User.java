package com.sky.admin.entity;

import java.sql.Date;
import java.util.List;

public class User {

	private Integer id;
	
	private String fstName;
	
	private String lstName;
	
	private String photoPath;
	
	private String sex;
	
	private String email;
	
	private String login;
	
	private String password;
	
	private String activeFlg;
	
	private String searialNo;//工号
	
	private Date lastLogin;//上次登录时间
	
	private Integer currentPosId;//当前职位id
	
	private String currentPosName;//当前职位名称
	
	private Organization org;//当前组织
	
	private Employee emp;//当前部门
	
	private Position pos;//当前职位
	
	private Date created;
	
	private String createdBy;
	
	private Date lastUpd;
	
	private String lastUpdBy;
	
	private List<Responsibility> resList;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFstName() {
		return fstName;
	}

	public void setFstName(String fstName) {
		this.fstName = fstName;
	}

	public String getLstName() {
		return lstName;
	}

	public void setLstName(String lstName) {
		this.lstName = lstName;
	}

	public String getPhotoPath() {
		return photoPath;
	}

	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getActiveFlg() {
		return activeFlg;
	}

	public void setActiveFlg(String activeFlg) {
		this.activeFlg = activeFlg;
	}

	public String getSearialNo() {
		return searialNo;
	}

	public void setSearialNo(String searialNo) {
		this.searialNo = searialNo;
	}

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Integer getCurrentPosId() {
		return currentPosId;
	}

	public void setCurrentPosId(Integer currentPosId) {
		this.currentPosId = currentPosId;
	}

	public String getCurrentPosName() {
		return currentPosName;
	}

	public void setCurrentPosName(String currentPosName) {
		this.currentPosName = currentPosName;
	}

	public Organization getOrg() {
		return org;
	}

	public void setOrg(Organization org) {
		this.org = org;
	}

	public Employee getEmp() {
		return emp;
	}

	public void setEmp(Employee emp) {
		this.emp = emp;
	}

	public Position getPos() {
		return pos;
	}

	public void setPos(Position pos) {
		this.pos = pos;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getLastUpd() {
		return lastUpd;
	}

	public void setLastUpd(Date lastUpd) {
		this.lastUpd = lastUpd;
	}

	public String getLastUpdBy() {
		return lastUpdBy;
	}

	public void setLastUpdBy(String lastUpdBy) {
		this.lastUpdBy = lastUpdBy;
	}

	public List<Responsibility> getResList() {
		return resList;
	}

	public void setResList(List<Responsibility> resList) {
		this.resList = resList;
	}
	
}
