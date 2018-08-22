package com.sky.util;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;

import com.sky.admin.entity.Organization;
import com.sky.admin.service.OrgService;
import com.sky.common.entity.Page;



@ContextConfiguration(locations = { "classpath*:conf/spring-*.xml" })
public abstract class BaseTest extends AbstractTransactionalJUnit4SpringContextTests {

	protected final Logger log = Logger.getLogger(this.getClass());
	
	@Resource
	private OrgService orgService;
	@Test
	public void getAllOrgList(){
		Page<Organization> page = new Page<Organization>();
		Map<String, Object> params = new HashMap<String, Object>();  
        params.put("name", "×éÖ¯1");  
        params.put("orderByClause","id desc");  
        page.setParams(params);  
		List<Organization> orgList = this.orgService.findAll(page);
	}
	
}
