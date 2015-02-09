
weChatApp.controller('contact-list-ctrl', ['$scope', '$timeout', "$stateParams", "$location", "contact-list-service", function ($scope, $timeout, $stateParams, $location, contactListService) {
    var myScroll = new IScroll('#contact-list-wrapper', {
        scrollbars: true,
        bounce: false
    });


    $scope.contacts = contactListService.getContacts();
    console.log("name" + $scope.contacts[0].username);
}]);