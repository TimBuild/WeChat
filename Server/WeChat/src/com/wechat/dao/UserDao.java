package com.wechat.dao;

import java.util.List;

import com.wechat.entity.User;

public interface UserDao {

	/**
	 * @param userId
	 * @return true: user exists; false: user doesn't exist
	 */
	public boolean checkIdUnique(String userId);

	/**
	 * 
	 * @param userId
	 * @param password
	 * @return
	 */
	public User checkUser(String userId, String password);
	/**
	 * 
	 * @param userId
	 * @return
	 */
	public User getUserById(String userId);
	/**
	 * 
	 * @param username
	 * @return
	 */
	public List<User> getUsersByName(String username);
	/**
	 * 
	 * @param userId
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean addUser(String userId, String username, String password);
	/**
	 * 
	 * @param userId
	 * @param icon
	 * @return
	 */
	public boolean modifyUserIcon(String userId, String icon);
}
