package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.ResMenu;

public interface ResMenuService {

	public void save(ResMenu resMenu);

	public int delete(String resId);
	
	public List<ResMenu> findByResId(Integer resId);
}
