weChatApp.controller('register-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'register-service',  function ($scope, $timeout, $stateParams, $location,$state,registerService) {

        $scope.registerNum="";
        $scope.registerCB=false;
        $scope.user={};
        $scope.user.username="";
        $scope.user.psw="";
        $scope.user.conPsw="";

        $scope.backToLogin=function(){
            $state.go('login');
        }

        $scope.register = function(){
            console.log("register click");
            if($scope.user.username==""||$scope.user.psw==""||$scope.user.conPsw==""){
                alert("Please input all fields");
            }else{
                if($scope.user.psw!=$scope.user.conPsw){
                    alert("The passwords you entered do not match");
                }else{
                    registerService.registerCheck($scope.user.username,$scope.user.psw).then(function(response){
                        console.log("result " + response);
                        $scope.registerCB=true;
                        $scope.registerNum=response;
                        $scope.user.username="";
                        $scope.user.psw="";
                        $scope.user.conPsw="";
                    });
                }
            }
        }
    }]);
