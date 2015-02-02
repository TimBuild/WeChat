package com.wechat.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/UserService")
public class UserService {
	
	@GET
	@Path("/login")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String login(@QueryParam("userId")String userId, @QueryParam("psw")String password) {
		String token = "";
		return token;
	}
	
	@GET
	@Path("/register")
	@Produces(value = MediaType.TEXT_PLAIN)
	public String register(@QueryParam("")String username, @QueryParam("")String password){
		return "false";
	}
	
	@POST
	@Path("/upload")
	@Consumes({ MediaType.MULTIPART_FORM_DATA, MediaType.APPLICATION_JSON })
	@Produces(value = MediaType.TEXT_PLAIN)
	public String uploadHeadImg(@QueryParam("userId")String userId, 
			@Context HttpServletRequest request, 
			@Context HttpServletResponse response){
		response.setContentType("text/html;charset=UTF-8");
		return "";
	}

}
