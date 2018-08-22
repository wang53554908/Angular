package com.sky.dashboard.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sky.dashboard.dao.UserMapper1;
import com.sky.dashboard.entity.User;
import com.sky.dashboard.service.UserService;


//@Service
public class UserServiceImpl implements UserService{

	@Resource
	private UserMapper1 userMapper;
	
	public User select(String name) {
		return userMapper.select(name);
	}

	public int userNameExits(String name) {
		return userMapper.userNameExits(name);
	}

	public boolean accountValid(User user) {
		return userMapper.accountValid(user)>0;
	}

	public int insert(User user) {
		return userMapper.insert(user);
	}

	@Override
	public User login(User user) {
		return userMapper.login(user);
	}

}
