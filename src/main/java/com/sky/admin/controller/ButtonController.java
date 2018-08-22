package com.sky.admin.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sky.admin.entity.Button;
import com.sky.admin.entity.ResMenuButton;
import com.sky.admin.service.ButtonService;
import com.sky.admin.service.ResMenuButtonService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;


@RestController
@RequestMapping(value="/button")
public class ButtonController extends BaseController{
	@Resource 
	private ButtonService buttonService;
	
	@Resource
	private ResMenuButtonService rmbService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<Button> page){
		setParams(page); 
		List<Button> buttonList = this.buttonService.findAll(page);
		page.setResults(buttonList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/res_menu_button_list",method=RequestMethod.POST)
	public ResponseData findByResAndMenu(@RequestBody Page<Button> page){
		setParams(page); 
		List<Button> buttonList = this.buttonService.findAll(page);
	    ResMenuButton rmbQry = new ResMenuButton();
	    rmbQry.setResId(Integer.valueOf(page.getParams().get("resId").toString()));
	    rmbQry.setMenuId(Integer.valueOf(page.getParams().get("menuId").toString()));
	    List<ResMenuButton> rbmList = this.rmbService.select(rmbQry);
	    List<Integer> btnIds = new ArrayList<Integer>();
	    if(!CollectionUtils.isEmpty(rbmList)){
	    	for(ResMenuButton rmb:rbmList){
	    		btnIds.add(rmb.getButtonId());
	    	}
	    	for(Button btn:buttonList){
	    		if(btnIds.contains(btn.getId())){
	    			btn.setSelected(true);
	    		}
	    	}
	    }
		page.setResults(buttonList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		Button button = this.buttonService.findOne(id);
		return new ResponseData(button);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody Button button){
		button.setId(Integer.valueOf(id));
		this.buttonService.update(button);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody Button button){
		this.buttonService.save(button);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
	public ResponseData delete(@PathVariable("id") String id){
		int button = this.buttonService.delete(id);
		return new ResponseData(button);
	}
}
