weChatApp.controller('main-ctrl', ['$scope', '$timeout', "$stateParams", 
                                   "$location", '$state', '$rootScope', 'file-service','userInfo',
                                   function ($scope, $timeout, $stateParams, $location, 
                                		   $state, $rootScope,fileService,userInfo) {
    $rootScope.swipe = {
        "isToLeft": true,
        "isToRight": false
    };

    $scope.urls = ['main.chat-list', 'main.contact-list', 'main.current-user'];
    var urlIndex = 0;


    $scope.swipeRight = function () {
        console.log("right");
        $rootScope.swipe.isToLeft = false;
        $rootScope.swipe.isToRight = true;
        if (urlIndex > 0) {

            $timeout(function () {
                $state.go($scope.urls[--urlIndex]);
            }, 100);

        }
    }

    $scope.swipeLeft = function () {
        console.log("left");
        $rootScope.swipe.isToLeft = true;
        $rootScope.swipe.isToRight = false;

        if (urlIndex < 2) {

            $timeout(function () {
                $state.go($scope.urls[++urlIndex]);
            }, 100);
            console.log("urlIndex------------->" + urlIndex);
        }
    }

    $scope.addContact = function () {
        $state.go('search-user');
    }

    fileService.openDB(userInfo.userId);
    
    $timeout(function(){
    	fileService.createRootDir(userInfo.userId);//create dir wechat/userId
    },2*1000);
    
    
    
}]).filter("imgFilter", function () {
    var convert = function (icon) {
    	console.log("icon " + icon +"  "+(icon == ""));
        if (icon == "" || icon ==undefined) {
            return "img/personPhoto.png";
        }
    }

    return convert;
});
