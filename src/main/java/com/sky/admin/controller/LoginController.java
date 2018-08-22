package com.sky.admin.controller;


import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.sky.admin.entity.User;
import com.sky.admin.security.UserInfo;
import com.sky.admin.security.UserUtils;
import com.sky.admin.service.UserService;


@RestController
@RequestMapping(value="/")
public class LoginController extends BaseController{
	@Resource 
	private UserService userService;
	
	@RequestMapping(value = { "/toLogin"}, method = RequestMethod.GET)
	public ModelAndView toLogin(){
		return new ModelAndView("login.html");
	} 
	@ResponseBody
	@RequestMapping(value = "/login",method=RequestMethod.POST)
	public UserInfo login(User user, HttpServletResponse response) {
		try {
			UserUtils.login(user);
			return this.userService.loadUserInfo(user.getLogin());
		} catch (AuthenticationException e) {
//			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return null;
		}
//		setCookie(response);
	}
	
	@RequestMapping(value = { "/index"})
	public ModelAndView toIndex(){
		return new ModelAndView("index.html");
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
	
	@ResponseBody
	@RequestMapping(value = "/checkSession")
	public boolean checkSession(HttpServletResponse response) {
		return UserUtils.isExpires();
	}
	
	public void setCookie(HttpServletResponse response){
		Cookie cookie =new Cookie("JSESSIONID","2jcligmgi6fh");
		cookie.setMaxAge(Integer.MAX_VALUE);
		response.addCookie(cookie);
	}
}
