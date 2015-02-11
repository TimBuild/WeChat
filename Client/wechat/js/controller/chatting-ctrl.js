weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", 
                                       "$location", "chatting-service", "userInfo","$state",
                                       function ($scope, $timeout, $stateParams,
                                    		   $location, chattingService,userInfo,$state) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false
    });

    $scope.isCurrentUser = function (msg) {
        return userInfo.userId == msg.userId;
    }
    $scope.contact = {};
    $scope.contact.targetIcon = $stateParams.icon;
    $scope.contact.targetId = $stateParams.userId;
    $scope.contact.targetName = $stateParams.name;
    $scope.userInfo = userInfo;
    console.log("targetId " + $scope.contact.targetName);

    $scope.messages = chattingService.getAllMsg($scope.targetId);
    /*var msg1 = Message.newMsg("123456", "1234567", "hahahha");
    var msg2 = Message.newMsg("1234567", "1234566", "ȥ���");

    chattingService.addMsg(msg1);
    chattingService.addMsg(msg2);*/

   

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
        var msg = Message.newMsg(userInfo.userId, $scope.targetId, $scope.msgContent);
        chattingService.sendMsg(msg);
        chattingService.addMsg($scope.contact,msg);
    }

    $scope.back=function(){
        $state.go('main.chat-list');
    }
}]);