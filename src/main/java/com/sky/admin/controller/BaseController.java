package com.sky.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RestController;

import com.sky.common.entity.Page;

@RestController
public class BaseController {
	
	public static final int MAX_NUM=10;
	//设置请求参数
	public void setParams(Page<?> page){
		Map<String, Object> param = new HashMap<String, Object>();  
		Map<String, Object> requestParams = page.getParams();
		for (Map.Entry<String, Object> entry : requestParams.entrySet()) { 
			param.put(entry.getKey(), entry.getValue());  
		}
        page.setParams(param); 
	}
}
