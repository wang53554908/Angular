package com.sky.admin.security;

import java.util.Set;
import com.sky.admin.entity.User;

public class UserInfo {
	private User user;

	private Set<String> objectPermissions;

	private Set<String> urlPermissions;
	
	private Set<String> buttonPermissions;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<String> getObjectPermissions() {
		return objectPermissions;
	}

	public void setObjectPermissions(Set<String> objectPermissions) {
		this.objectPermissions = objectPermissions;
	}

	public Set<String> getUrlPermissions() {
		return urlPermissions;
	}

	public void setUrlPermissions(Set<String> urlPermissions) {
		this.urlPermissions = urlPermissions;
	}

	public Set<String> getButtonPermissions() {
		return buttonPermissions;
	}

	public void setButtonPermissions(Set<String> buttonPermissions) {
		this.buttonPermissions = buttonPermissions;
	}

}