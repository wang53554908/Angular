package com.sky.admin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sky.admin.dao.ButtonMapper;
import com.sky.admin.entity.Button;
import com.sky.admin.service.ButtonService;
import com.sky.common.entity.Page;

@Service
public class ButtonServiceImpl implements ButtonService {
	@Resource
    private ButtonMapper buttonMapper; 
	
	@Override
	public List<Button> findAll(Page<Button> page) {
		return this.buttonMapper.select(page);
	}

	@Override
	public Button findOne(String id) {
		// TODO Auto-generated method stub
		return this.buttonMapper.findOne(id);
	}

	@Override
	public void update(Button button) {
		// TODO Auto-generated method stub
		this.buttonMapper.update(button);
	}

	@Override
	public void save(Button button) {
		// TODO Auto-generated method stub
		this.buttonMapper.save(button);
	}
	
	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		return this.buttonMapper.delete(id);
	}
}
