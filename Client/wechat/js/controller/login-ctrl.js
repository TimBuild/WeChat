weChatApp.controller('login-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',  function ($scope, $timeout, $stateParams, $location,$state) {
    $scope.login=function(){
        $state.go('main.chat-list');
    };

    $scope.register=function(){
        $state.go('register');
    }
}]);
