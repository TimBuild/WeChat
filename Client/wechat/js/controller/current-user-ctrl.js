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
        	currentUserService.getRequest().then(function(result){
        		console.log("获得请求成功");
        		//0 未处理 ， 2拒绝， 1 同意
        		if(result != null && result != undefined) {
        			if (result.length == undefined) {
        				$scope.requests.push(result);
        			} else {
        				for (var i = 0; i < result.length; i++) {
        					$scope.requests.push(result[i]);
        				}
        			}
        		}
        	},function(response){
        		console.log("获得请求失败");
        	});
        }
        getRequest();
        
        $scope.back = function(){
        	console.log("back");
        	$state.go("main.current-user");
        }
        
        $scope.changeStatus = function($index,userId, status){
        	currentUserService.changeStatus(userId, status).then(function(response){
        		if (response!="true") {
        			alert("operation failure");
        		} else {
        			$scope.requests[$index].cr.status = status;
        		}
        	},function(response){
        		alert("operation failure");
        	});
        }
}]);
