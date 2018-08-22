package com.sky.admin.dao;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.ResMenu;

public interface ResMenuMapper {
	void save(ResMenu resMenu);

	int delete(@Param("resId") String resId);
	
	List<ResMenu> findByResId(@Param("resId") Integer resId);
}
