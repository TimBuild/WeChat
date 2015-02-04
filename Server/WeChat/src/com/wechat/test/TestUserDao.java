package com.wechat.test;

import java.util.List;

import org.junit.Test;

import com.wechat.dao.UserDao;
import com.wechat.dao.impl.UserDaoImpl;
import com.wechat.entity.User;

public class TestUserDao {

	@Test
	public void test() {
	//	System.out.println("ok");
		UserDao userDaoImpl = new UserDaoImpl();
//		Boolean addUserFlag = userDaoImpl.addUser("11", "Tim1", "1234561");
//		Boolean checkIdUniqueFlag = userDaoImpl.checkIdUnique("12");
//		User getUserUser = userDaoImpl.getUser("11", "123456");
//		Boolean modifyUserIconFlag = userDaoImpl.modifyUserIcon("14", "");
		
		
//		User getUserByIdUser = userDaoImpl.getUserById("11");
//		List<User> user = userDaoImpl.getUsersByName("a");
		Boolean modifyUserNameOrPswFlag = userDaoImpl.modifyUserNameOrPsw("12", "aa", "aaa");
		System.out.println(modifyUserNameOrPswFlag);
		//fail("Not yet implemented");
	}

}
