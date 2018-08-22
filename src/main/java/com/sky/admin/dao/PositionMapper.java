package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.Position;
import com.sky.common.entity.Page;

public interface PositionMapper {
	List<Position> select(Page<Position> params);

	Position findOne(@Param("id") String id);

	void update(Position position);

	void save(Position position);

	List<Position> findEmpList(Position position);

	List<Position> findRootPositionList(Position position);

	List<Position> findChildPositionList(Position position);

	int delete(@Param("ids") List<String> id);
}
