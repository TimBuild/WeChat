package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Contact;
import com.wechat.entity.User;

public interface ContactDao {
	
	public List<User> getContacts(String ownerId);
	
	public Contact getContact(String ownerId, String contactId);
	
	public boolean addContact(String ownerId, String contactId);
	
	public boolean deleteContact(String ownerId, String contactId);
}
