package com.wechat.tool;


public class SystemUtil {
	public static int generateUserId(){
		return (int) (89999999*Math.random() + 10000000);
	}
}
