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
import com.wechat.tool.SystemUtil;

@Path("/UserService")
public class UserService {

	private UserDaoImpl userDaoImpl = new UserDaoImpl();
	
	@GET
	@Path("/login")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String login(@QueryParam("userId") String userId,
			@QueryParam("psw") String password) {
		String token = "";
		return token;
	}

	@GET
	@Path("/register")
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
