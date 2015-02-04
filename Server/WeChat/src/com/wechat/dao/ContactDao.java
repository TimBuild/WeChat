package com.wechat.dao;

import java.util.List;

import com.wechat.entity.Contact;
import com.wechat.entity.User;

public interface ContactDao {
	/**
	 * 通过ownerId 找到对应之下所有的contactId的用户信息 如果没有联系人的话会返回null
	 * 
	 * @param ownerId
	 * @return
	 */
	public List<User> getContacts(String ownerId);

	/**
	 * 通过owenerId 和contactId来查找是否存在联系人的记录 ，为增加联系人记录之前判断
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public Contact getContact(String ownerId, String contactId);

	/**
	 * 通过owenerId 和contactId来增加一条联系人的记录
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public boolean addContact(String ownerId, String contactId);

	/**
	 * 通过owenerId 和contactId来删除一条联系人的记录
	 * 
	 * @param ownerId
	 * @param contactId
	 * @return
	 */
	public boolean deleteContact(String ownerId, String contactId);
}
