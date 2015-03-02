package com.wechat.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.wechat.dao.ContactDao;
import com.wechat.dao.ContactRequestDao;
import com.wechat.dao.MessageDao;
import com.wechat.dao.UserDao;
import com.wechat.dao.impl.ContactDaoImpl;
import com.wechat.dao.impl.ContactRequestDaoImpl;
import com.wechat.dao.impl.MessageDaoImpl;
import com.wechat.dao.impl.UserDaoImpl;
import com.wechat.entity.Contact;
import com.wechat.entity.ContactRequest;
import com.wechat.entity.Message;
import com.wechat.entity.MessageCount;
import com.wechat.entity.User;
import com.wechat.entity.UserRelatedToCR;
import com.wechat.tool.SystemUtil;

@Path("/UserService")
public class UserService {

	private UserDao userDao = new UserDaoImpl();
	private ContactDao contactDao = new ContactDaoImpl();
	private MessageDao messageDao = new MessageDaoImpl();
	private ContactRequestDao crDao = new ContactRequestDaoImpl();
	/**
	 * user login
	 * @param userid
	 * @param password
	 * @return
	 */
	@GET
	@Path("/login")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String login(@QueryParam("userid") String userid,
			@QueryParam("psw") String password) {
		
		User user = userDao.checkUser(userid, password);
		if(user != null){
			return user.getToken();
		} else {
			return null;
		}
	}
	
	/**
	 * user register
	 * @param username
	 * @param password
	 * @return
	 */
	@GET
	@Path("/register")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String register(
			@QueryParam("username") String username,
			@QueryParam("psw") String password) {
		String userid = "";
		do{
			userid = String.valueOf(SystemUtil.generateUserId());
		} while (userDao.checkIdUnique(userid));
		
		if(userDao.addUser(userid, username, password, UUID.randomUUID().toString())){
			return userid;
		} else {
			return "";
		}		
	}

	/**
	 * upload user header
	 * @param token
	 * @param userid
	 * @param request
	 * @param response
	 * @return
	 */
	@POST
	@Path("/uploadIcon/{token}/{userid}")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	@Produces(value = MediaType.TEXT_PLAIN)
	public String uploadIcon(
			@PathParam("token") String token,
			@PathParam("userid") String userid, 
			@Context HttpServletRequest request, 
			@Context HttpServletResponse response) {
		
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid)) ){
			
			String path = SystemUtil.uploadIcon(userid, request);
			String changePath = SystemUtil.changePath(path, request);
			if(path != null){
				if(userDao.modifyUserIcon(userid, changePath)){
					return changePath;
				} else {
					return "false";
				}
			} else {
				return "false";
			}
		} else {
			return "false";
		}
	}
	
	/**
	 * get contacts by userid
	 * @param token
	 * @param userid
	 * @return
	 */
	@GET
	@Path("/getContacts/{token}/{userid}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> getContacts(
			@PathParam("token") String token,
			@PathParam("userid") String userid){
		if((SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			List<User> list = contactDao.getContacts(userid);
			return list;
		} else {
			return null;
		}
	}
	
	/**
	 * add user by userid
	 * @param token
	 * @param userid
	 * @param contactId
	 * @return
	 */
	/*@GET
	@Path("/addContact/{token}/{userid}")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String addContact(
			@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("contactId") String contactId){
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			if(!userDao.checkIdUnique(contactId)){
				return "no-user";
			} else {
				if(userid.equals(contactId)){
					return "can't-add-oneself";
				} else {
					Contact contact = contactDao.getContact(userid, contactId);
					if(contact != null){
						return "exist-contact";
					} else{
						return "true";
					}
				}
			}
		} else {
			return "false";
		}
	}*/
	
	/**
	 * query user by id
	 * @param token
	 * @param userid
	 * @return 
	 */
	@GET
	@Path("/queryUserById/{token}/{userid}")
	@Produces({ MediaType.APPLICATION_JSON })
	public User queryUserById(
			@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("id") String id){
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			User user = userDao.getUserById(id);
			return user;
		} else {
			return null;
		}
	}
	
	/**
	 * query user by username
	 * @param token
	 * @param username
	 * @return 
	 */
	@GET
	@Path("/queryUserByName/{token}/{userid}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> queryUserByName(
			@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("username") String username){
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			List<User> list = userDao.getUsersByName(username);
			return list;
		} else {
			return null;
		}
	}
	
	/**
	 * modify username or password
	 * @param token
	 * @param userid
	 * @param username
	 * @param password
	 * @return
	 */
	@GET
	@Path("/modifyUserNameOrPsw/{token}/{userid}")
	@Produces({ MediaType.TEXT_PLAIN })
	public String modifyUserNameOrPsw(
			@PathParam("token") String token,
			@PathParam("userid") String userid, 
			@QueryParam("username") String username,
			@QueryParam("psw") String password
			){
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			if(password == null || "".equals(password)){
				if(userDao.modifyUserName(userid, username)){
					return "true";
				} else {
					return "false";
				}
			} else {
				if(userDao.modifyUserPsw(userid, password)){
					return "true";
				} else {
					return "false";
				}
			}
		} else {
			return "false";
		}
	}
	
	/**
	 * @param token
	 * @param userid
	 * @param targetid
	 * @param content
	 * @return
	 */
	@GET
	@Path("/addMessage/{token}/{userid}")
	@Produces({ MediaType.TEXT_PLAIN })
	public String addMessage(@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("targetid") String targetid,
			@QueryParam("content") String content
			){
		
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			Message msg = new Message();
			msg.setUserId(userid);
			msg.setTargetId(targetid);
			msg.setContent(content);
			msg.setDate(String.valueOf(new Date().getTime()));
			msg.setStatus("0");
			
			if(messageDao.addMessage(msg)){
				return "true";
			} else {
				return "false";
			}
		} else {
			return "false";
		}
		
	}
	
	/**
	 * @param token
	 * @param userid
	 * @param targetid
	 * @return
	 */
	@GET
	@Path("/getMessages/{token}/{userid}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Message> getMessages(@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("targetid") String targetid
			){
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid)) ){
			List<Message> msgs = messageDao.getMessages(targetid, userid);
			messageDao.changeStatus(msgs);
			return msgs;
		} else {
			return null;
		}
	}
	
	@GET
	@Path("/getMessageCounts/{token}/{userid}")
	public List<MessageCount> getMessageCounts(@PathParam("token") String token,
			@PathParam("userid") String userid
			){
		if( (SystemUtil.changeToken(token)).equals(userDao.getToken(userid)) ){
			return null;
		} else {
			return null;
		}
	}
	
	@GET
	@Path("/addContactRequest/{token}/{userid}")
	@Produces({ MediaType.TEXT_PLAIN })
	public String addContactRequest(@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("targetid") String targetid
			){
		if((SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			if(contactDao.getContact(userid, targetid) == null){
				ContactRequest cr = crDao.getContactRequest(userid, targetid);
				if(cr != null){
					return "sent";
				} else {
					ContactRequest cr2 = new ContactRequest();
					cr2.setStatus("0");
					cr2.setUserId(userid);
					cr2.setTargetId(targetid);
					if(crDao.addContactRequest(cr2)){
						return "true";
					} else {
						return "false";
					}
				}
			} else {
				return "exist";
			}
			
		} else {
			return "false";
		}
	}
	
	@GET
	@Path("/getContactRequests/{token}/{userid}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<UserRelatedToCR> getContactRequests(@PathParam("token") String token,
			@PathParam("userid") String userid
			){
		List<UserRelatedToCR> urcrs = new ArrayList<UserRelatedToCR>();
		if((SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){
			List<ContactRequest> lists = crDao.getContactRequests(userid);
			UserRelatedToCR urcr;
			for(ContactRequest cr : lists){
				User  user = userDao.getUserById(cr.getUserId());
				urcr = new UserRelatedToCR();
				urcr.setUser(user);
				urcr.setCr(cr);
				urcrs.add(urcr);
			}
			return urcrs;
		} else {
			return null;
		}
	}
	
	/**
	 * @param token
	 * @param userid
	 * @param targetid
	 * @param status
	 * @return
	 */
	@GET
	@Path("/setContactRequestStatus/{token}/{userid}")
	@Produces({ MediaType.TEXT_PLAIN })
	public String setContactRequestStatus(@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("targetid") String targetid,
			@QueryParam("status") String status
			){
		if((SystemUtil.changeToken(token)).equals(userDao.getToken(userid))){

			if(crDao.changeStatus(targetid, userid, status)){
				if("1".equals(status)){
					contactDao.addContact(userid, targetid);
					contactDao.addContact(targetid, userid);
				}
				return "true";
			} else {
				return "false";
			}
		} else {
			return "false";
		}
	}
}
