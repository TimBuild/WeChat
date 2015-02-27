
weChatApp.controller('contact-detail-ctrl', ['$scope', '$timeout', "$stateParams", "$location","$state",
    function ($scope, $timeout, $stateParams, $location, $state) {
        $scope.contact = {};
        $scope.contact.userid = localStorage.userid;
        $scope.contact.username = localStorage.username;
        $scope.contact.icon = localStorage.icon;
        console.log("icon " + $scope.contact.icon);

        $scope.back = function () {
            $state.go('main.contact-list');
        }
}]);