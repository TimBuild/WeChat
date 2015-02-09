weChatApp.controller('user-detail-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',  function ($scope, $timeout, $stateParams, $location,$state) {
    $scope.back=function(){
        $state.go('main.chat-list');
    }
}]);
