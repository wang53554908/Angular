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

import com.sky.admin.entity.Position;
import com.sky.admin.service.PositionService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;

@RestController
@RequestMapping(value="/position")
public class PositionController extends BaseController{
	@Resource 
	private PositionService positionService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<Position> page){
		setParams(page); 
		List<Position> positionList = this.positionService.findAll(page);
		page.setResults(positionList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		Position p = this.positionService.findOne(id);
		return new ResponseData(p);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody Position position){
		position.setId(Integer.valueOf(id));
		this.positionService.update(position);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody Position position){
		Position p = this.positionService.save(position);
		return new ResponseData(p);
	}
	
	@ResponseBody
	@RequestMapping(value="/positionTree",method=RequestMethod.POST)
	public ResponseData getPositionTree(@RequestBody Position position){
		List<Position> positionList = this.positionService.getPositionTree(position);
		return new ResponseData(positionList);
	}
	
	@ResponseBody
	@RequestMapping(value="/deletes",method=RequestMethod.DELETE)
	public ResponseData delete(HttpServletRequest request){
		String ids = request.getParameter("ids");
		int res = this.positionService.delete(Arrays.asList(ids.split(",")));
		return new ResponseData(res);
	}
}
