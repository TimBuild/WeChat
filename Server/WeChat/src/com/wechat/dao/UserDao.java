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
	 * 通过id和密码检查用户
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
	
	/**
	 * 修改用户名和密码
	 * @param userId
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean modifyUserNameOrPsw(String userId, String username, String password);
}
