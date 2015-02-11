weChatApp.service('chatting-service', ['$http',"appInfo","file-service","userInfo", function ($http,appInfo, fileService,userInfo) {

    var messages = {};

    //init rongyu
    RongIMClient.init(appInfo.appKey);

    // connect to rongyun server
    RongIMClient.connect(appInfo.token, {
        onSuccess: function (userId) {
            // connect success
            console.log("Login successfully." + userId);
        },
        onError: function (errorCode) {
            // connect error
            console.log("Login failed." + errorCode.getValue(), "error message: " + errorCode.getMessage());
        }
    });

    // listen connection status
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            // status:RongIMClient.ConnectionStatusListener.ConnectionStatus object
            console.log("status " + status.getValue(), status.getMessage());
        }
    });

    // message listener
    RongIMClient.getInstance().setOnReceiveMessageListener({
        // message receiver
        onReceived: function (message) {
            // message:RongIMClient.RongIMMessage sub class
            // process data       
            console.log(message.getSenderUserId() + ":" +message.getContent());
            
        }
    });

    var getAllMsg = function (id) {
        if (messages[id] == undefined) {
            messages[id] = [];
        }
        console.log(messages[id] + id);
        return messages[id];
    }

    var addMsg = function (contact,msg) {
        console.log("msg  " + msg.targetId);
        messages[msg.targetId].push(msg);
        console.log(messages);
        
        var history = {};
        history.userId = contact.targetId;
        history.userName = contact.targetName;
        history.icon = contact.targetIcon;
        history.content = msg.content;
        fileService.addData(userInfo.userId, history);
    }

    var sendMsg = function (msgObj) {
    	console.log("content " + msgObj.content + "targetId " + msgObj.targetId);

        //use RongIMClient.TextMessage.obtainmethod.see document
        var msg = RongIMClient.TextMessage.obtain(msgObj.content);
        var content = new RongIMClient.MessageContent(msg);
        var conversationtype = RongIMClient.ConversationType.PRIVATE; // private chat
        var targetId = msgObj.targetId; // Ŀ�� Id

        RongIMClient.getInstance().sendMessage(conversationtype, targetId, content, null, {
            // message send success
            onSuccess: function () {
                console.log("success");
                
            },
            onError: function (errorCode) {
                console.log("����ʧ��" + errorCode.getValue(), errorCode.getMessage());
            }
        }
               );
    }

    return {
        getAllMsg:getAllMsg,
        sendMsg: sendMsg,
        addMsg:addMsg
    }

}]);