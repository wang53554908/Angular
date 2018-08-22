package com.sky.admin.security;

import java.util.Set;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;

import com.sky.admin.entity.User;

public class UserUtils {

	public static final String SESSION_KEY_USER_INFO = "userInfo";

	public static User getLoginUser() {
		User user = getFromSession(SESSION_KEY_USER_INFO) == null ? null
				: ((UserInfo) getFromSession(SESSION_KEY_USER_INFO)).getUser();
		return user;
	}

	public static Set<String> getUrlPermissions() {
		Set<String> urlPermissions = getFromSession(SESSION_KEY_USER_INFO) == null ? null
				: ((UserInfo) getFromSession(SESSION_KEY_USER_INFO)).getUrlPermissions();
		return urlPermissions;
	}

	public static Set<String> getObjectPermissions() {
		Set<String> objectPermissions = getFromSession(SESSION_KEY_USER_INFO) == null ? null
				: ((UserInfo) getFromSession(SESSION_KEY_USER_INFO)).getObjectPermissions();
		return objectPermissions;
	}

	public static Session getSession() {
		return SecurityUtils.getSubject().getSession();
	}

	public static String getFullname() {
		return getLoginUser() == null ? null : getLoginUser().getFstName()+getLoginUser().getLstName();
	}

	public static void setToSession(Object key, Object value) {
		getSession().setAttribute(key, value);
	}

	public static Object getFromSession(Object key) {
		return getSession().getAttribute(key);
	}

	public static void login(User user) {
		UsernamePasswordToken token = new UsernamePasswordToken(String.valueOf(user.getLogin()), user.getPassword());
		SecurityUtils.getSubject().login(token);
	}

	public static UserInfo getUserInfo() {
		UserInfo userInfo = getFromSession(SESSION_KEY_USER_INFO) == null ? null
				: ((UserInfo) getFromSession(SESSION_KEY_USER_INFO));
		return userInfo;
	}

	public static void logout() {
		SecurityUtils.getSubject().logout();
		getSession().removeAttribute(SESSION_KEY_USER_INFO);
	}
	
	 /**
     *是否是Ajax请求,如果是ajax请求响应头会有，x-requested-with
     * @param request
     * @return
     */
    public static boolean isAjax(ServletRequest request){
        return "XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest)request).getHeader("X-Requested-With"));
    }
    
    public static boolean isExpires(){
    	return !SecurityUtils.getSubject().getSession().getAttributeKeys().contains(SESSION_KEY_USER_INFO)?true:false;
    }
    
}
