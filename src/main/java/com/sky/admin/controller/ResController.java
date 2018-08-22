package com.sky.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sky.admin.entity.ResMenu;
import com.sky.admin.entity.ResMenuButton;
import com.sky.admin.entity.Responsibility;
import com.sky.admin.service.ResMenuButtonService;
import com.sky.admin.service.ResMenuService;
import com.sky.admin.service.ResService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;


@RestController
@RequestMapping(value="/res")
public class ResController extends BaseController{
	
	@Resource 
	private ResService resService;
	
	@Resource
	private ResMenuService resMenuService;
	
	@Resource
	private ResMenuButtonService resMenuButtonService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<Responsibility> page){
		setParams(page); 
		List<Responsibility> resList = this.resService.findAll(page);
		page.setResults(resList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		Responsibility res = this.resService.findOne(id);
		return new ResponseData(res);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody Responsibility res){
		res.setId(Integer.valueOf(id));
		this.resService.update(res);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody Responsibility res){
		this.resService.save(res);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/saveResMenu",method=RequestMethod.POST)
	public ResponseData saveResMenu(HttpServletRequest request){
		String ids = request.getParameter("menuIds");
		String resId = request.getParameter("resId");
		int res = this.resMenuService.delete(resId);
		List<String> menuList = Arrays.asList(ids.split(","));
		ResMenu rm = null;
		if(!CollectionUtils.isEmpty(menuList)){
			for(String s : menuList){
				rm = new ResMenu();
				rm.setResId(Integer.valueOf(resId));
				rm.setMenuId(Integer.valueOf(s));
				this.resMenuService.save(rm);
			}
		}
		return new ResponseData(res);
	}
	
	@ResponseBody
	@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
	public ResponseData delete(@PathVariable("id") String id){
		int res = this.resService.delete(id);
		return new ResponseData(res);
	}
	
	@ResponseBody
	@RequestMapping(value="/saveResMenuButton",method=RequestMethod.POST)
	public ResponseData saveResMenuButton(HttpServletRequest request){
		String buttonIds = request.getParameter("buttonIds");
		String resId = request.getParameter("resId");
		String menuId = request.getParameter("menuId");
		int res = this.resMenuButtonService.delete(resId,menuId);
		List<String> buttonList = Arrays.asList(buttonIds.split(","));
		ResMenuButton rmb = null;
		if(!CollectionUtils.isEmpty(buttonList) && !StringUtils.isEmpty(buttonList.get(0))){
			for(String s : buttonList){
				rmb = new ResMenuButton();
				rmb.setResId(Integer.valueOf(resId));
				rmb.setButtonId(Integer.valueOf(s));
				rmb.setMenuId(Integer.valueOf(menuId));
				this.resMenuButtonService.save(rmb);
			}
		}
		return new ResponseData(res);
	}
}
