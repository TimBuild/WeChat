package com.wechat.tool;

import java.util.ResourceBundle;

public class ReadProperties {
	
	/**
	 * a static function use to read the statement by file name and key
	 * 
	 * @param sourceName
	 *            file's name
	 * @param key
	 *            statement key
	 * @return
	 */
	public static String read(String sourceName, String key) {
		try {
			return ResourceBundle.getBundle(
					"com.wechat.properties." + sourceName).getString(key);
		} catch (Exception e) {
			return null;
		}
	}
}
