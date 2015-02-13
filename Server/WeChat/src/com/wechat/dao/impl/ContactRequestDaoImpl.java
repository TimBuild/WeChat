package com.wechat.dao.impl;

import java.util.List;

import com.wechat.dao.ContactRequestDao;
import com.wechat.entity.ContactRequest;

public class ContactRequestDaoImpl implements ContactRequestDao {

	@Override
	public boolean addContactRequest(ContactRequest cr) {
		return false;
	}

	@Override
	public boolean changeStatus(String userId, String targetId, String status) {
		return false;
	}

	@Override
	public List<ContactRequest> getContactRequests(String targetId) {
		return null;
	}

	
}
