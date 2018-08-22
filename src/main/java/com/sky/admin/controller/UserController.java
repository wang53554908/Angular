package com.sky.admin.controller;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sky.admin.entity.User;
import com.sky.admin.entity.UserPosition;
import com.sky.admin.entity.UserRes;
import com.sky.admin.security.UserInfo;
import com.sky.admin.security.UserUtils;
import com.sky.admin.service.UserService;
import com.sky.common.entity.Page;
import com.sky.util.ResponseData;


@RestController
@RequestMapping(value="/user")
public class UserController extends BaseController{
	@Resource 
	private UserService userService;
	
	@ResponseBody
	@RequestMapping(value="/list",method=RequestMethod.POST)
	public ResponseData findAll(@RequestBody Page<User> page){
		setParams(page); 
		List<User> userList = this.userService.findAll(page);
		page.setResults(userList);
		return new ResponseData(page);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseData fineOne(@PathVariable("id") String id){
		User org = this.userService.findOne(id);
		return new ResponseData(org);
	}
	
	@ResponseBody
	@RequestMapping(value="/{id}",method=RequestMethod.POST)
	public ResponseData updateOne(@PathVariable("id") String id,@RequestBody User user){
		user.setId(Integer.valueOf(id));
		this.userService.update(user);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ResponseData save(@RequestBody User user){
		this.userService.save(user);
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/userPosition",method=RequestMethod.POST)
	public ResponseData getUserPositionList(@RequestBody UserPosition userPosition){
		List<UserPosition> ups = this.userService.getUserPositionList(userPosition);
		return new ResponseData(ups);
	}
	
	@ResponseBody
	@RequestMapping(value="/saveUserPosition",method=RequestMethod.POST)
	public ResponseData saveUserPosition(HttpServletRequest request){
		String ids = request.getParameter("positionIds");
		String userId = request.getParameter("userId");
		List<String> positionList = Arrays.asList(ids.split(","));
		UserPosition up = null;
		if(!CollectionUtils.isEmpty(positionList)){
			for(String s : positionList){
				up = new UserPosition();
				up.setUserId(Integer.valueOf(userId));
				up.setPositionId(Integer.valueOf(s));
				if(this.userService.findUserPosition(up).size()>0){
					continue;
				}
				this.userService.saveUserPosition(up);
			}
		}
		up = new UserPosition();
		up.setUserId(Integer.valueOf(userId));
		List<UserPosition> ups = this.userService.getUserPositionList(up);
		if(ups.size()==1){
			User u = new User();
			u.setId(ups.get(0).getUserId());
			u.setCurrentPosId(ups.get(0).getPositionId());
			u.setCurrentPosName(ups.get(0).getPositionName());
			this.userService.update(u);
		}
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/delUserPosition",method=RequestMethod.POST)
	public ResponseData delUserPosition(HttpServletRequest request){
		String ids = request.getParameter("positionIds");
		String userId = request.getParameter("userId");
		List<String> positionList = Arrays.asList(ids.split(","));
		int res = this.userService.deleteUserPosition(userId,positionList);
		UserPosition up = new UserPosition();
		up.setUserId(Integer.valueOf(userId));
		List<UserPosition> ups = this.userService.getUserPositionList(up);
		if(ups.size()==1){
			User u = new User();
			u.setId(ups.get(0).getUserId());
			u.setCurrentPosId(ups.get(0).getPositionId());
			u.setCurrentPosName(ups.get(0).getPositionName());
			this.userService.update(u);
		}
		if(ups.size()==0){
			User u = new User();
			u.setId(Integer.valueOf(userId));
			this.userService.clearCurrentPosition(u);
		}
		return new ResponseData(res);
	}
	
	@ResponseBody
	@RequestMapping(value="/userRes",method=RequestMethod.POST)
	public ResponseData getUserResList(@RequestBody UserRes userRes){
		List<UserRes> ur = this.userService.getUserResList(userRes);
		return new ResponseData(ur);
	}
	
	@ResponseBody
	@RequestMapping(value="/saveUserRes",method=RequestMethod.POST)
	public ResponseData saveUserRes(HttpServletRequest request){
		String ids = request.getParameter("resIds");
		String userId = request.getParameter("userId");
		List<String> resList = Arrays.asList(ids.split(","));
		UserRes ur = null;
		if(!CollectionUtils.isEmpty(resList)){
			for(String s : resList){
				ur = new UserRes();
				ur.setUserId(Integer.valueOf(userId));
				ur.setResId(Integer.valueOf(s));
				if(this.userService.findUserRes(ur).size()>0){
					continue;
				}
				this.userService.saveUserRes(ur);
			}
		}
		return new ResponseData(1);
	}
	
	@ResponseBody
	@RequestMapping(value="/delUserRes",method=RequestMethod.POST)
	public ResponseData delUserRes(HttpServletRequest request){
		String ids = request.getParameter("resIds");
		String userId = request.getParameter("userId");
		List<String> resList = Arrays.asList(ids.split(","));
		int res = this.userService.deleteUserRes(userId,resList);
		return new ResponseData(res);
	}
	
	@ResponseBody
	@RequestMapping(value = "/logout",method=RequestMethod.POST)
	public void logout() {
		UserUtils.logout();
	}
	
	@ResponseBody
	@RequestMapping(value = "/login")
	public UserInfo login(@RequestBody User user, HttpServletResponse response) {
		try {
			UserUtils.login(user);
			return this.userService.loadUserInfo(user.getLogin());
		} catch (AuthenticationException e) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "/getUserInfo")
	public UserInfo getUserInfo(HttpServletResponse response) {
		UserInfo userInfo = UserUtils.getUserInfo();
		if (userInfo == null) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
		return userInfo;

	}
}
