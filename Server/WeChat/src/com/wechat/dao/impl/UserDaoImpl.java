package com.wechat.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;

import com.wechat.tool.C3P0DBConnectionPool;
import com.wechat.tool.ReadProperties;
import com.wechat.dao.UserDao;
import com.wechat.entity.User;

public class UserDaoImpl implements UserDao {

	private QueryRunner queryRunner = new QueryRunner();

	/*
	 * (non-Javadoc) user Login OK
	 * 
	 * @see com.wechat.dao.UserDao#Login(java.lang.String, java.lang.String)
	 */
	@Override
	public User getUser(String userId, String password) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		User user = null;
		try {
			user = queryRunner.query(conn, ReadProperties
					.read("sql", "getUser"), new BeanHandler<>(User.class),
					userId, password);

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return user;
	}

	/*
	 * (non-Javadoc) add User OK
	 * 
	 * @see com.wechat.dao.UserDao#addUser(java.lang.String, java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public boolean addUser(String userId, String username, String password,
			String icon) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "addUser"), userId, username,
					password, icon);
			if (ret > 0) {
				conn.commit();
				return true;
			} else {
				conn.rollback();
			}

		} catch (SQLException e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} finally {

			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
		return false;
	}

	/*
	 * (non-Javadoc) OK
	 * 
	 * @see com.wechat.dao.UserDao#checkIdUnique(java.lang.String)
	 */
	@Override
	public boolean checkIdUnique(String userId) {

		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		User user = null;
		try {
			user = queryRunner.query(conn,
					ReadProperties.read("sql", "getUserByUserId"),
					new BeanHandler<>(User.class), userId);
			if (user != null) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return false;
	}

	/* (non-Javadoc) OK
	 * @see com.wechat.dao.UserDao#modifyUserIcon(java.lang.String, java.lang.String)
	 */
	@Override
	public boolean modifyUserIcon(String userId, String icon) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();

		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "modifyUserIcon"), icon, userId);
			if (ret > 0) {
				conn.commit();
				return true;
			} else {
				conn.rollback();
			}
		} catch (SQLException e) {
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		return false;
	}

}
