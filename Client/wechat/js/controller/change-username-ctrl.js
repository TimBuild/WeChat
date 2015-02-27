weChatApp.controller('change-username-ctrl', ['$scope', '$timeout',
    "$stateParams", "$location",'$state',
    'change-userInfo-service','userInfo',"appInfo",
    function ($scope, $timeout, $stateParams,
              $location,$state,changeUserInfoServer,userInfo,appInfo) {
        $scope.userInfo={};
        $scope.userInfo.username="";

        $scope.backToMe=function(){
            $state.go('main.current-user');
        }

        $scope.changeUsername=function(){
            console.log("changeUsername click");
            if($scope.user.username==""){
                alert("Please input all fields");
            }else{
                changeUserInfoServer.changeUsername($scope.userInfo.username).then(function(response){
                        console.log("result " + response);
                        alert("Change Success");
                        $state.go('main.current-user');
                    });
            }
        }
    }]);
