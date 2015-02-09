weChatApp.service('chat-list-service', ['$http', "appInfo", "userInfo", function ($http, appInfo, userInfo) {


    var chats = [{ "icon": "", "userid": "12", "username": "aaa", "content":"hahahha" },
        { "icon": "", "userid": "13", "username": "55", "content": "hahahha2" },
        { "icon": "", "userid": "14", "username": "66", "content": "hahahha3" }];

    var getChats = function () {
        return chats;
     }

    return {
        getChats: getChats
    }

}]);