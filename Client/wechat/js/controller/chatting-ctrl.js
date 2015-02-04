weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", "$location", "chattingService",
    function ($scope, $timeout, $stateParams, $location, appInfo, chattingService) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false
    });

    $scope.isCurrentUser = function () {
        return true;
    }
    console.log("chattingService " + chattingService)
    $scope.messages = chattingService.getAllMsg();
    var msg1 = Message.newMsg("123456","1234567","hahahha");

    chattingService.addMsg(msg1);
    

}]);