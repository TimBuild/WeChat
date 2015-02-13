weChatApp.controller('search-user-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'search-user-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,searchUserServer,userInfo) {

        $scope.anotherUserId="";

        $scope.searchUser=function(){
            if($scope.anotherUserId==""){
                alert("Please input ID");
            }else{
                searchUserServer.searchUserByIdFromServer($scope.anotherUserId).then(function(response){
                    if(response==""){
                        alert("Sorry,the user doesn't exist");
                    }
                    else{
                        $state.go('add-contact');
                    }
                })
            }
        }
        $scope.back=function(){
            $state.go('main.chat-list');
        }
    }]);
