weChatApp.controller('add-contact-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'add-contact-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,addContactServer,userInfo) {
        $scope.back=function(){
            $state.go('search-user');
        }

//        console.log($stateParams.name);
        $scope.username=$stateParams.name;

        $scope.addToContact=function(){
            addContactServer.addContactCheck($stateParams.userId).then(function(response){
                console.log("addContact----"+response);
            });
        }
    }]);
