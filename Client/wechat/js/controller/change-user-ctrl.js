weChatApp.controller('change-user-ctrl', ['$scope', '$timeout',
    "$stateParams", "$location",'$state',
    'change-user-service','userInfo',"appInfo",
    function ($scope, $timeout, $stateParams,
              $location,$state,changeUserServer,userInfo,appInfo) {
        $scope.user={};
        $scope.user.name="";
        $scope.user.psw="";

        $scope.back=function(){
            $state.go('main.current-user');
        }

        $scope.changeUsername=function(){
            if($scope.user.name.trim()==""){
                alert("Please input name");
            }else{
            	console.log("name " + $scope.user.name);
            	changeUserServer.changeUsername($scope.user.name).then(function(response){
                        console.log("result " + response);
                        if (response=="true") {
                        	alert("Change Success");
                        	userInfo.userName = $scope.user.name.trim();
                            $state.go('main.current-user');
                        } else {
                        	alert("Change failed");
                        }
                        
                    },function(){
                    	alert("Change failed");
                    });
            }
        }
        

        $scope.changePassword=function(){
            if($scope.user.psw.trim()==""){
                alert("Please input new password");
            }else{
            	changeUserServer.changePassword($scope.user.psw).then(function(response){
                    if (response=="true") {
                    	alert("Change Success");
                        $state.go('main.current-user');
                    } else {
                    	alert("Change failed");
                    }
                },function(response){
                	alert("Change failed");
                });
             }
        }
    }]);
