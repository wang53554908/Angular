package com.sky.dashboard.service;

import com.sky.dashboard.entity.Comment;



public interface CommentService {
	
	int insert(Comment comment);
	int delete(int id);
}
