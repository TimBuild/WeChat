package com.wechat.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserRelatedToCR {
	private User user;
	private ContactRequest cr;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public ContactRequest getCr() {
		return cr;
	}
	public void setCr(ContactRequest cr) {
		this.cr = cr;
	}
	
	
}
