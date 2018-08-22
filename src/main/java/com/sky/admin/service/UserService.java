package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.User;
import com.sky.admin.entity.UserPosition;
import com.sky.admin.entity.UserRes;
import com.sky.admin.security.UserInfo;
import com.sky.common.entity.Page;

public interface UserService {

	public List<User> findAll(Page<User> page);

	public User findOne(String id);

	public void update(User user);

	public void save(User user);
	
	public List<UserPosition> getUserPositionList(UserPosition userPosition);

	public int deleteUserPosition(String userId);

	public void saveUserPosition(UserPosition up);

	public int deleteUserPosition(String userId, List<String> positionList);

	public List<UserPosition> findUserPosition(UserPosition up);

	public void clearCurrentPosition(User u);

	public List<UserRes> findUserRes(UserRes ur);

	public void saveUserRes(UserRes ur);

	public List<UserRes> getUserResList(UserRes userRes);

	public int deleteUserRes(String userId, List<String> resList);

	public UserInfo loadUserInfo(String login);
	
}
