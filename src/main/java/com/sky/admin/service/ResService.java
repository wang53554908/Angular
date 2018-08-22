package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.Responsibility;
import com.sky.common.entity.Page;

public interface ResService {

	public List<Responsibility> findAll(Page<Responsibility> page);

	public Responsibility findOne(String id);

	public void update(Responsibility res);

	public void save(Responsibility res);

	public int delete(String id);
	
}
