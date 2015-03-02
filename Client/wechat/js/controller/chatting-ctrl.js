weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", 
                                       "$location", "chatting-service", "userInfo","$state",
                                       function ($scope, $timeout, $stateParams,
                                    		   $location, chattingService,userInfo,$state) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false,
        snap: true
    });
    
    var loopInteraval = function(){
    	if ($scope.isBack == false) {
    		loopMsg();
    		$timeout(function(){
        		loopInteraval();
        	},1000);
    	}
    }
    
    $scope.isCurrentUser = function (msg) {
        return userInfo.userId == msg.userId;
    }
    
    $scope.contact = {};
    $scope.contact.targetIcon = localStorage.icon;
    $scope.contact.targetId = localStorage.userid;
    $scope.contact.targetName = localStorage.username;
    $scope.userInfo = userInfo;
    chattingService.createLogDir("wechat/"+userInfo.userId+"/"+$scope.contact.targetId);
    chattingService.getContactDetail($scope.contact.targetId).then(function(response){
    	if(response.username != undefined) {
    		$scope.contact.targetName = response.username;
    		$scope.contact.targetIcon = response.icon;
    	}
    });
    $scope.index = 0;
    
    $scope.isBack = false;
    $scope.messages = chattingService.getAllMsg($scope.contact.targetId);
    $scope.empty = true;
    var files = [];
    var getLogFiles = function(){
    	chattingService.getFiles($scope.contact.targetId).then(function(response){
    		files = response;
    		
    		if (files.length >0) {
    			$scope.index = files.length-1;
    			$scope.empty=false;
    		}
    	},function(response){
    		console.log("files error");
    	});
    }
    getLogFiles();

    var getLog = function(fileName){
		chattingService.getLog( $scope.contact.targetId,fileName).then(function(response){
    		$timeout(function(){
        		myScroll.refresh();
//        		loopInteraval();
        	},300);
    	});
    }
    
    $timeout(function(){//get log today
    	if (files.length != 0) {
    		var filePath = files[$scope.index].substring(1,files[$scope.index].length);
    		console.log("get log file path " + filePath);
    		var today = new Date();
    		if (filePath.indexOf(today.getFullYear()+"_"+(today.getMonth()+1)+"_"+today.getDate())>-1) {
        		getLog(filePath);
        		$scope.index --;
    		} 
    	}
    	loopInteraval();
    },300);
    
    $scope.getMore = function(){
    	if (files.length > 1 && $scope.index >=0) {
    		var filePath = files[$scope.index].substring(1,files[$scope.index].length);
        	getLog(filePath);
        	$scope.index --;
    	} else {
    		$scope.empty=true;
    	}
    	
    }
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
    	if ($scope.msgContent.trim()=="") {
    		return ;
    	}
        var msg = Message.newMsg(userInfo.userId, $scope.contact.targetId, $scope.msgContent);
        chattingService.addMsg($scope.contact,msg).then(function(response){
        	if(response=="true") {
        		myScroll.refresh();
    	        myScroll.goToPage(0, $scope.messages.length, 100);
    	        $scope.msgContent="";
    	        chattingService.changeHistory($scope.contact,$scope.messages[$scope.messages.length-1]);
        	} else{
        		alert("messsage send failure");
        	}
        },function(response){
        	alert("messsage send failure");
        });
       
    }

    $scope.back=function(){
    	$scope.isBack = true;
    	console.log("messages " + JSON.stringify($scope.messages));
    	chattingService.createLog($scope.contact.targetId);
        $state.go('main.chat-list');
    }
    var loopMsg = function(){
    	chattingService.loopMsg($scope.contact.targetId).then(function(response){
    		if (response == undefined || response =="null") {
    			return ;
    		}
    		if (response.message.length != undefined) {
    			for (var i = 0; i < response.message.length; i++) {
    				$scope.messages.push(response.message[i]);
    			}
    		} else {
				$scope.messages.push(response.message);
    		}
	        chattingService.changeHistory($scope.contact,$scope.messages[$scope.messages.length-1]);
    		
    		$timeout(function(){
	    		myScroll.refresh();
	    		myScroll.goToPage(0, $scope.messages.length, 100);
	    		chattingService.changeHistory($scope.contact,$scope.messages[$scope.messages.length-1]);//change chat history
	    	},200);
    		
    	});
    }
    
  //disable backbutton
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    //press back btn
    function onBackKeyDown(event) {
    	event.stopPropagation();
    	event.preventDefault();
    	$scope.isBack = true;
    	chattingService.createLog($scope.contact.targetId);
    	$state.go('main.chat-list');
    }
    
    var insertTestMsg = function(){
    	var msg1 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "aaaaaaaaaa");
        chattingService.addMsg($scope.contact,msg1);
        var msg2 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "bbbbbbbbbb");
        chattingService.addMsg($scope.contact,msg2);
        var msg3 = Message.newMsg(userInfo.userId, $scope.contact.targetId, "ccccccccccc");
        chattingService.addMsg($scope.contact,msg3);
    }
    
    
//    $timeout(function(){
//    	chattingService.getFiles($scope.contact.targetId);
//    	 getLogFiles();
//    },2000);
   
//    insertTestMsg();
    
}]);