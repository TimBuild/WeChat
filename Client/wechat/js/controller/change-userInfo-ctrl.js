weChatApp.controller('change-userInfo-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'change-userInfo-service','userInfo' , function ($scope, $timeout, $stateParams, $location,$state,changeUserInfoService,userInfo) {

        $scope.username=userInfo.username;
        $scope.psw="";
        $scope.conPsw="";

        $scope.changeUsername=function(){
            if($scope.username==""){
                alert("Please input username");
            }else{
                changeUserInfoService.changeUserInfo($scope.username,userInfo.psw).then(function(response){
                    if(response!=null){
                        alert("Change success");
                        $state.go('main.current-user');
                    }
                })
            }
        }

        $scope.changePassword=function(){
            if($scope.psw!=$scope.conPsw){
                alert("The passwords you entered do not match");
            }else{
                changeUserInfoService.changeUserInfo(userInfo.username,$scope.psw).then(function(response){
                    if(response!=null){
                        alert("Change success");
                        $state.go('login');
                    }
                })
            }
        }
    }]);
