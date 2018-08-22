package com.sky.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sky.admin.entity.Employee;
import com.sky.admin.entity.EmployeeQry;
import com.sky.admin.service.EmpService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;

@RestController
@RequestMapping(value="/emp")
public class EmployeeController extends BaseController{
	@Resource 
	private EmpService empService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<Employee> page){
		setParams(page); 
		List<Employee> empList = this.empService.findAll(page);
		page.setResults(empList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		Employee emp = this.empService.findOne(id);
		return new ResponseData(emp);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody Employee emp){
		emp.setId(Integer.valueOf(id));
		this.empService.update(emp);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody Employee emp){
		Employee e = this.empService.save(emp);
		return new ResponseData(e);
	}
	
	@ResponseBody
	@RequestMapping(value="/empTree",method=RequestMethod.POST)
	public ResponseData getEmpTree(@RequestBody EmployeeQry empQry){
		List<Employee> empList = this.empService.getEmpTree(empQry);
		return new ResponseData(empList);
	}
	
	@ResponseBody
	@RequestMapping(value="/deletes",method=RequestMethod.DELETE)
	public ResponseData delete(HttpServletRequest request){
		String ids = request.getParameter("ids");
		int res = this.empService.delete(Arrays.asList(ids.split(",")));
		return new ResponseData(res);
	}
}
