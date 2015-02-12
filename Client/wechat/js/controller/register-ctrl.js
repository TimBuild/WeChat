weChatApp.controller('register-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'register-service',  function ($scope, $timeout, $stateParams, $location,$state,registerService) {

        var userName=$("#username").val();
        var psw=$("#password").val();
        var conPsw=$("#ConPsd").val();
        $scope.registerNum="";
        $scope.registerCB=false;

        $scope.backToLogin=function(){
            $state.go('login');
        }
        
        $scope.register = function(){
        	console.log("register click");
        	registerService.registerCheck(userName,psw).then(function(response){
            	console.log("result " + response);
            	$scope.registerCB=true;
            	$scope.registerNum=response;
            });
        }
}]);
