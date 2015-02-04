
weChatApp.controller('chatting-ctrl', ['$scope', '$timeout', "$stateParams", "$location", "appInfo", function ($scope, $timeout, $stateParams, $location,appInfo) {
    var myScroll = new IScroll('#chatting-wrapper', {
        scrollbars: true,
        bounce: false
    });

    //init rongyu
    RongIMClient.init(appInfo.appKey);

}]);