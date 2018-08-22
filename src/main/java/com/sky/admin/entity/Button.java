package com.sky.admin.entity;
/**
 * @ClassName: Button
 * @Description: 按钮管理
 * @author Administrator
 * @date 2018年8月10日
 *
 */
public class Button {

	private int id;
	
	private String name;
	
	private int menuId;
	
	private String code;
	
	private Boolean selected;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getMenuId() {
		return menuId;
	}

	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
	
}
