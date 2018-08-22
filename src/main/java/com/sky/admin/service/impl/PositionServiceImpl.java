package com.sky.admin.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.sky.admin.dao.PositionMapper;
import com.sky.admin.entity.Position;
import com.sky.admin.service.PositionService;
import com.sky.common.entity.Page;

@Service
public class PositionServiceImpl implements PositionService {
	@Resource
    private PositionMapper positionMapper; 
	
	@Override
	public List<Position> findAll(Page<Position> page) {
		return this.positionMapper.select(page);
	}

	@Override
	public Position findOne(String id) {
		// TODO Auto-generated method stub
		return this.positionMapper.findOne(id);
	}

	@Override
	public void update(Position position) {
		// TODO Auto-generated method stub
		this.positionMapper.update(position);
	}

	@Override
	public Position save(Position position) {
		// TODO Auto-generated method stub
		this.positionMapper.save(position);
		return position;
	}

	@Override
	public List<Position> getPositionTree(Position position) {
		List<Position> positionList = new ArrayList<Position>();//最终结果
		List<Position> parentPositionList = this.positionMapper.findRootPositionList(position);//一级部门
		if(CollectionUtils.isEmpty(parentPositionList)) return positionList;
		for(Position parentPosition : parentPositionList){
			parentPosition.setLabel(parentPosition.getName()+"("+parentPosition.getEmployeeName()+")");
			positionList.add(parentPosition);
		}
		for(Position p : positionList){
			p.setChildPosition(getChild(p.getId(),position));
			p.setChildren(getChild(p.getId(),position));
		}
		return positionList;
	}

	private List<Position> getChild(Integer id,Position position) {
		List<Position> childList = new ArrayList<Position>();//子部门
		position.setParentId(id);
		List<Position> cList = this.positionMapper.findChildPositionList(position);
		if(CollectionUtils.isEmpty(cList)) return childList;
		for(Position p : cList){
			p.setLabel(p.getName()+"("+p.getEmployeeName()+")");
			childList.add(p);
		}
		//把子部门循环一遍
		for(Position p : childList){
			p.setChildPosition(getChild(p.getId(), position));
			p.setChildren(getChild(p.getId(), position));
		}
		return childList;
	}

	@Override
	public List<Position> getPositionTreeSelect() {
//		Employee emp = new Employee();
		List<Position> positionList = new ArrayList<Position>();//最终结果
//		List<Employee> parentEmpList = this.positionMapper.findRootEmpList(emp);//一级部门
//		if(CollectionUtils.isEmpty(parentEmpList)) return empList;
//		for(Employee parentEmp : parentEmpList){
//			empList.add(parentEmp);
//		}
//		for(Employee employee : parentEmpList){
//			empList.addAll(setEmpList(employee.getId(),emp));
//		}
		return positionList;
	}
	
	@SuppressWarnings("unused")
	private List<Position> setPositionList(Integer id,Position p) {
		List<Position> childList = new ArrayList<Position>();//子部门
//		emp.setParentId(id);
//		List<Employee> cList = this.positionMapper.findChildEmpList(emp);
//		if(CollectionUtils.isEmpty(cList)) return childList;
//		for(Employee e : cList){
//			childList.add(e);
//		}
//		//把子部门循环一遍
//		for(Employee e : cList){
//			childList.addAll(setEmpList(e.getId(),emp));
//		}
		return childList;
	}

	@Override
	public int delete(List<String> id) {
		// TODO Auto-generated method stub
		return this.positionMapper.delete(id);
	}

}
