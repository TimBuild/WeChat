weChatApp.controller('login-ctrl', ['$scope', '$timeout', 
    "$stateParams", "$location",'$state',
    'login-service','userInfo',"appInfo",
    function ($scope, $timeout, $stateParams, 
    		$location,$state,loginServer,userInfo,appInfo) {
	$scope.userInfo = userInfo;
	
    $scope.login=function(){
    	
        loginServer.login().then(function(response){
        	if(response=="") {
        		alert("Error username or psw");
        	} else {
        		appInfo.token = response;
                $state.go('main.chat-list');
        	}
        })
    };

    $scope.register=function(){
        $state.go('register');
    }
}]);
