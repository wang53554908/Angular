package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.User;
import com.sky.common.entity.Page;

public interface UserMapper {

	List<User> select(Page<User> params);

	User findOne(@Param("id") String id);

	void update(User user);

	void save(User user);

	void clearCurrentPosition(User u);
	
	User find(User user);
}
