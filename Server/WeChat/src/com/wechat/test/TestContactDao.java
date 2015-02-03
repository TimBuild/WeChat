package com.wechat.test;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.wechat.dao.ContactDao;
import com.wechat.dao.impl.ContactDaoImpl;
import com.wechat.entity.Contact;
import com.wechat.entity.User;

public class TestContactDao {

	@Test
	public void test() {
		ContactDaoImpl contactDaoImpl = new ContactDaoImpl();
		//List<User> user = contactDaoImpl.getContacts("13");
		
		//boolean addContactFlag = contactDaoImpl.addContact("14", "11");
		//boolean deleteContactFlag = contactDaoImpl.deleteContact("14", "11");
		Contact contact = contactDaoImpl.getContact("11", "12");
		System.out.println(contact);
	}

}
