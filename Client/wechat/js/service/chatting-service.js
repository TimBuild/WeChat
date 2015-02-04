weChatApp.service('chatting-service', ['$http',"appInfo", function ($http,appInfo) {

    var messages = [];

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

    var getAllMsg = function(){
        return messages;
    }

    var addMsg = function (msg) {
        messages.push(msg);
    }

    var sendMsg = function (targetId,message) {

        //or use RongIMClient.TextMessage.obtain method. see the document
        var msg = RongIMClient.TextMessage.obtain(message);
        var content = new RongIMClient.MessageContent(msg);
        var conversationtype = RongIMClient.ConversationType.PRIVATE; // private chat
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, content, null, {
            // message send success
            onSuccess: function () {
                console.log("Send successfully " + msg.getContent());
            },
            onError: function (errorCode) {
                console.log("∑¢ÀÕ ß∞‹" + errorCode.getValue(), errorCode.getMessage());
            }
        });
    }

    return {
        getAllMsg:getAllMsg,
        sendMsg: sendMsg,
        addMsg:addMsg
    }

}]);