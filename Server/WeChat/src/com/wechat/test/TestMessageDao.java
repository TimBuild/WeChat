package com.wechat.test;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.wechat.dao.MessageDao;
import com.wechat.dao.impl.MessageDaoImpl;
import com.wechat.entity.Message;
import com.wechat.entity.MessageCount;

public class TestMessageDao {

	@Test
	public void test() {
		MessageDao messageDao = new MessageDaoImpl();
//		Message msg=new Message();
//		msg.setOwnerId("2");
//		msg.setContactId("3");
//		msg.setContent("ccc");
//		msg.setTime("122211");
//		msg.setStatus("true");
//		System.out.println(messageDao.addMessage(msg));
//		System.out.println(messageDao.getMessages("2", "3"));
//		List<Message> msgs = messageDao.getMessages("2", "3");
//		System.out.println(messageDao.changeStatus(msgs));
		List<MessageCount> messageCount = messageDao.getMessageCount("10685003");
		for(int i=0;i<messageCount.size();i++){
			System.out.println(messageCount.get(i).getUserId()+"  "+messageCount.get(i).getCount());
		}
	}

}
