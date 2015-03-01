weChatApp.controller('chat-list-ctrl', [
		'$scope',
		'$timeout',
		"$stateParams",
		"$location",
		"chat-list-service",
		"file-service",
		"userInfo",
		function($scope, $timeout, $stateParams, $location, chatListService,
				fileService, userInfo) {
			var myScroll = new IScroll('#chat-list-wrapper', {
				scrollbars : true,
				bounce : false
			});

			$scope.result = {
				"noData" : true
			};
			$scope.chats = [];
			fileService.getData(userInfo.userId).then(function(response) {
				var len = response.rows.length;
				if (len > 0) {
					$scope.result.noData = false;
				}
				for (i = 0; i < len; i++) {
					var history = {};
					history.icon = response.rows.item(i).icon;
					history.username = response.rows.item(i).userName;
					history.userid = response.rows.item(i).userId;
					history.content = response.rows.item(i).content;
					$scope.chats.push(history);
				}

				$timeout(function() {
					myScroll.refresh();
				}, 100);
			});
			
			chatListService.getUserDetail().then(function(response){
	        	userInfo.userName = response.username;
	        	userInfo.icon = response.icon;
	        	console.log("get icon " + userInfo.icon);
	        },function(){
	        	console.log("获取信息失败");
	        });
			
			$scope.chating = function($index){
				localStorage.icon = $scope.chats[$index].icon;
				localStorage.username = $scope.chats[$index].username;
				localStorage.userid = $scope.chats[$index].userid;
				$location.path('/chatting');
			}
			
		} ]);