weChatApp.controller('current-user-ctrl', ['$scope', '$timeout','userInfo','current-user-service',
                      function ($scope, $timeout, userInfo, currentUserService) {
        $scope.userInfo = userInfo;
        console.log("icon " + $scope.userInfo.icon);
        
        $scope.uploadIcon = function(){
        	currentUserService.uploadIcon().then(function(result){
        		console.log("upload success" + JSON.stringify(result));
        		if (result.response != undefined) {
        			$scope.userInfo.icon = result.response;
        		}
        		
        	},function(response){
        		alert("Upload failed");
        	});
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
