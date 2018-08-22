package com.sky.admin.security;


import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.filter.PathMatchingFilter;

//自定义拦截器,Session过期AJAX处理
public class SessionExpiredFilter extends PathMatchingFilter {
	
    @Override   
    protected boolean onPreHandle(ServletRequest  request, ServletResponse response, Object mappedValue) throws Exception {
    	String header = ((HttpServletRequest) request).getHeader("Accept");
         if(UserUtils.isExpires()){
        	 if("application/json, text/plain, */*".equals(header)){
	        	 ((HttpServletResponse) response).setStatus(403);
	        	 UserUtils.logout();
	        	 return false;
        	 }
        	 return true;
        }
        return true;
    }


}