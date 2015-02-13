weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", 
                                       "$location", "chatting-service", "userInfo","$state",
                                       function ($scope, $timeout, $stateParams,
                                    		   $location, chattingService,userInfo,$state) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false,
        snap: true
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
    
    $scope.isBack = false;
    $scope.messages = chattingService.getAllMsg($scope.contact.targetId);
    
    $timeout(function(){
    	chattingService.getLog(userInfo.userId, $scope.contact.targetId , new Date()).then(function(response){
    		console.log("获取log成功");
    		$timeout(function(){
        		myScroll.refresh();
        	},500);
    		
    	});
    },500);
    
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
        myScroll.goToPage(0, $scope.messages.length, 100);
        $scope.msgContent="";
    }

    $scope.back=function(){
    	$scope.isBack = true;
    	chattingService.createLog($scope.contact.targetId);
        $state.go('main.chat-list');
    }
    var loopMsg = function(){
    	chattingService.loopMsg($scope.contact.targetId).then(function(response){
    		if (response == undefined) {
    			return ;
    		}
    		if (JSON.stringify(response).indexOf('[')>0 && JSON.stringify(response).indexOf(']')>0) {
    			for (var i = 0; i < response; i++) {
    				$scope.messages.push(response[i]);
    			}
    		} else {
				$scope.messages.push(response);
    		}
    		$timeout(function(){
	    		myScroll.refresh();
	    		myScroll.goToPage(0, $scope.messages.length, 100);
	    		chattingService.changeHistory($scope.contact,$scope.messages[$scope.messages.length-1]);//change chat history
	    	},200);
    		console.log("获得msg " + JSON.stringify($scope.messages));
    	});
    }
    
//    $scope.$watch("messages", function(newValue, oldValue){
//    	$timeout(function(){
//    		myScroll.refresh();
//    	},500);
//    });
    
//    var loopInterval = setInterval(loopMsg(),1000);
    
    var loopInteraval = function(){
    	if ($scope.isBack == false) {
    		loopMsg();
    		$timeout(function(){
        		loopInteraval();
        	},1000);
    	}
    	
    }
    
    loopInteraval();
    
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