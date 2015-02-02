package com.wechat.dao;

import java.sql.SQLException;

import com.wechat.entity.User;

public interface UserDao {

	/**
	 * 
	 * @param userId
	 * @return
	 */
	public boolean checkIdUnique(String userId);

	public User getUser(String userId, String password);

	public boolean addUser(String userId, String username, String password,
			String icon);

	public boolean modifyUserIcon(String userId, String icon);
}
