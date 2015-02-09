
weChatApp.controller('contact-detail-ctrl', ['$scope', '$timeout', "$stateParams", "$location","$state",
    function ($scope, $timeout, $stateParams, $location, $state) {
        $scope.contact = {};
        $scope.contact.userId = $stateParams.userId;
        $scope.contact.name = $stateParams.name;
        $scope.icon = $stateParams.icon;

        $scope.back = function () {
            $state.go('main.contact-list');
        }
}]);