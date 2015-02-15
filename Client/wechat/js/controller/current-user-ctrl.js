weChatApp.controller('current-user-ctrl', ['$scope', '$timeout','userInfo','current-user-service',
                      function ($scope, $timeout, userInfo, currentUserService) {
        $scope.userInfo = userInfo;
        console.log("icon " + $scope.userInfo.icon);
        
        $scope.uploadIcon = function(){
        	currentUserService.uploadIcon().then(function(response){
        		console.log("upload success");
        	},function(response){
        		console.log("upload reject");
        	})
        }
        
        var getUserDetail = function(){
        	if (userInfo.userName =="") {
        		currentUserService.getUserDetail().then(function(response){
    	        	userInfo.userName = response.username;
    	        	userInfo.icon = response.icon;
    	        },function(){
    	        	console.log("获取信息失败");
    	        });
        	}
        	
        }
}]);
