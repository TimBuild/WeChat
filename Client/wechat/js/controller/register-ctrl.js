weChatApp.controller('register-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'register-server',  function ($scope, $timeout, $stateParams, $location,$state,registerServer) {

        var userName=$("#username").val();
        var psw=$("#password").val();
        var conPsw=$("#ConPsd").val();

        if(conPsw!=psw){
            //两次输入密码不一致
        }
        else{
            registerServer.registerCheck(userName,psw).then(function(response){

            })
        }

        $scope.backToLogin=function(){
            $state.go('login');
        }
}]);
