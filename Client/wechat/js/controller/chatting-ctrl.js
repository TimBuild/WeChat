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
    chattingService.createLogDir("wechat/"+userInfo.userId+"/"+$scope.contact.targetId);
    
    $scope.messages = chattingService.getAllMsg($scope.contact.targetId);
//    $scope.messages = [];
    
    $timeout(function(){
    	chattingService.getLog(userInfo.userId, $scope.contact.targetId , new Date()).then(function(response){
    		console.log("获取log成功");
    		$timeout(function(){
        		myScroll.refresh();
        	},500);
    	});
    },500);
    
    $scope.$watch("messages", function(newValue, oldValue){
    	
    	
    	console.log("watch log");
    });
    var textarea = document.getElementById("msg-txt");
    textarea.addEventListener("input", inputListener, false);
    function inputListener() {
        var height = textarea.style.height;

        if (height.substr(0, height.length-2) < 80) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
    
    $scope.send = function () {
        var msg = Message.newMsg(userInfo.userId, $scope.contact.targetId, $scope.msgContent);
        chattingService.addMsg($scope.contact,msg);
        myScroll.refresh();
    }

    $scope.back=function(){
    	chattingService.createLog($scope.contact.targetId);
        $state.go('main.chat-list');
    }
    var loopMsg = function(){
    	chattingService.loopMsg($scope.contact.targetId);
    }
    
    var loopInterval = setInterval(loopMsg(),1000);
    
    var insertTestMsg = function(){
    	var msg1 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "aaaaaaaaaa");
        chattingService.addMsg($scope.contact,msg1);
        var msg2 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "bbbbbbbbbb");
        chattingService.addMsg($scope.contact,msg2);
        var msg3 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "ccccccccccc");
        chattingService.addMsg($scope.contact,msg3);
    }
    
//    insertTestMsg();
    
}]);