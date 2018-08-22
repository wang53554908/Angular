package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.Button;
import com.sky.common.entity.Page;

public interface ButtonService {
	public List<Button> findAll(Page<Button> page);

	public Button findOne(String id);

	public void update(Button org);

	public void save(Button org);
	
	public int delete(String id);
}
