package com.wechat.service;

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

import com.wechat.dao.impl.UserDaoImpl;
import com.wechat.entity.User;
import com.wechat.tool.ApiHttpClient;
import com.wechat.tool.ReadProperties;
import com.wechat.tool.SdkHttpResult;
import com.wechat.tool.SystemUtil;
import com.wechat.util.FormatType;

@Path("/UserService")
public class UserService {

	private UserDaoImpl userDaoImpl = new UserDaoImpl();
	
	@GET
	@Path("/login")
	@Consumes(value = MediaType.TEXT_PLAIN)
	@Produces(value = MediaType.TEXT_PLAIN)
	public String login(@QueryParam("userId") String userId,
			@QueryParam("psw") String password) {
		
		String token = "";
		User user = userDaoImpl.getUser(userId, password);
		if(user != null){
			SdkHttpResult result = null;
			try {
				result = ApiHttpClient.getToken(
						ReadProperties.read("configure", "appkey"), 
						ReadProperties.read("configure", "appsecret"),
						user.getUserId(),
						user.getUsername(),
						"http://aa.com/a.png", 
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
	@Consumes(value = MediaType.TEXT_PLAIN)
	@Produces(value = MediaType.TEXT_PLAIN)
	public String register(@QueryParam("username") String username,
			@QueryParam("psw") String password) {
		return "false";
	}

	@POST
	@Path("/uploadIcon/{userId}")
	@Consumes({ MediaType.MULTIPART_FORM_DATA })
	@Produces(value = MediaType.TEXT_PLAIN)
	public String uploadIcon(@PathParam("userId") String userId, @Context HttpServletRequest request, @Context HttpServletResponse response) {
		
		String path = SystemUtil.uploadIcon(userId, request);
		String changePath = SystemUtil.changePath(path);
		if(path != null){
			if(userDaoImpl.modifyUserIcon(userId, changePath)){
				return "true";
			} else {
				return "false";
			}
		} else {
			return "false";
		}
	}

}
