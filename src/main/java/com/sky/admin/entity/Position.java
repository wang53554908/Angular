package com.sky.admin.entity;

import java.util.Date;
import java.util.List;

/**
 * @ClassName: Position
 * @Description: 职位管理
 * @author Administrator
 * @date 2018年6月14日
 *
 */
public class Position {

	private Integer id;
	
	private String name;
	
	private Integer employeeId;
	
	private Integer orgId;
	
	private Integer parentId;
	
	private Date created;
	
	private String createdBy;
	
	private Date lastUpd;
	
	private String lastUpdBy;
	
	private String label;
	
	private List<Position> childPosition;
	
	private List<Position> children;
	
	private Integer level;
	
	private String employeeName;
	
	private String parentName;

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

	public Integer getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}

	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
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

	public String getLabel() {
		return this.name+"("+this.employeeName+")";
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<Position> getChildPosition() {
		return childPosition;
	}

	public void setChildPosition(List<Position> childPosition) {
		this.childPosition = childPosition;
	}

	public List<Position> getChildren() {
		return children;
	}

	public void setChildren(List<Position> children) {
		this.children = children;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	
}
