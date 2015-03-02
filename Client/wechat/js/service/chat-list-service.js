weChatApp.service('chat-list-service', ['$http', "userInfo","file-service","appInfo","$q",
                            function ($http,userInfo,fileService,appInfo,$q) {


//    var chats = [{ "icon": "", "userid": "12", "username": "aaa", "content":"hahahha" },
//        { "icon": "", "userid": "13", "username": "55", "content": "hahahha2" },
//        { "icon": "", "userid": "14", "username": "66", "content": "hahahha3" }];
//
//    var getChats = function () {
//        return chats;
//     }
    
    var getHistory = function(){
    	fileService.getData(userInfo.userId).then(function(response) {
    		var len = response.rows.length;
			for (i = 0; i < len; i++){ 
				var history = {};
				history.icon = response.rows.item(i).icon;
				history.username = response.rows.item(i).userName;
				history.userid = response.rows.item(i).userId;
				history.content = response.rows.item(i).content;
				chats.push(history);
		         
		    } 
    	});
    }

  ///queryUserById/{token}/{userid}"
	var getUserDetail = function(){
		var tempToken = appInfo.token.replace(/\//g, "__");
		var deferred = $q.defer();
		$http.get(appInfo.basicUrl + "queryUserById/" + tempToken + "/"
						+ userInfo.userId+"?id="+userInfo.userId).success(function(response) {
			console.log("get user detail success" + response);
			deferred.resolve(response);
		}).error(function(response) {
			console.log("get user detail " + response);
			 deferred.reject("error");  
		});
		return deferred.promise;
	}
	
	var getMsgCount = function(){
		var tempToken = appInfo.token.replace(/\//g, "__");
		var deferred = $q.defer();
		$http.get(appInfo.basicUrl + "getMessageCount/" + tempToken + "/"
						+ userInfo.userId).success(function(response) {
			console.log("get message count" + response);
			deferred.resolve(response);
		}).error(function(response) {
			console.log("get user detail " + response);
			 deferred.reject("error");  
		});
		return deferred.promise;
	}
    return {
    	getUserDetail:getUserDetail,
//        getChats: getChats,
        getHistory:getHistory,
        getMsgCount:getMsgCount
    }

}]);