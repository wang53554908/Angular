package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.Responsibility;
import com.sky.common.entity.Page;

public interface ResMapper {

	List<Responsibility> select(Page<Responsibility> params);

	Responsibility findOne(@Param("id") String id);

	void update(Responsibility res);

	void save(Responsibility res);

	int delete(String id);
}
