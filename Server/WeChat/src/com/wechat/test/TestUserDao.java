package com.wechat.test;

import org.junit.Test;

import com.wechat.dao.UserDao;
import com.wechat.dao.impl.UserDaoImpl;

public class TestUserDao {

	@Test
	public void test() {
		// System.out.println("ok");
		UserDao userDaoImpl = new UserDaoImpl();
		// Boolean addUserFlag = userDaoImpl.addUser("11", "Tim1", "1234561");
		// Boolean checkIdUniqueFlag = userDaoImpl.checkIdUnique("12");
		// User getUserUser = userDaoImpl.getUser("11", "123456");
		// Boolean modifyUserIconFlag = userDaoImpl.modifyUserIcon("14", "");

		// User getUserByIdUser = userDaoImpl.getUserById("11");
		// List<User> user = userDaoImpl.getUsersByName("a");
//		Boolean modifyUserPswFlag = userDaoImpl.modifyUserPsw("12", "aaa123");
		String modifyUserPswFlag = userDaoImpl.getToken("11");
		// Boolean modifyUserName = userDaoImpl.modifyUserName("12", "aa123");
		System.out.println(modifyUserPswFlag);
		// fail("Not yet implemented");
	}

}
