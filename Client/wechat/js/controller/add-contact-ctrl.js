weChatApp.controller('add-contact-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'add-contact-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,addContactServer,userInfo) {


        $scope.back=function(){
            $state.go('main.chat-list');
        }
}]);
