package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.ResMenuButton;

public interface ResMenuButtonMapper {

	List<ResMenuButton> select(ResMenuButton params);
	
	void save(ResMenuButton resMenuButton);

	int delete(@Param("resId") String resId, @Param("menuId") String menuId);
}
