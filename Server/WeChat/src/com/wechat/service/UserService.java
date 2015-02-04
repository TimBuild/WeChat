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

import com.wechat.dao.ContactDao;
import com.wechat.dao.UserDao;
import com.wechat.dao.impl.ContactDaoImpl;
import com.wechat.dao.impl.UserDaoImpl;
import com.wechat.entity.Contact;
import com.wechat.entity.User;
import com.wechat.tool.ApiHttpClient;
import com.wechat.tool.ReadProperties;
import com.wechat.tool.SdkHttpResult;
import com.wechat.tool.SystemUtil;
import com.wechat.tool.UserPool;
import com.wechat.util.FormatType;

@Path("/UserService")
public class UserService {

	private UserDao userDao = new UserDaoImpl();
	private ContactDao contactDao = new ContactDaoImpl();
	
	@GET
	@Path("/login")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String login(@QueryParam("userId") String userId,
			@QueryParam("psw") String password) {
		
		String token = "";
		User user = userDao.checkUser(userId, password);
		if(user != null){
			SdkHttpResult result = null;
			try {
				result = ApiHttpClient.getToken(
						ReadProperties.read("configure", "appkey"), 
						ReadProperties.read("configure", "appsecret"),
						user.getUserId(),
						user.getUsername(),
						"null",
						FormatType.json);
			} catch (Exception e) {
				e.printStackTrace();
			}
			System.out.println("gettoken=" + result);
			
		}
		return token;
	}

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
		
		if(userDao.addUser(userId, username, password)){
			return userId;
		} else {
			return "";
		}
	}

	@POST
	@Path("/uploadIcon/{token}/{userId}")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	@Produces(value = MediaType.TEXT_PLAIN)
	public String uploadIcon(
			@PathParam("token") String token,
			@PathParam("userId") String userId, 
			@Context HttpServletRequest request, 
			@Context HttpServletResponse response) {
		
		if(UserPool.isTokenExist(token)){
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
	 * 通过 userId 得到该用户的所有联系人
	 * @param token
	 * @param userId
	 * @return
	 */
	@GET
	@Path("/getContacts/{token}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> getContacts(
			@PathParam("token") String token,
			@QueryParam("userId") String userId){
		if(UserPool.isTokenExist(token)){
			List<User> list = contactDao.getContacts(userId);
			return list;
		} else {
			return null;
		}
	}
	
	/**
	 * 通过 userId 添加联系人
	 * @param token
	 * @param userId
	 * @param contactId
	 * @return
	 */
	@GET
	@Path("/addContact/{token}")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String addContact(
			@PathParam("token") String token,
			@QueryParam("userId") String userId,
			@QueryParam("contactId") String contactId){
		
		if( UserPool.isTokenExist(token)){
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
	 * 通过 userId 查询
	 * @param token
	 * @param userId
	 * @return 
	 */
	@GET
	@Path("/queryUserById/{token}")
	@Produces({ MediaType.APPLICATION_JSON })
	public User queryUserById(
			@PathParam("token") String token,
			@QueryParam("userId") String userId){
		if(UserPool.isTokenExist(token)){
			User user = userDao.getUserById(userId);
			return user;
		} else {
			return null;
		}
	}
	
	/**
	 * 通过 username 模糊查询
	 * @param token
	 * @param username
	 * @return 
	 */
	@GET
	@Path("/queryUserByName/{token}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<User> queryUserByName(
			@PathParam("token") String token,
			@QueryParam("username") String username){
		if(UserPool.isTokenExist(token)){
			List<User> list = userDao.getUsersByName(username);
			return list;
		} else {
			return null;
		}
	}
}
