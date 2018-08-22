package com.sky.admin.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sky.admin.entity.Organization;
import com.sky.common.entity.Page;

public interface OrgMapper {

	List<Organization> select(Page<Organization> params);

	Organization findOne(@Param("id") String id);

	void update(Organization org);

	void save(Organization org);
}
