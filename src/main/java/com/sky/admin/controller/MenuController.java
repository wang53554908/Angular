package com.sky.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sky.admin.entity.Menu;
import com.sky.admin.service.MenuService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;

@RestController
@RequestMapping(value="/menu")
public class MenuController extends BaseController{
	@Resource 
	private MenuService menuService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<Menu> page){
		setParams(page); 
		List<Menu> menuList = this.menuService.findAll(page);
		page.setResults(menuList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		Menu menu = this.menuService.findOne(id);
		return new ResponseData(menu);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody Menu menu){
		menu.setId(Integer.valueOf(id));
		this.menuService.update(menu);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody Menu menu){
		Menu m = this.menuService.save(menu);
		return new ResponseData(m);
	}
	
	@ResponseBody
	@RequestMapping(value="/menuTree",method=RequestMethod.POST)
	public ResponseData getMenuTree(HttpServletRequest request){
		Menu menu = new Menu();
		String resId = request.getParameter("resId");
		List<Menu> menuList = this.menuService.getMenuTree(menu,StringUtils.isEmpty(resId)?null:Integer.valueOf(resId));
		return new ResponseData(menuList);
	}
	
	@ResponseBody
	@RequestMapping(value="/loginMenuTree",method=RequestMethod.POST)
	public ResponseData getLoginMenuTree(HttpServletRequest request){
		Menu menu = new Menu();
		List<Menu> menuList = this.menuService.getMenuTree(menu);
		return new ResponseData(menuList);
	}
	
	@ResponseBody
	@RequestMapping(value="/deletes",method=RequestMethod.DELETE)
	public ResponseData delete(HttpServletRequest request){
		String ids = request.getParameter("ids");
		int res = this.menuService.delete(Arrays.asList(ids.split(",")));
		return new ResponseData(res);
	}
}
