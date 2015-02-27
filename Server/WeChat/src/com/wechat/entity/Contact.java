package com.wechat.entity;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Contact {
	private int id;
	private String ownerId;
	private String contactId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getContactId() {
		return contactId;
	}
	public void setContactId(String contactId) {
		this.contactId = contactId;
	}
	
	
}
