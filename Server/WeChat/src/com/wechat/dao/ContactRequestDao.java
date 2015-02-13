package com.wechat.dao;

import java.util.List;

import com.wechat.entity.ContactRequest;

public interface ContactRequestDao {
	
	public boolean addContactRequest(ContactRequest cr);
	
	public List<ContactRequest> getContactRequests(String targetId);
	
	public boolean changeStatus(String userId, String targetId, String status);
}
