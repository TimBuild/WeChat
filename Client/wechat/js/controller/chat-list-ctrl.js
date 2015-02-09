
weChatApp.controller('chat-list-ctrl', ['$scope', '$timeout', "$stateParams", "$location", "chat-list-service",
    function ($scope, $timeout, $stateParams, $location, chatListService) {
    var myScroll = new IScroll('#chat-list-wrapper', {
        scrollbars: true,
        bounce: false
    });

    $scope.chats = chatListService.getChats();
}]);