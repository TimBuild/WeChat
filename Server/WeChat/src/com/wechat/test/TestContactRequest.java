package com.wechat.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.wechat.dao.ContactRequestDao;
import com.wechat.dao.impl.ContactRequestDaoImpl;
import com.wechat.entity.ContactRequest;

public class TestContactRequest {

	@Test
	public void test() {
		ContactRequestDao contactDao = new ContactRequestDaoImpl();
		
//		ContactRequest contactRequest = new ContactRequest();
//		contactRequest.setUserId("111");
//		contactRequest.setTargetId("222");
//		contactRequest.setStatus("1");
//		
//		System.out.println(contactDao.addContactRequest(contactRequest));
		
//		System.out.println(contactDao.changeStatus("333", "222", "aa"));
//		System.out.println(contactDao.getContactRequests("222"));
		
		System.out.println(contactDao.getContactRequest("444", "222").getId());
		
	}

}
