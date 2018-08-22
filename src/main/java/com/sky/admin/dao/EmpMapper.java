package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.Employee;
import com.sky.admin.entity.EmployeeQry;
import com.sky.common.entity.Page;

public interface EmpMapper {
	List<Employee> select(Page<Employee> params);

	Employee findOne(@Param("id") String id);

	void update(Employee emp);

	void save(Employee emp);

	List<Employee> findEmpList(Employee emp);

	List<Employee> findRootEmpList(EmployeeQry emp);

	List<Employee> findChildEmpList(EmployeeQry emp);

	int delete(@Param("ids") List<String> id);
}
