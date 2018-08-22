package com.sky.admin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sky.admin.dao.ResMenuButtonMapper;
import com.sky.admin.entity.ResMenuButton;
import com.sky.admin.service.ResMenuButtonService;

@Service
public class ResMenuButtonServiceImpl implements ResMenuButtonService{
	
	@Resource
	private ResMenuButtonMapper resMenuButtonMapper;

	@Override
	public int delete(String resId, String menuId) {
		return resMenuButtonMapper.delete(resId,menuId);
	}

	@Override
	public void save(ResMenuButton rmb) {
		this.resMenuButtonMapper.save(rmb);
	}

	@Override
	public List<ResMenuButton> select(ResMenuButton params) {
		return resMenuButtonMapper.select(params);
	}

}
