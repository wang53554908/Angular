package com.sky.admin.entity;

import java.util.Date;
import java.util.List;

/**
 * @ClassName: Employee
 * @Description: 部门管理
 * @author Administrator
 * @date 2018年6月14日
 *
 */
public class Employee {

	private Integer id;
	
	private String name;
	
	private String shortName;
	
	private Integer parentId;
	
	private String parentName;
	
	private Integer orgId;
	
	private Integer level;
	
	private Date created;
	
	private String createdBy;
	
	private Date lastUpd;
	
	private String lastUpdBy;
	
	private List<Employee> childEmps;
	
	private List<Employee> children;//部门树显示需要的字段
	
	private String label;//部门树显示需要的字段

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

	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
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

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public List<Employee> getChildEmps() {
		return childEmps;
	}

	public void setChildEmps(List<Employee> childEmps) {
		this.childEmps = childEmps;
	}

	public List<Employee> getChildren() {
		return children;
	}

	public void setChildren(List<Employee> children) {
		this.children = children;
	}

	public String getLabel() {
		return this.name;
	}

	public void setLabel(String label) {
		this.label = label;
	}
	
	
}
