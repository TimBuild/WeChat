weChatApp.controller('main-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',  function ($scope, $timeout, $stateParams, $location,$state) {
    var isChatSelected=false;
    var isContactSelected=false;
    var isSelfInfoSelected=false;

    $scope.chatList=function(){
        if(isChatSelected==false){
            $("#chat").addClass("selected");
            $("#contact").removeClass("selected");
            $("#me").removeClass("selected");
            isChatSelected=true;
            isContactSelected=false;
            isSelfInfoSelected=false;
        }

        $state.go('main.chat-list');
    };

    $scope.contactList=function(){
        if(isContactSelected==false){
            $("#chat").removeClass("selected");
            $("#contact").addClass("selected");
            $("#me").removeClass("selected");
            isChatSelected=false;
            isContactSelected=true;
            isSelfInfoSelected=false;
        }

        $state.go('main.contact-list');
    };

    $scope.selfInfo=function(){
        if(isSelfInfoSelected==false){
            $("#chat").removeClass("selected");
            $("#contact").removeClass("selected");
            $("#me").addClass("selected");
            isChatSelected=false;
            isContactSelected=false;
            isSelfInfoSelected=true;
        }

        $state.go('user-detail');
    };
}]);
