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
	public String userLogin(@QueryParam("userId")String userId, @QueryParam("psw")String password) {
		String token = "";
		return token;
	}

}
