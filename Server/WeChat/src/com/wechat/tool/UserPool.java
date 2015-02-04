package com.wechat.tool;

import java.util.HashMap;
import java.util.Map;

public class UserPool {
	public static Map<String, String> tokens = new HashMap<String, String>();
	
	public static boolean isTokenExist(String token){
		return tokens.containsValue(token);
	}
	
	public static void addToken(String id, String token){
		if(tokens.containsKey(id)){
			tokens.remove(id);
		}
		tokens.put(id, token);
	}
	
	public static void deleteToken(String id){
		tokens.remove(id);
	}
	
	public static String getToken(String id){
		return tokens.get(id);
	}
}
