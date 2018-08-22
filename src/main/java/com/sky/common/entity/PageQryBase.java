package com.sky.common.entity;

import java.io.Serializable;

public abstract class PageQryBase implements Serializable{

	private long page;
	private long pageSize;
	private static final int DEFAULT_PAGESIZE=10;
	public long getPage() {
		return page;
	}
	public void setPage(long page) {
		this.page = page;
	}
	public long getPageSize() {
		return pageSize;
	}
	public void setPageSize(long pageSize) {
		this.pageSize = pageSize;
	}
	
	
}
