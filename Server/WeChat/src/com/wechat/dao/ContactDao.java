package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Contact;
import com.wechat.entity.User;

public interface ContactDao {
	/**
	 * 
	 * get all User's contact message by ownerId
	 * 
	 * @param ownerId
	 * @return
	 */
	public List<User> getContacts(String ownerId);

	/**
	 * 
	 * get Contact's record by owenerId and contactId,judge before addContact
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public Contact getContact(String ownerId, String contactId);

	/**
	 * 
	 * add a Contact record by owenerId and contactId
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public boolean addContact(String ownerId, String contactId);

	/**
	 * 
	 * delete a Contact record by owenerId and contactId
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public boolean deleteContact(String ownerId, String contactId);
}
