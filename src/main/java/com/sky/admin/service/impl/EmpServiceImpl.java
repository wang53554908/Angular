package com.sky.admin.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.sky.admin.dao.EmpMapper;
import com.sky.admin.entity.Employee;
import com.sky.admin.entity.EmployeeQry;
import com.sky.admin.service.EmpService;
import com.sky.common.entity.Page;

@Service
public class EmpServiceImpl implements EmpService {
	@Resource
    private EmpMapper empMapper; 
	
	@Override
	public List<Employee> findAll(Page<Employee> page) {
		return this.empMapper.select(page);
	}

	@Override
	public Employee findOne(String id) {
		// TODO Auto-generated method stub
		return this.empMapper.findOne(id);
	}

	@Override
	public void update(Employee emp) {
		// TODO Auto-generated method stub
		this.empMapper.update(emp);
	}

	@Override
	public Employee save(Employee emp) {
		// TODO Auto-generated method stub
		this.empMapper.save(emp);
		return emp;
	}

	@Override
	public List<Employee> getEmpTree(EmployeeQry emp) {
		List<Employee> empList = new ArrayList<Employee>();//最终结果
		List<Employee> parentEmpList = this.empMapper.findRootEmpList(emp);//一级部门
		if(CollectionUtils.isEmpty(parentEmpList)) return empList;
		for(Employee parentEmp : parentEmpList){
			parentEmp.setLabel(parentEmp.getName());
			empList.add(parentEmp);
		}
		for(Employee employee : empList){
			employee.setChildEmps(getChild(employee.getId(),emp));
			employee.setChildren(getChild(employee.getId(),emp));
		}
		return empList;
	}

	private List<Employee> getChild(Integer id,EmployeeQry emp) {
		List<Employee> childList = new ArrayList<Employee>();//子部门
		emp.setParentId(id);
		List<Employee> cList = this.empMapper.findChildEmpList(emp);
		if(CollectionUtils.isEmpty(cList)) return childList;
		for(Employee e : cList){
			e.setLabel(e.getName());
			childList.add(e);
		}
		//把子部门循环一遍
		for(Employee e : childList){
			e.setChildEmps(getChild(e.getId(), emp));
			e.setChildren(getChild(e.getId(), emp));
		}
		return childList;
	}

	@Override
	public List<Employee> getEmpTreeSelect() {
//		Employee emp = new Employee();
		List<Employee> empList = new ArrayList<Employee>();//最终结果
//		List<Employee> parentEmpList = this.empMapper.findRootEmpList(emp);//一级部门
//		if(CollectionUtils.isEmpty(parentEmpList)) return empList;
//		for(Employee parentEmp : parentEmpList){
//			empList.add(parentEmp);
//		}
//		for(Employee employee : parentEmpList){
//			empList.addAll(setEmpList(employee.getId(),emp));
//		}
		return empList;
	}
	
	@SuppressWarnings("unused")
	private List<Employee> setEmpList(Integer id,Employee emp) {
		List<Employee> childList = new ArrayList<Employee>();//子部门
//		emp.setParentId(id);
//		List<Employee> cList = this.empMapper.findChildEmpList(emp);
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
		return this.empMapper.delete(id);
	}

}
