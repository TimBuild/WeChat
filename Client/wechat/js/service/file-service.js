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
			
			/**
			 * create sub dir
			 */
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

			/**
			 * save contacts to local file
			 */
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

			/**
			 * create chat log by targetId and content
			 */
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

			/**
			 * get chat history by userId, targetId and date
			 */
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

			/**
			 * read file by the format of text
			 */
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
			
			var weChatDB = {
				"name":"wechat",
				"version":1,
				"db":null
			}
			/**
			 * open db and create data store with the name of userId
			 */
			var openDB = function(userId){
				var dbShell = window.openDatabase(weChatDB.name,weChatDB.version,weChatDB.name,10*1000);
				weChatDB.db = dbShell;
				
				function populateDB(tx) {
					tx.executeSql("create table if not exists " + userId+"(userId unique, userName, icon, content)");
					
				}
				function errorCB(){
					console.log("创建表失败");
				}
				
				function successCB(){
					console.log("创建表成功");
				}
				
				weChatDB.db.transaction(populateDB, errorCB, successCB);
			}
			
			/**
			 * add data， first check if
			 *  data exist if exist then update else insert
			 */
			var addData = function(db, userId, history){
				function populateDB(tx) {
					tx.executeSql("insert into " + userId +"(userId, userName, icon, content) values(?,?,?,?)",
							[history.userId, history.userName, history,icon, history.content]);
				}
				
				function errorCB(){
					console.log("添加history失败");
				}
				
				function successCB(){
					console.log("添加history成功");
				}
				weChatDB.db.transaction(populateDB, errorCB, successCB);
			}
			
			/**
			 * get all chat history by userId
			 */
			var getData = function(db, userId) {
				function populateDB(tx){
					tx.executeSql("select * from "+userId,[], function(tx,result){
						var len = result.rows.length;
						for (i = 0; i < len; i++){ 
					         console.log(results.rows.item(i).userName );  
					      } 
					},null);
				}
				weChatDB.db.transaction(populateDB, errorCB, successCB);
			}
			
			/**
			 * clear data store values
			 */
			var clearTb = function(db, storeName){
				 
			}
			
			var deleteDB = function(name){
				
			}

			return {
				createRootDir : createRootDir,
				saveContact : saveContact,
				createLog : createLog,
				getLog : getLog,
				getContactFromLocal:getContactFromLocal,
				clearStore:clearStore,
				addData:addData,
				getData:getData,
				openDB:openDB,
				weChatDB:weChatDB
			}

		} ]);