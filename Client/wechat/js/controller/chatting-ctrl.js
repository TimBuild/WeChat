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

    $scope.messages = chattingService.getAllMsg($scope.contact.targetId);
    
    chattingService.createLogDir("wechat/"+userInfo.userId+"/"+$scope.contact.targetId);
    
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
        var msg = Message.newMsg(userInfo.userId, $scope.contact.targetId, $scope.msgContent);
//        chattingService.sendMsg(msg);
        chattingService.addMsg($scope.contact,msg);
    }

    $scope.back=function(){
    	
        $state.go('main.chat-list');
    }
    
    
    var insertTestMsg = function(){
    	var msg1 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "aaaaaaaaaa");
        chattingService.addMsg($scope.contact,msg1);
        var msg2 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "bbbbbbbbbb");
        chattingService.addMsg($scope.contact,msg2);
        var msg3 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "ccccccccccc");
        chattingService.addMsg($scope.contact,msg3);
        
        chattingService.createLog($scope.contact.targetId);
        
    }
    
    insertTestMsg();
    
}]);