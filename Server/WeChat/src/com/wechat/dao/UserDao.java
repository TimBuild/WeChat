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
	 * check user by userid and password
	 * 
	 * @param userId
	 * @param password
	 * @return user
	 */
	public User checkUser(String userId, String password);

	/**
	 * no password
	 * 
	 * @param userId
	 * @return
	 */
	public User getUserById(String userId);

	/**
	 * no password
	 * no token
	 * @param username
	 * @return
	 */
	public List<User> getUsersByName(String username);

	/**
	 * 
	 * @param userId
	 * @param username
	 * @param password
	 * @param token
	 * @return
	 */
	public boolean addUser(String userId, String username, String password, String token);

	/**
	 * modify icon
	 * 
	 * @param userId
	 * @param icon
	 * @return
	 */
	public boolean modifyUserIcon(String userId, String icon);

	/**
	 * modify username
	 * 
	 * @param userId
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean modifyUserName(String userId, String username);

	/**
	 * modify password
	 * 
	 * @param userId
	 * @param password
	 * @return
	 */
	public boolean modifyUserPsw(String userId, String password);
	
	/**
	 * @param userId
	 * @return
	 */
	public String getToken(String userId);
}
