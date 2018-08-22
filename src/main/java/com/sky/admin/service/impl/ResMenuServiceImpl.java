package com.sky.admin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sky.admin.dao.ResMenuMapper;
import com.sky.admin.entity.ResMenu;
import com.sky.admin.service.ResMenuService;

@Service
public class ResMenuServiceImpl implements ResMenuService{

	@Resource
    private ResMenuMapper resMenuMapper; 

	@Override
	public void save(ResMenu resMenu) {
		// TODO Auto-generated method stub
		this.resMenuMapper.save(resMenu);
	}

	@Override
	public int delete(String resId) {
		// TODO Auto-generated method stub
		return this.resMenuMapper.delete(resId);
	}

	@Override
	public List<ResMenu> findByResId(Integer resId) {
		// TODO Auto-generated method stub
		return this.resMenuMapper.findByResId(resId);
	}

}
