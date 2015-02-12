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
		
		try {
			String token = ApiHttpClient.getToken(
							ReadProperties.read("configure", "appkey"), 
							ReadProperties.read("configure", "appsecret"),
							userid, username, "null", "json");
			
			JSONObject jsonObject = new JSONObject(token);
			token = (String) jsonObject.get("token");
			userDao.addUser(userid, username, password, token);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return userid;
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
	@GET
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
	}
	
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
			User user = userDao.getUserById(userid);
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
	
	@GET
	@Path("/addMessage/{token}/{userid}")
	@Produces({ MediaType.TEXT_PLAIN })
	public String addMessage(@PathParam("token") String token,
			@PathParam("userid") String userid,
			@QueryParam("targetid") String targetid,
			@QueryParam("content") String content
			){
		return "";
	}
}
