package com.wechat.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MessageRelatedToUser {

	private MessageCount msgCount;
	private User user;
	public MessageCount getMsgCount() {
		return msgCount;
	}
	public void setMsgCount(MessageCount msgCount) {
		this.msgCount = msgCount;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
