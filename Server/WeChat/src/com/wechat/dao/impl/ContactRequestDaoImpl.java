package com.wechat.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import com.wechat.dao.ContactRequestDao;
import com.wechat.entity.ContactRequest;
import com.wechat.entity.Message;
import com.wechat.entity.User;
import com.wechat.tool.C3P0DBConnectionPool;
import com.wechat.tool.ReadProperties;

public class ContactRequestDaoImpl implements ContactRequestDao {

	private QueryRunner queryRunner = new QueryRunner();

	@Override
	public boolean addContactRequest(ContactRequest cr) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();

		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "addContactRequest"),
					cr.getUserId(), cr.getTargetId(), cr.getStatus());
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
	public boolean changeStatus(String userId, String targetId, String status) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		try {
			conn.setAutoCommit(false);
			int ret = -1;

			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "changeStatus"), status, userId,
					targetId);

			if (ret > 0) {
				conn.commit();
				return true;
			} else {
				conn.rollback();
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
	public List<ContactRequest> getContactRequests(String targetId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		List<ContactRequest> crs = null;
		try {

			crs = queryRunner.query(conn,
					ReadProperties.read("sql", "getContactRequestsByTargetId"),
					new BeanListHandler<>(ContactRequest.class), targetId);

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
		return crs;
	}

	@Override
	public ContactRequest getContactRequest(String userId, String targetId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		ContactRequest contact = null;
		try {
			contact = queryRunner.query(conn, ReadProperties
					.read("sql", "getContactRequest"), new BeanHandler<>(ContactRequest.class),
					userId, targetId);

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
		return contact;
	}

}
