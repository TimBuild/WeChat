weChatApp.controller('login-ctrl', ['$scope', '$timeout', 
    "$stateParams", "$location",'$state',
    'login-service','userInfo',"appInfo",
    function ($scope, $timeout, $stateParams, 
    		$location,$state,loginServer,userInfo,appInfo) {
	$scope.userInfo = userInfo;
	
    $scope.login=function(){

        if($scope.userInfo.userId==""||$scope.userInfo.psw==""){
            $("#nullValue").removeClass("hidden");
            setInterval(function(){
                $("#nullValue").addClass("hidden");
            },2000);
        }
        loginServer.login().then(function(response){
        	if(response=="") {
        		$("#wrongInfo").removeClass("hidden");
                setInterval(function(){
                    $("#wrongInfo").addClass("hidden");
                },2000);
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
