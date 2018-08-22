package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.UserPosition;

public interface UserPositionMapper {

	List<UserPosition> getUserPositionList(UserPosition userPosition);

	void saveUserPosition(UserPosition up);

	int deleteUserPositon(@Param("userId") String userId, @Param("positionList") List<String> positionList);

}
