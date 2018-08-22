package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.Menu;
import com.sky.common.entity.Page;

public interface MenuMapper {
	List<Menu> select(Page<Menu> params);

	Menu findOne(@Param("id") String id);

	void update(Menu menu);

	void save(Menu menu);

	List<Menu> findmenuList(Menu menu);

	List<Menu> findRootMenuList(Menu menu);

	List<Menu> findChildMenuList(Menu menu);

	int delete(@Param("ids") List<String> id);
}
