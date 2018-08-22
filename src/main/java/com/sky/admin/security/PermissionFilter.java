package com.sky.admin.security;

import java.util.Set;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.filter.AccessControlFilter;

public class PermissionFilter extends AccessControlFilter {

	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		((HttpServletResponse) response).setStatus(HttpServletResponse.SC_FORBIDDEN);
		return Boolean.FALSE;
	}

	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue)
			throws Exception {
		HttpServletRequest httpRequest = ((HttpServletRequest) request);
		int index = httpRequest.getServletPath().indexOf(".do");
		String url = httpRequest.getServletPath().substring(0, index);

		Set<String> urlPermissions = UserUtils.getUrlPermissions();

		for (String permission : urlPermissions) {
			if (url.startsWith(permission)) {
				return Boolean.TRUE;
			}
		}

		return Boolean.FALSE;
	}
}