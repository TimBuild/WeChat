weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", "$location", "chatting-service", "userInfo",
    function ($scope, $timeout, $stateParams, $location, chattingService,userInfo) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false
    });

    $scope.isCurrentUser = function (msg) {
        return userInfo.userId == msg.userId;
    }

    $scope.messages = chattingService.getAllMsg();
    /*var msg1 = Message.newMsg("123456", "1234567", "hahahha");
    var msg2 = Message.newMsg("1234567", "1234566", "ȥ���");

    chattingService.addMsg(msg1);
    chattingService.addMsg(msg2);*/

    $scope.targetIcon = $stateParams.icon;
    $scope.targetId = $stateParams.userId;
    $scope.targetName = $stateParams.name;

    $scope.icon = userInfo.icon;

    var textarea = document.getElementById("msg-txt");
    textarea.addEventListener("input", inputListener, false);
    function inputListener() {
        var height = textarea.style.height;
        console.log("height " + height.substr(0, height.length - 2));

        if (height.substr(0, height.length-2) < 80) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }

    $scope.send = function () {
        var msg = Message.newMsg("123456", "1234567", $scope.msgContent);
        chattingService.sendMsg(msg);
        chattingService.addMsg(msg);
    }

    $scope.back=function(){
        $state.go('main.chat-list');
    }
}]);