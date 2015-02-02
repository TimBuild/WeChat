package com.wechat.service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
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
}
