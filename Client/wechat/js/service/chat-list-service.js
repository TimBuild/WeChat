weChatApp.service('chat-list-service', ['$http', "userInfo","file-service", function ($http,userInfo,fileService) {


    var chats = [{ "icon": "", "userid": "12", "username": "aaa", "content":"hahahha" },
        { "icon": "", "userid": "13", "username": "55", "content": "hahahha2" },
        { "icon": "", "userid": "14", "username": "66", "content": "hahahha3" }];

    var getChats = function () {
        return chats;
     }
    
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

    return {
        getChats: getChats,
        getHistory:getHistory
    }

}]);