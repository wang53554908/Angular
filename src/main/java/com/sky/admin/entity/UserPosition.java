package com.sky.admin.entity;
/**
 * @ClassName: UserPosition
 * @Description: 用户职位
 * @author Administrator
 * @date 2018年6月14日
 *
 */
public class UserPosition {

	private Integer id;
	
	private Integer userId;
	
	private Integer positionId;
	
	private String positionName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getPositionId() {
		return positionId;
	}

	public void setPositionId(Integer positionId) {
		this.positionId = positionId;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}
	
}
