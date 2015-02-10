weChatApp.service('file-service', ['$http',"appInfo","userInfo",
		function($http, appInfo, userInfo) {
	
			var rootDir = "wechat";
			var fileDirectory = "wechat/" + userInfo.userId;
			var contactFilePath = fileDirectory + "/contacts.txt";

			var createRootDir = function(userId) {
				var onFSWin = function(fileSystem) {
					console.log("filedirectory " + rootDir);
					// 创建目录
					fileSystem.root.getDirectory(rootDir, {
						create : true
					}, function(fileEntry) {
						console.log("创建root目录成功");
						createSubDir(fileDirectory);
					}, function() {
						console.log("创建root目录失败");
					});
				}
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
			}
			
			// create sub dir
			var createSubDir = function(subDir) {
				var onFSWin = function(fileSystem) {

					fileSystem.root.getDirectory(subDir, {
						create : true
					}, function(fileEntry) {
						console.log("创建sub目录成功");
					}, function() {
						console.log("创建sub目录失败");
					});
				}
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
			}

			// 保存联系人
			var saveContact = function(userId, content) {

				var onGetFileWin = function(fileEntry) {
					fileEntry.createWriter(function(writer) {
						writer.onwrite = function() {
							console.log("保存成功");
						}
						writer.write(content);
					}, function() {
						console.log("保存失败");
					});
				}

				var onGetFileFail = function() {
					console.log("onGetFileFail ");
				}
				var onFSWin = function(fileSystem) {
					// 创建文件
					fileSystem.root.getFile(contactFilePath, {
						create : true,
						exclusive : false
					}, onGetFileWin, onGetFileFail);
				}

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
			}

			var createLog = function(targetId, content) {

				var date = new Date();
				var fileName = date.getFullYear() + "_" + (date.getMonth() + 1)
						+ "_" + date.getDay();
				var logPath = fileDirectory + "/" + targetId + "/"
						+ fileName;

				var onGetFileWin = function(fileEntry) {
					fileEntry.createWriter(function(writer) {
						writer.onwrite = function() {
							console.log("日志保存成功");
						}
						writer.write(content);
					}, function() {
						console.log("保存失败");
					});
				}

				var onGetFileFail = function() {
					console.log("onGetFileFail ");
				}
				var onFSWin = function(fileSystem) {
					fileSystem.root.getFile(filePath, {
						create : true,
						exclusive : false
					}, onGetFileWin, onGetFileFail);
				}

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
			}

			var getLog = function(userId, targetId, date) {
				var fileName = date.getFullYear() + "_" + (date.getMonth() + 1)
						+ "_" + date.getDay();
				var logPath = fileDirectory + "/" + targetId + "/"
						+ fileName;

				var gotFileEntry = function(fileEntry){
					fileEntry.file(function(file){
						readAsText(file);
					}, function(){
						console.log("文件读取失败");
					});
				}

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						gotFileEntry, function() {
							console.log("fs fail ");
					});
			}

			var readAsText = function(file) {
		        var reader = new FileReader();
		        reader.onloadend = function(evt) {
		            console.log("读取文本");
		            console.log(evt.target.result);
		        };
		        reader.readAsText(file);
		    }
			
			var getContactFromLocal = function() {
				
				var gotFileEntry = function(fileEntry){
					fileEntry.file(function(file){
						readAsText(file);
					}, function(){
						console.log("文件读取失败");
					});
				}
				
				var onFSWin = function(fileSystem){
					fileSystem.root.getFile(contactFilePath, null, gotFileEntry, function(){
						console.log("文件获取失败");
					});
				}
				
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
			}

			return {
				createRootDir : createRootDir,
				saveContact : saveContact,
				createLog : createLog,
				getLog : getLog,
				getContactFromLocal:getContactFromLocal
			}

		} ]);