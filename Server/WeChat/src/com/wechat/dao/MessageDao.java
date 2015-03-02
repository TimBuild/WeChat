package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Message;
import com.wechat.entity.MessageCount;

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
	
	/**
	 * @param msgs
	 * @return
	 */
	public boolean changeStatus(List<Message> msgs);
	
	/**
	 * @param contactId
	 * @return
	 */
	public List<MessageCount> getMessageCount(String contactId);
}
