package com.wechat.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import com.wechat.tool.C3P0DBConnectionPool;
import com.wechat.tool.ReadProperties;
import com.wechat.dao.UserDao;
import com.wechat.entity.Contact;
import com.wechat.entity.User;

public class UserDaoImpl implements UserDao {

	private QueryRunner queryRunner = new QueryRunner();

	@Override
	public User checkUser(String userId, String password) {
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

	@Override
	public boolean addUser(String userId, String username, String password) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "addUser"), userId, username,
					password);
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

	@Override
	public User getUserById(String userId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		User user = null;
		try {
			user = queryRunner.query(conn,
					ReadProperties.read("sql", "getUserByUserId"),
					new BeanHandler<>(User.class), userId);
			user.setPassword(null);

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

	@Override
	public List<User> getUsersByName(String username) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		List<User> userList = null;
		List<User> user = new ArrayList<User>();
		try {

			userList = queryRunner.query(conn,
					ReadProperties.read("sql", "getUserByUsername"),
					new BeanListHandler<>(User.class), "%" + username + "%");
			for(User u:userList){
				u.setPassword(null);
				user.add(u);
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
		return user;
	}

}
