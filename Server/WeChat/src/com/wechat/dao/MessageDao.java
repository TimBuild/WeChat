package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Message;

public interface MessageDao {

	/**
	 * @param msg
	 * @return
	 */
	public boolean addMessage(Message msg);
	
	/**
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public List<Message> getMessages(String ownerId, String contactId);
	
	public boolean changeStatus(List<Message> msgs);
}
