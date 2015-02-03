package com.wechat.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import com.wechat.dao.ContactDao;
import com.wechat.entity.Contact;
import com.wechat.entity.User;
import com.wechat.tool.C3P0DBConnectionPool;
import com.wechat.tool.ReadProperties;

public class ContactDaoImpl implements ContactDao {

	private QueryRunner queryRunner = new QueryRunner();

	/*
	 * (non-Javadoc) 通过ownerId 找到对应之下所有的contactId的用户信息 如果没有联系人的话会返回null
	 * 
	 * @see com.wechat.dao.ContactDao#getContacts(java.lang.String)
	 */
	@Override
	public List<User> getContacts(String ownerId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		List<Contact> contact = null;
		List<User> user = new ArrayList<User>();
		User userContact = null;
		try {
			contact = queryRunner.query(conn,
					ReadProperties.read("sql", "getContactsByOwnerId"),
					new BeanListHandler<>(Contact.class), ownerId);
			if (contact != null) {
				for (int i = 0; i < contact.size(); i++) {
					String contactId = contact.get(i).getContactId();

					userContact = queryRunner.query(conn,
							ReadProperties.read("sql", "getUserByContactId"),
							new BeanHandler<>(User.class), contactId);
					user.add(userContact);
				}
				if (user.size() != 0) {
					return user;
				}

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
		return null;
	}

	/* (non-Javadoc) 通过owenerId 和contactId来增加一条联系人的记录
	 * @see com.wechat.dao.ContactDao#addContact(java.lang.String, java.lang.String)
	 */
	@Override
	public boolean addContact(String ownerId, String contactId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();

		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "addContact"), ownerId,
					contactId);
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

	/* (non-Javadoc)通过owenerId 和contactId来删除一条联系人的记录
	 * @see com.wechat.dao.ContactDao#deleteContact(java.lang.String, java.lang.String)
	 */
	@Override
	public boolean deleteContact(String ownerId, String contactId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();

		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "deleteContact"), ownerId,
					contactId);
			System.out.println(ret);
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

	/* (non-Javadoc)通过owenerId 和contactId来查找是否存在联系人的记录 ，为增加联系人记录之前判断
	 * @see com.wechat.dao.ContactDao#getContact(java.lang.String, java.lang.String)
	 */
	@Override
	public Contact getContact(String ownerId, String contactId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		Contact contact = null;
		try {
			contact = queryRunner.query(conn, ReadProperties
					.read("sql", "getContactByOwnerContactId"), new BeanHandler<>(Contact.class),
					ownerId, contactId);

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
