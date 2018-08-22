package com.sky.admin.service;

import java.util.List;

import com.sky.admin.entity.Organization;
import com.sky.common.entity.Page;

public interface OrgService {

	public List<Organization> findAll(Page<Organization> page);

	public Organization findOne(String id);

	public void update(Organization org);

	public void save(Organization org);
}
