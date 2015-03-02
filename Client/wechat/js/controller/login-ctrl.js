weChatApp.controller('login-ctrl', ['$scope', '$timeout',
    "$stateParams", "$location",'$state',
    'login-service','userInfo',"appInfo",
    function ($scope, $timeout, $stateParams,
              $location,$state,loginServer,userInfo,appInfo) {
        $scope.userInfo = userInfo;

        $scope.login=function(){

            if($scope.userInfo.userId==""||$scope.userInfo.psw==""){
                alert("Please input all fields");
            }else{
                loginServer.login().then(function(response){
                    if(response=="") {
                        alert("UserID or password is wrong");
                    } else {
                        appInfo.token = response;
                        $state.go('main.chat-list');
                    }
                },function(response){
                	alert("Login failed");
                })
            }
        };

        $scope.register=function(){
            $state.go('register');
        }
    }]);
