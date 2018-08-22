package com.sky.admin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sky.admin.dao.OrgMapper;
import com.sky.admin.entity.Organization;
import com.sky.admin.service.OrgService;
import com.sky.common.entity.Page;

@Service
public class OrgServiceImpl implements OrgService{

	@Resource
    private OrgMapper orgMapper; 
	
	@Override
	public List<Organization> findAll(Page<Organization> page) {
		return this.orgMapper.select(page);
	}

	@Override
	public Organization findOne(String id) {
		// TODO Auto-generated method stub
		return this.orgMapper.findOne(id);
	}

	@Override
	public void update(Organization org) {
		// TODO Auto-generated method stub
		this.orgMapper.update(org);
	}

	@Override
	public void save(Organization org) {
		// TODO Auto-generated method stub
		this.orgMapper.save(org);
	}

}
