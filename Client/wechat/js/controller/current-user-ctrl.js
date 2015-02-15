weChatApp.controller('current-user-ctrl', ['$scope', '$timeout','userInfo','current-user-service',"$state",
                      function ($scope, $timeout, userInfo, currentUserService,$state) {
        $scope.userInfo = userInfo;
        $scope.number = 0;
        
        $scope.uploadIcon = function(){
        	currentUserService.uploadIcon().then(function(result){
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
        
        $scope.requests = [];
        var getRequest = function(){
        	currentUserService.getRequest().then(function(response){
        		console.log("获得请求成功");
        		if(response != null) {
        			if (response.contactRequest.length == undefined) {
        				$scope.requests.push(response.contactRequest);
        			} else {
        				for (var i = 0; i < response.contactRequest.length; i++) {
        					$scope.requests.push(response.contactRequest[i]);
        				}
        			}
        		}
        	},function(response){
        		console.log("获得请求失败");
        	});
        }
        getRequest();
        
        $scope.back = function(){
        	$state.go("main.current-user");
        }
}]);
