weChatApp.controller('login-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'login-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,loginServer,userInfo) {

    $scope.login=function(){
        var username=$("#username").val();
        var password=$("#password").val();
        userInfo.userId=username;
        loginServer.loginCheck(password).then(function(response){
            $state.go('main.chat-list');
        })
    };

    $scope.register=function(){
        $state.go('register');
    }
}]);
