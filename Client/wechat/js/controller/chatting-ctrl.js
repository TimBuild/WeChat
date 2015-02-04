weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", "$location", "chattingService","userInfo",
    function ($scope, $timeout, $stateParams, $location, chattingService,userInfo) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false
    });

    $scope.isCurrentUser = function (msg) {
        return userInfo.userId == msg.userId;
    }

    console.log("chattingService " + chattingService);

    $scope.messages = chattingService.getAllMsg();
    var msg1 = Message.newMsg("123456", "1234567", "hahahha");
    var msg2 = Message.newMsg("1234567", "1234566", "È¥ÄãµÄ");

    chattingService.addMsg(msg1);
    chattingService.addMsg(msg2);
}]);