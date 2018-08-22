package com.sky.admin.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sky.admin.entity.Organization;
import com.sky.admin.service.OrgService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;


@RestController
@RequestMapping(value="/org")
public class OrgController extends BaseController{
	@Resource 
	private OrgService orgService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<Organization> page){
		setParams(page); 
		List<Organization> orgList = this.orgService.findAll(page);
		page.setResults(orgList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		Organization org = this.orgService.findOne(id);
		return new ResponseData(org);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody Organization org){
		org.setId(Integer.valueOf(id));
		this.orgService.update(org);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody Organization org){
		this.orgService.save(org);
		return new ResponseData(1);
	}
}
