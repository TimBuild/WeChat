package com.wechat.dao;

import com.wechat.entity.User;

public interface UserDao {

	/**
	 * @param userId
	 * @return true: user exists; false: user doesn't exist
	 */
	public boolean checkIdUnique(String userId);

	public User getUser(String userId, String password);

	public boolean addUser(String userId, String username, String password);

	public boolean modifyUserIcon(String userId, String icon);
}
