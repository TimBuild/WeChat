package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Contact;
import com.wechat.entity.User;

public interface ContactDao {
	/**
	 * 
	 * @param ownerId
	 * @return
	 */
	public List<User> getContacts(String ownerId);
	/**
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public Contact getContact(String ownerId, String contactId);
	/**
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public boolean addContact(String ownerId, String contactId);
	/**
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public boolean deleteContact(String ownerId, String contactId);
}
