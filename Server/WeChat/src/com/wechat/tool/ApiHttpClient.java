package com.wechat.tool;

import java.net.HttpURLConnection;
import java.net.URLEncoder;

import com.wechat.util.FormatType;
import com.wechat.util.HttpUtil;

public class ApiHttpClient {

	private static final String RONGCLOUDURI = "https://api.cn.rong.io";
	
	private static final String UTF8 = "UTF-8";

	/**
	 * 
	 * @param appKey
	 * @param appSecret
	 * @param userId
	 * @param userName
	 * @param portraitUri
	 * @param type	json or xml
	 * @return
	 * @throws Exception
	 */
	public static String getToken(String appKey, String appSecret,
			String userId, String userName, String portraitUri, String type) throws Exception {

		HttpURLConnection conn = HttpUtil
				.CreatePostHttpConnection(appKey, appSecret, RONGCLOUDURI
						+ "/user/getToken." + type);

		StringBuilder sb = new StringBuilder();
		sb.append("userId=").append(URLEncoder.encode(userId, UTF8));
		sb.append("&name=").append(URLEncoder.encode(userName, UTF8));
		sb.append("&portraitUri=").append(URLEncoder.encode(portraitUri, UTF8));
		HttpUtil.setBodyParameter(sb, conn);

		return HttpUtil.returnResult(conn);
	}

}
