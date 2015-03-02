weChatApp.controller('search-user-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'search-user-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,searchUserServer,userInfo) {

        $scope.anotherUserId="";

        $scope.searchUser=function(){
            if($scope.anotherUserId==""){
                alert("Please input ID");
            }else{
                searchUserServer.searchUserByIdFromServer($scope.anotherUserId).then(function(response){
                    if(response==""){
                        alert("Sorry, user doesn't exist");
                    }else{
                    	localStorage.searchId = response.userid;
                    	localStorage.searchName = response.username;
                    	localStorage.searchIcon = response.icon;
                        $location.path("add-contact");
                    }
                },function(response){
                	alert("Search failure");
                });
            }
        }
        $scope.back=function(){
            $state.go('main.chat-list');
        }
    }]);
