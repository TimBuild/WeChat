package com.wechat.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MessageCount {
	
	private String userId;
	private int count;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
	
}
