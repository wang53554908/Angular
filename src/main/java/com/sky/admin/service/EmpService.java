package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.Employee;
import com.sky.admin.entity.EmployeeQry;
import com.sky.common.entity.Page;

public interface EmpService {
	public List<Employee> findAll(Page<Employee> page);

	public Employee findOne(String id);

	public void update(Employee emp);

	public Employee save(Employee emp);

	public List<Employee> getEmpTree(EmployeeQry empQry);
	
	public List<Employee> getEmpTreeSelect();

	public int delete(List<String> id);
}
