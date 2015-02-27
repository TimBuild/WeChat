weChatApp.controller('change-password-ctrl', ['$scope', '$timeout',
    "$stateParams", "$location",'$state',
    'change-userInfo-service','userInfo',"appInfo",
    function ($scope, $timeout, $stateParams,
              $location,$state,changeUserInfoServer,userInfo,appInfo) {
        $scope.user={};
        $scope.user.psw="";
        $scope.user.conPsw="";

        $scope.backToMe=function(){
            $state.go('main.current-user');
        }

        $scope.changePassword=function(){
            console.log("changePassword click");
            if($scope.user.psw==""||$scope.user.conPsw==""){
                alert("Please input all fields");
            }else{
                if($scope.user.psw!=$scope.user.conPsw){
                    alert("The passwords you entered do not match");
                }else{
                    changeUserInfoServer.changePassword($scope.user.psw).then(function(response){
                        console.log("result " + response);
                        alert("Change Success");
                        $state.go('main.current-user');
                    });
                }
            }
        }
    }]);
