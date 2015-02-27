package com.wechat.dao;

import java.util.List;

import com.wechat.entity.ContactRequest;

public interface ContactRequestDao {
	
	/**
	 * @param cr
	 * @return
	 */
	public boolean addContactRequest(ContactRequest cr);
	
	/**
	 * @param targetId
	 * @return
	 */
	public List<ContactRequest> getContactRequests(String targetId);
	
	/**
	 * @param userId
	 * @param targetId
	 * @param status
	 * @return
	 */
	public boolean changeStatus(String userId, String targetId, String status);
	
	/**
	 * @param userId
	 * @param targetId
	 * @return
	 */
	public ContactRequest getContactRequest(String userId, String targetId);
}
