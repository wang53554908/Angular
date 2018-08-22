package com.sky.admin.entity;

/**
 * @ClassName: UserRes
 * @Description: 用户职责
 * @author Administrator
 * @date 2018年7月6日
 *
 */
public class UserRes {

	private int id;
	
	private int userId;
	
	private int resId;
	
	private String resName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getResId() {
		return resId;
	}

	public void setResId(int resId) {
		this.resId = resId;
	}

	public String getResName() {
		return resName;
	}

	public void setResName(String resName) {
		this.resName = resName;
	}
	
}
