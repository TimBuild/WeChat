package com.wechat.tool;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;


public class SystemUtil {
	public static int generateUserId(){
		return (int) (89999999*Math.random() + 10000000);
	}
	
	public static String uploadIcon(String userId, HttpServletRequest request){
		String path = null;
		try {
			request.setCharacterEncoding("utf-8");
			String saveFileName = null;
			// 判断本次表单是否是一个multipart表单
			boolean isMultipart = ServletFileUpload.isMultipartContent(request);
			if (isMultipart) {
				// 文件保存路径
				String savePath = request.getSession().getServletContext()
						.getRealPath("/")
						+ "upload/";
				
				// 文件上传缓冲区
				String tempPath = request.getSession().getServletContext()
						.getRealPath("/")
						+ "upload/temp/";
				File saveFile = new File(savePath);
				File tempFile = new File(tempPath);
				System.out.println(savePath);
				System.out.println(tempPath);
				// 不存在以上路径则创建
				// isDirectory()是一个目录吗？
				if (!saveFile.isDirectory())
					saveFile.mkdirs();
				if (!tempFile.isDirectory())
					tempFile.mkdirs();
				// 获取工厂对象
				DiskFileItemFactory factory = new DiskFileItemFactory();
				// 设置缓冲区大小,单位字节
				factory.setSizeThreshold(1024 * 4);
				// 设置缓冲区位置
				factory.setRepository(tempFile);
				// 产生servlet上传对象
				ServletFileUpload uploader = new ServletFileUpload(factory);
				// 设置上传文件的最大大小，位置字节
				uploader.setSizeMax(4 * 1024 * 1024);
				// 获取表单项

				List<FileItem> fileItems = uploader.parseRequest(request);
				for (FileItem item : fileItems) {
					// 判断表单项是普通字段还是上传项
					if (!item.isFormField()) {
						// 上传项目
						String fileName = item.getName();
						String fix = fileName.substring(fileName.lastIndexOf(".") + 1);
						fileName = userId + "." + fix;
						saveFileName = "/upload/" + fileName;
						// 构建文件对象的路径
						File file = new File(savePath + fileName);
						item.write(file);
						path = savePath + fileName;
					} 
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return path;
	}
	
	public static String changePath(String path, HttpServletRequest request){
		String ip = request.getLocalAddr().toString();
		String port = String.valueOf(request.getLocalPort());
		return "http://" + ip + ":" + port + "/" + path.substring(path.lastIndexOf("WeChat"));
	}
}
