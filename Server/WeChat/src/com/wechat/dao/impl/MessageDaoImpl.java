package com.wechat.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import com.wechat.dao.MessageDao;
import com.wechat.entity.Message;
import com.wechat.entity.User;
import com.wechat.tool.C3P0DBConnectionPool;
import com.wechat.tool.ReadProperties;

public class MessageDaoImpl implements MessageDao {

	private QueryRunner queryRunner = new QueryRunner();

	@Override
	public boolean addMessage(Message msg) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();

		try {
			conn.setAutoCommit(false);
			int ret = -1;
			ret = queryRunner.update(conn,
					ReadProperties.read("sql", "addMessage"), msg.getOwnerId(),
					msg.getContactId(), msg.getContent(), msg.getTime(),
					msg.getStatus());
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

	@Override
	public List<Message> getMessages(String ownerId, String contactId) {
		Connection conn = (Connection) C3P0DBConnectionPool.getConnection();
		List<Message> messageList = null;
		List<Message> message = new ArrayList<Message>();
		try {

			messageList = queryRunner.query(conn,
					ReadProperties.read("sql", "getMessagesByOwnContact"),
					new BeanListHandler<>(Message.class), ownerId,contactId);
			for (Message m :messageList) {
				
				message.add(m);
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
		return message;
	}

	@Override
	public boolean changeStatus(List<Message> msgs) {
		// TODO Auto-generated method stub
		return false;
	}

}
