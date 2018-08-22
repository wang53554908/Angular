package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.Position;
import com.sky.common.entity.Page;

public interface PositionService {
	public List<Position> findAll(Page<Position> page);

	public Position findOne(String id);

	public void update(Position position);

	public Position save(Position position);

	public List<Position> getPositionTree(Position position);
	
	public List<Position> getPositionTreeSelect();

	public int delete(List<String> id);
}
