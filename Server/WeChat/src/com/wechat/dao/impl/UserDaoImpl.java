package com.wechat.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;

import com.wechat.tool.C3P0DBConnectionPool;
import com.wechat.tool.ReadProperties;
import com.wechat.dao.UserDao;
import com.wechat.entity.User;

public class UserDaoImpl implements UserDao{
	
	private QueryRunner queryRunner = new QueryRunner();
	
	@Override
	public boolean Login(String userId, String password) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		
		try {
			queryRunner.query(conn, ReadProperties.read("sql", "getUser"), new BeanHandler<>(User.class), userId, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

}
