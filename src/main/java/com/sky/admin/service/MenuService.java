package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.Menu;
import com.sky.common.entity.Page;

public interface MenuService {
	public List<Menu> findAll(Page<Menu> page);

	public Menu findOne(String id);

	public void update(Menu menu);

	public Menu save(Menu menu);

	public List<Menu> getMenuTreeSelect();

	public int delete(List<String> id);
	
	public List<Menu> getMenuTree(Menu menu,Integer resId);
	
	public List<Menu> getMenuTree(Menu menu);
}
