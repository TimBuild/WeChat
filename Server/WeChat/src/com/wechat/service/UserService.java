package com.wechat.service;

import java.util.List;

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

import org.codehaus.jettison.json.JSONObject;

import com.wechat.dao.ContactDao;
import com.wechat.dao.UserDao;
import com.wechat.dao.impl.ContactDaoImpl;
import com.wechat.dao.impl.UserDaoImpl;
import com.wechat.entity.Contact;
import com.wechat.entity.User;
import com.wechat.tool.ApiHttpClient;
import com.wechat.tool.ReadProperties;
import com.wechat.tool.SystemUtil;

@Path("/UserService")
public class UserService {

	private UserDao userDao = new UserDaoImpl();
	private ContactDao contactDao = new ContactDaoImpl();
	
	/**
	 * user login
	 * @param userId
	 * @param password
	 * @return
	 */
	@GET
	@Path("/login")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String login(@QueryParam("userId") String userId,
			@QueryParam("psw") String password) {
		
		User user = userDao.checkUser(userId, password);
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
		String userId = "";
		do{
			userId = String.valueOf(SystemUtil.generateUserId());
		} while (userDao.checkIdUnique(userId));
		
		try {
			String token = ApiHttpClient.getToken(
							ReadProperties.read("configure", "appkey"), 
							ReadProperties.read("configure", "appsecret"),
							userId, username, "null", "json");
			
			JSONObject jsonObject = new JSONObject(token);
			token = (String) jsonObject.get("token");
			userDao.addUser(userId, username, password, token);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userId;
	}

	/**
	 * upload user header
	 * @param token
	 * @param userId
	 * @param request
	 * @param response
	 * @return
	 */
	@POST
	@Path("/uploadIcon/{token}/{userId}")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	@Produces(value = MediaType.TEXT_PLAIN)
	public String uploadIcon(
			@PathParam("token") String token,
			@PathParam("userId") String userId, 
			@Context HttpServletRequest request, 
			@Context HttpServletResponse response) {
		
		if(token.equals(userDao.getToken(userId))){
			String path = SystemUtil.uploadIcon(userId, request);
			String changePath = SystemUtil.changePath(path, request);
			if(path != null){
				if(userDao.modifyUserIcon(userId, changePath)){
					return "true";
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
	 * get contacts by userId
	 * @param token
	 * @param userId
	 * @return
	 */
	@GET
	@Path("/getContacts/{token}/{userId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> getContacts(
			@PathParam("token") String token,
			@PathParam("userId") String userId){
		if(token.equals(userDao.getToken(userId))){
			List<User> list = contactDao.getContacts(userId);
			return list;
		} else {
			return null;
		}
	}
	
	/**
	 * add user by userId
	 * @param token
	 * @param userId
	 * @param contactId
	 * @return
	 */
	@GET
	@Path("/addContact/{token}/{userId}")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String addContact(
			@PathParam("token") String token,
			@PathParam("userId") String userId,
			@QueryParam("contactId") String contactId){
		if(token.equals(userDao.getToken(userId))){
			if(!userDao.checkIdUnique(contactId)){
				return "no-user";
			} else {
				if(userId.equals(contactId)){
					return "can't-add-oneself";
				} else {
					Contact contact = contactDao.getContact(userId, contactId);
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
	}
	
	/**
	 * query user by id
	 * @param token
	 * @param userId
	 * @return 
	 */
	@GET
	@Path("/queryUserById/{token}/{userId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public User queryUserById(
			@PathParam("token") String token,
			@PathParam("userId") String userId,
			@QueryParam("id") String id){
		if(token.equals(userDao.getToken(userId))){
			User user = userDao.getUserById(userId);
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
	@Path("/queryUserByName/{token}/{userId}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> queryUserByName(
			@PathParam("token") String token,
			@PathParam("userId") String userId,
			@QueryParam("username") String username){
		if(token.equals(userDao.getToken(userId))){
			List<User> list = userDao.getUsersByName(username);
			return list;
		} else {
			return null;
		}
	}
	
	/**
	 * modify username or password
	 * @param token
	 * @param userId
	 * @param username
	 * @param password
	 * @return
	 */
	@GET
	@Path("/modifyUserNameOrPsw/{token}/{userId}")
	@Produces({ MediaType.TEXT_PLAIN })
	public String modifyUserNameOrPsw(
			@PathParam("token") String token,
			@PathParam("userId") String userId, 
			@QueryParam("username") String username,
			@QueryParam("psw") String password
			){
		if(token.equals(userDao.getToken(userId))){
			if(password == null || "".equals(password)){
				if(userDao.modifyUserName(userId, username)){
					return "true";
				} else {
					return "false";
				}
			} else {
				if(userDao.modifyUserPsw(userId, password)){
					return "true";
				} else {
					return "false";
				}
			}
		} else {
			return "false";
		}
	}
}
