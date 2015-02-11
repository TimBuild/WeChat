
weChatApp.controller('chat-list-ctrl', ['$scope', '$timeout', 
                                        "$stateParams", "$location", "chat-list-service","file-service","userInfo",
    function ($scope, $timeout, $stateParams, $location, chatListService,fileService,userInfo) {
    var myScroll = new IScroll('#chat-list-wrapper', {
        scrollbars: true,
        bounce: false
    });

//    $scope.chats = chatListService.getChats();
//    chatListService.getHistory();
      fileService.clearTb(userInfo.userId);
      
      $scope.chats = [];
      fileService.getData(userInfo.userId).then(function(response){
    	  var len = response.rows.length;
			for (i = 0; i < len; i++){ 
				var history = {};
				history.icon = response.rows.item(i).icon;
				history.username = response.rows.item(i).userName;
				history.userid = response.rows.item(i).userId;
				history.content = response.rows.item(i).content;
				$scope.chats.push(history);
		         
		    } 
      });
      $scope.noData = function(){
    	  return $scope.chats.length ==0;
      }
}]);