package com.sky.dashboard.service;

import com.sky.dashboard.entity.User;



public interface UserService {
	User select(String name);
	User login(User user);
	int userNameExits(String name);
	boolean accountValid(User user);
	int insert(User user);
}
