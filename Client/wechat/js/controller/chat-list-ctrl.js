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
					history.count = 0;
					$scope.chats.push(history);
				}

				$timeout(function() {
					myScroll.refresh();
				}, 100);
				
				getMsgCount();
			});
			
			chatListService.getUserDetail().then(function(response){
	        	userInfo.userName = response.username;
	        	userInfo.icon = response.icon;
	        },function(){
	        	console.log("获取信息失败");
	        });
			
			var checkExist = function(history){
				var exist = false;
				for (var i = 0; i < $scope.chats.length; i++) {
					if (history.userid == $scope.chats[i].userid) {
						$scope.chats[i].count = history.count;
						exist = true;
						break;
					}
				}
				if (!exist) {
					$scope.chats.push(history);
				}
				
			}
			
			var getMsgCount = function(){
				chatListService.getMsgCount().then(function(response){
					console.log("msg count " + response.messageRelatedToUser );
					if (response=="null") {
						return;
					}
					
					$scope.result.noData = false;
					if (response.messageRelatedToUser.length == undefined) {
						var history = {};
						history.icon = response.messageRelatedToUser.user.icon;
						history.username = response.messageRelatedToUser.user.userid;
						history.userid = response.messageRelatedToUser.user.userid;
						history.content = "";
						history.count = response.messageRelatedToUser.msgCount.count;
						checkExist(history);
					}else {
						var length = response.messageRelatedToUser.length;
						
						for (var i = 0; i < length; i++) {
							var history = {};
							history.icon = response.messageRelatedToUser[i].user.icon;
							history.username = response.messageRelatedToUser[i].user.userid;
							history.userid = response.messageRelatedToUser[i].user.userid;
							history.content = "";
							history.count = response.messageRelatedToUser[i].msgCount.count;
							checkExist(history);
						}
					}
					
					$timeout(function() {
						myScroll.refresh();
					}, 100);
				},function(response){
					console.log("get msg count error");
				});
			}
			$scope.chating = function($index){
				localStorage.icon = $scope.chats[$index].icon;
				localStorage.username = $scope.chats[$index].username;
				localStorage.userid = $scope.chats[$index].userid;
				$location.path('/chatting');
			}
			
		} ]);