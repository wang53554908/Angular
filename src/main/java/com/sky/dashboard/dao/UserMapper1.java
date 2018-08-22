package com.sky.dashboard.dao;

import org.apache.ibatis.annotations.Param;

import com.sky.dashboard.entity.User;



public interface UserMapper1 {
	User select(@Param("name")String name);
	int userNameExits(@Param("name")String name);
	int accountValid(User user);
	int insert(User user);
	User login(User user);
}
