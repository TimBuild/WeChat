package com.wechat.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.wechat.dao.MessageDao;
import com.wechat.dao.impl.MessageDaoImpl;
import com.wechat.entity.Message;

public class TestMessageDao {

	@Test
	public void test() {
		MessageDao messageDao = new MessageDaoImpl();
		Message msg=new Message();
		msg.setOwnerId("2");
		msg.setContactId("3");
		msg.setContent("bbba");
		msg.setTime("1111111");
		msg.setStatus("true");
		System.out.println(messageDao.addMessage(msg));
	}

}
