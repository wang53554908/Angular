package com.sky.admin.security;

import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sky.admin.dao.UserMapper;
import com.sky.admin.entity.User;
import com.sky.admin.service.UserService;

@Component(value = "securityRealm")
public class SecurityRealm extends AuthorizingRealm {

	@Autowired
	private PasswordService passwordService;

	@Autowired
	private UserService userService;
	
	@Resource
    private UserMapper userMapper; 

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		return null;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

		UsernamePasswordToken upToken = (UsernamePasswordToken) token;

		User u = new User();
		// // 通过数据库进行验证
		String id = upToken.getUsername();
		String password = String.valueOf(upToken.getPassword());
		u.setLogin(id);
		String dbPassword = userMapper.find(u).getPassword();

		if (dbPassword == null || !dbPassword.equals(password))
			return null;

		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(token.getPrincipal(),
				token.getCredentials(), getName());
		return authenticationInfo;
	}

}
