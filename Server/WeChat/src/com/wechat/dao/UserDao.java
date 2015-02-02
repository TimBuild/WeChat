package com.wechat.dao;

public interface UserDao {
	
	public boolean checkIdUnique(String userId);
	
	public boolean Login(String userId, String password);
	
	public boolean addUser(String userId, String username, String password, String icon);
}
