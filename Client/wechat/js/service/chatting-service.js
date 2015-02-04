
weChatApp.service('chatting-service', ['$http', function ($http) {
    //init rongyu
    RongIMClient.init(appInfo.appKey);

    // connect to rongyun server
    RongIMClient.connect(token, {
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
            // status:RongIMClient.ConnectionStatusListener.ConnectionStatus 对象
            console.log("status " + status.getValue(), status.getMessage());
        }
    });

    // message listener
    RongIMClient.getInstance().setOnReceiveMessageListener({
        // message receiver
        onReceived: function (message) {
            // message:RongIMClient.RongIMMessage 子类
            // process data       
            console.log(message.getSenderUserId() + ":" +message.getContent());
        }

    });

    var messageSend = function (message) {
        //define message type, text message should user RongIMClient.TextMessage 
        var msg = new RongIMClient.TextMessage();
        // set message content
        msg.setContent(message);
        //or use RongIMClient.TextMessage.obtain method. see the document
        var msg = RongIMClient.TextMessage.obtain(message);
        var content = new RongIMClient.MessageContent(msg);
        var conversationtype = RongIMClient.ConversationType.PRIVATE; // personal chat
        var targetId = "1234567"; // target id Id
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, content, null, {
            // 发送消息成功
            onSuccess: function () {

                chat.innerHTML = chat.innerHTML + "<br/>"
             + "123456" + ":" + msg.getContent();
                console.log("Send successfully");
            },
            onError: function (errorCode) {
                console.log("发送失败" + errorCode.getValue(), errorCode.getMessage());
            }
        }
               );
    }

}]);