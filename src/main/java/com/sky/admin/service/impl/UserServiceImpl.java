package com.sky.admin.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.shiro.util.CollectionUtils;
import org.springframework.stereotype.Service;

import com.sky.admin.dao.ButtonMapper;
import com.sky.admin.dao.UserMapper;
import com.sky.admin.dao.UserPositionMapper;
import com.sky.admin.dao.UserResMapper;
import com.sky.admin.entity.Button;
import com.sky.admin.entity.ResMenu;
import com.sky.admin.entity.User;
import com.sky.admin.entity.UserPosition;
import com.sky.admin.entity.UserRes;
import com.sky.admin.security.UserInfo;
import com.sky.admin.security.UserUtils;
import com.sky.admin.service.MenuService;
import com.sky.admin.service.ResMenuService;
import com.sky.admin.service.UserService;
import com.sky.common.entity.Page;

@Service
public class UserServiceImpl implements UserService{

	@Resource
    private UserMapper userMapper; 
	
	@Resource
	private UserPositionMapper userPositionMapper;
	
	@Resource
	private UserResMapper userResMapper;
	
	@Resource
	private ResMenuService resMenuService;
	
	@Resource
	private MenuService menuService;
	
	@Resource
	private ButtonMapper buttonMapper;
	
	@Override
	public List<User> findAll(Page<User> page) {
		return this.userMapper.select(page);
	}

	@Override
	public User findOne(String id) {
		// TODO Auto-generated method stub
		return this.userMapper.findOne(id);
	}

	@Override
	public void update(User user) {
		// TODO Auto-generated method stub
		this.userMapper.update(user);
	}

	@Override
	public void save(User user) {
		// TODO Auto-generated method stub
		this.userMapper.save(user);
	}

	@Override
	public List<UserPosition> getUserPositionList(UserPosition userPosition) {
		// TODO Auto-generated method stub
		return this.userPositionMapper.getUserPositionList(userPosition);
	}

	@Override
	public int deleteUserPosition(String userId) {
		// TODO Auto-generated method stub
		return this.userPositionMapper.deleteUserPositon(userId,null);
	}

	@Override
	public void saveUserPosition(UserPosition up) {
		this.userPositionMapper.saveUserPosition(up);
	}

	@Override
	public int deleteUserPosition(String userId, List<String> positionList) {
		// TODO Auto-generated method stub
		return this.userPositionMapper.deleteUserPositon(userId,positionList);
	}

	@Override
	public List<UserPosition> findUserPosition(UserPosition up) {
		// TODO Auto-generated method stub
		return this.userPositionMapper.getUserPositionList(up);
	}

	@Override
	public void clearCurrentPosition(User u) {
		this.userMapper.clearCurrentPosition(u);
	}

	@Override
	public List<UserRes> findUserRes(UserRes ur) {
		// TODO Auto-generated method stub
		return userResMapper.getUserResList(ur);
	}

	@Override
	public void saveUserRes(UserRes ur) {
		userResMapper.saveUserRes(ur);
	}

	@Override
	public List<UserRes> getUserResList(UserRes userRes) {
		// TODO Auto-generated method stub
		return this.userResMapper.getUserResList(userRes);
	}

	@Override
	public int deleteUserRes(String userId, List<String> resList) {
		// TODO Auto-generated method stub
		return this.userResMapper.deleteUserRes(userId, resList);
	}

	@Override
	public UserInfo loadUserInfo(String login) {
		User query = new User();
		query.setLogin(login);
		User user = userMapper.find(query);
		
		UserInfo userInfo = new UserInfo();
		userInfo.setUser(user);
		//user responsibility
		UserRes ur = new UserRes();
		ur.setUserId(user.getId());
		List<UserRes> urList = userResMapper.getUserResList(ur);
		Set<String> urlPermissions = new HashSet<String>();
		Set<String> buttonPermissions = new HashSet<String>();
		if(!CollectionUtils.isEmpty(urList)){
			for(UserRes userRes : urList){
				List<ResMenu> rmList = resMenuService.findByResId(userRes.getResId());
				if(!CollectionUtils.isEmpty(rmList)){
					for(ResMenu rm:rmList){//user menu
						urlPermissions.add(String.valueOf(rm.getMenuId()));
					}
				}
				List<Button> btnList = this.buttonMapper.findByResId(userRes.getResId());
				if(!CollectionUtils.isEmpty(btnList)){
					for(Button btn:btnList){//res button
						buttonPermissions.add(btn.getCode());
					}
				}
			}
		}
		// userInfo.setObjectPermissions(objectPermissions);
		userInfo.setUrlPermissions(urlPermissions);
		userInfo.setButtonPermissions(buttonPermissions);
		UserUtils.setToSession(UserUtils.SESSION_KEY_USER_INFO, userInfo);
		return userInfo;
	}

}
