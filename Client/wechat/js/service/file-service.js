weChatApp.service('file-service', [
		'$http',
		"appInfo",
		"userInfo",
		'$q',
		function($http, appInfo, userInfo, $q) {

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
						+ "_" + date.getDate();
				var logPath = fileDirectory + "/" + targetId + "/" + fileName
						+ ".txt";
				console.log("create log " + logPath);
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
					fileSystem.root.getFile(logPath, {
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
			var getLog = function(path) {//userId, targetId, date
//				var fileName = date.getFullYear() + "_" + (date.getMonth() + 1)
//						+ "_" + date.getDate() + ".txt";
//				var logPath = fileDirectory + "/" + targetId + "/" + fileName;
				console.log("get log path " + path);
				var deferred = $q.defer();

				var gotFileEntry = function(fileEntry) {
					fileEntry.file(function(file) {
						var reader = new FileReader();
						reader.onloadend = function(evt) {
							deferred.resolve(evt.target.result);
						};
						reader.readAsText(file);
					}, function() {
						console.log("文件读取失败");
					});
				}

				var onFSWin = function(fileSystem) {
					fileSystem.root.getFile(path, null, gotFileEntry,
							function() {
								console.log("文件获取失败");
							});
				}

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
				return deferred.promise;
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

				var deferred = $q.defer();

				var gotFileEntry = function(fileEntry) {
					fileEntry.file(function(file) {
						var reader = new FileReader();
						reader.onloadend = function(evt) {
							console.log("读取文本");
							console.log(evt.target.result);
							deferred.resolve(evt.target.result);
						};
						reader.readAsText(file);
					}, function() {
						console.log("文件读取失败");
					});
				}

				var onFSWin = function(fileSystem) {
					fileSystem.root.getFile(contactFilePath, null,
							gotFileEntry, function() {
								console.log("文件获取失败");
							});
				}

				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, function() {
							console.log("fs fail ");
						});
				return deferred.promise;
			}

			var weChatDB = {
				"name" : "wechat",
				"version" : 1,
				"db" : null
			}
			/**
			 * open db and create data store with the name of userId
			 */
			var openDB = function(userId) {
				var dbShell = window.openDatabase(weChatDB.name,
						weChatDB.version, weChatDB.name, 10 * 1000);
				weChatDB.db = dbShell;

				function populateDB(tx) {
					var sql = "create table if not exists tb_" + userId
							+ " (userId unique, userName, icon, content)";
					console.log("创建表 " + sql);
					tx.executeSql(sql);

				}
				function errorCB(e) {
					console.log("创建表失败" + e.code);
				}

				function successCB() {
					console.log("创建表成功");
				}

				weChatDB.db.transaction(populateDB, errorCB, successCB);
			}

			/**
			 * add data， first check if data exist if exist then update else
			 * insert
			 */
			var addData = function(userId, history) {
				function populateDB(tx) {
					var sql = "select * from tb_" + userId + " where userId='"
							+ history.userId + "'";
					var sqlInsert = "insert into tb_" + userId
							+ " (userId, userName, icon, content) values('"
							+ history.userId + "','" + history.userName + "','"
							+ history.icon + "','" + history.content + "')";

					var sqlUpdate = "update tb_" + userId + " set content='"
							+ history.content + "' where userId='"
							+ history.userId + "'";

					tx.executeSql(sql, [], function(tx, result) {
						var len = result.rows.length;
						console.log("result " + len);
						if (len == 0) {
							console.log("插入 " + sqlInsert);
							tx.executeSql(sqlInsert);
						} else {
							console.log("修改 " + sqlUpdate);
							tx.executeSql(sqlUpdate);
						}
					}, null);
				}

				function errorCB(e) {
					console.log("添加history失败" + e);
				}

				function successCB() {
					console.log("添加history成功");
				}
				weChatDB.db.transaction(populateDB, errorCB, successCB);
			}

			/**
			 * get all chat history by userId
			 */
			var getData = function(userId) {
				var deferred = $q.defer();

				function populateDB(tx) {
					var chats = [];
					tx.executeSql("select * from tb_" + userId, [], function(
							tx, result) {
						var len = result.rows.length;
						deferred.resolve(result);
					}, null);
				}

				function errorCB(e) {
					console.log("查询失败" + e);
				}
				function successCB() {
					console.log("查询成功");
				}
				weChatDB.db.transaction(populateDB, errorCB, successCB);
				return deferred.promise;
			}

			/**
			 * clear data store values
			 */
			var clearTb = function(userId) {
				function populateDB(tx) {
					tx.executeSql("delete from tb_" + userId);
				}

				function errorCB(e) {
					console.log("删除失败" + e);
				}
				function successCB() {
					console.log("删除成功");
				}
				weChatDB.db.transaction(populateDB, errorCB, successCB);
			}

			var getFiles = function(path) {
				var deferred = $q.defer();
				var onGetDirectoryWin = function(parent) {
					var directoryReader = parent.createReader();
					directoryReader.readEntries(function(entries) {
//						console.log("get files success");
						var files = [];
						for (i = 0; i < entries.length; i++) {
//							console.log(entries[i].fullPath);
							files.push(entries[i].fullPath);
						}
						deferred.resolve(files);
					}, function() {
						deferred.reject("error");
					});
				}

				var onGetDirectoryFail = function() {
					console.log("get files fail onGetDirectoryFail");
				}
				var onFSWin = function(fileSystem) {
					fileSystem.root.getDirectory(path, {
						create : true,
						exclusive : false
					}, onGetDirectoryWin, onGetDirectoryFail);
				}

				var onFSFail = function(evt) {
					console.log(evt.target.error.code);
				}
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
						onFSWin, onFSFail);
				return deferred.promise;
			}
			return {
				createRootDir : createRootDir,
				saveContact : saveContact,
				createLog : createLog,
				getLog : getLog,
				getContactFromLocal : getContactFromLocal,
				clearTb : clearTb,
				addData : addData,
				getData : getData,
				openDB : openDB,
				weChatDB : weChatDB,
				createSubDir : createSubDir,
				getFiles : getFiles
			}

		} ]);