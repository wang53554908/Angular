package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.UserRes;

public interface UserResMapper {

	List<UserRes> getUserResList(UserRes ur);

	void saveUserRes(UserRes ur);

	int deleteUserRes(@Param("userId") String userId, @Param("resList") List<String> resList);

}
