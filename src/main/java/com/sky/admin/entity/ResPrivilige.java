package com.sky.admin.entity;

import java.util.Date;

/**
 * @ClassName: ResPrivilige
 * @Description: 职责权限管理
 * @author Administrator
 * @date 2018年6月14日
 *
 */
public class ResPrivilige {

	private Integer id;
	
	private Integer resId;
	
	private Integer privId;
	
	private Date created;
	
	private String createdBy;
	
	private Date lastUpd;
	
	private String lastUpdBy;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getResId() {
		return resId;
	}

	public void setResId(Integer resId) {
		this.resId = resId;
	}

	public Integer getPrivId() {
		return privId;
	}

	public void setPrivId(Integer privId) {
		this.privId = privId;
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
}
