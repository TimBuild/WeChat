package com.wechat.dao;

import java.util.List;

import com.wechat.entity.User;

public interface ContactDao {
	
	public List<User> getContacts(String userId);
}
