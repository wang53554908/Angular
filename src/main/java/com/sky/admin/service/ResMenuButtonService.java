package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.ResMenuButton;

public interface ResMenuButtonService {
	
	List<ResMenuButton> select(ResMenuButton params);

	int delete(String menuId,String resId);

	void save(ResMenuButton rmb);
}
