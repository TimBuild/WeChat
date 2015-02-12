package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Message;

public interface MessageDao {

	public boolean addMessage(Message msg);
	
	public List<Message> getMessages(String ownerId, String contactId);
}
