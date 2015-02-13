var Message = {
    newMsg: function (userId, targetId, content) {
        var msg = {};
        msg.userId = userId;
        msg.targetId = targetId;
        msg.content = content;
        msg.date = new Date().getTime();
        return msg;
    }
}