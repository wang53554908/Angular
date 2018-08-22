package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.Button;
import com.sky.common.entity.Page;

public interface ButtonMapper {
	List<Button> select(Page<Button> params);

	Button findOne(@Param("id") String id);

	void update(Button button);

	void save(Button button);

	int delete(String id);
	
	List<Button> findByResId(int resId);
}
