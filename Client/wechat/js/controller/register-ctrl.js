weChatApp.controller('register-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',  function ($scope, $timeout, $stateParams, $location,$state) {
    $scope.backToLogin=function(){
        $state.go('login');
    }
}]);
