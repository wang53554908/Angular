package com.sky.admin.entity;

import java.util.Date;

import com.sky.common.entity.PageQryBase;

/**
 * @ClassName: Organization
 * @Description: 组织管理
 * @author Administrator
 * @date 2018年6月14日
 *
 */
public class Organization{

	private Integer id;
	
	private String name;
	
	private String shortName;
	
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
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
