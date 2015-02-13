weChatApp.controller('add-contact-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'add-contact-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,addContactServer,userInfo) {
        $scope.back=function(){
            $state.go('search-user');
        }

        $scope.addToContact=function(){
            addContactServer.addContactCheck($scope.anotherUserId).then(function(response){

            });
        }
    }]);
