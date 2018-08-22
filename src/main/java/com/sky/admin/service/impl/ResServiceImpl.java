package com.sky.admin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sky.admin.dao.ResMapper;
import com.sky.admin.entity.Responsibility;
import com.sky.admin.service.ResService;
import com.sky.common.entity.Page;

@Service
public class ResServiceImpl implements ResService{

	@Resource
    private ResMapper resMapper; 
	
	@Override
	public List<Responsibility> findAll(Page<Responsibility> page) {
		return this.resMapper.select(page);
	}

	@Override
	public Responsibility findOne(String id) {
		// TODO Auto-generated method stub
		return this.resMapper.findOne(id);
	}

	@Override
	public void update(Responsibility res) {
		// TODO Auto-generated method stub
		this.resMapper.update(res);
	}

	@Override
	public void save(Responsibility res) {
		// TODO Auto-generated method stub
		this.resMapper.save(res);
	}

	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return this.resMapper.delete(id);
	}

}
