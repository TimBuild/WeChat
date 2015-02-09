weChatApp.controller('main-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',  function ($scope, $timeout, $stateParams, $location,$state) {
    var isChatSelected=true;
    var isContactSelected=false;
    var isSelfInfoSelected=false;

    $("#chat").addClass("selected");

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

    $scope.addContact=function(){
        $state.go('add-contact');
    }
}]).filter("imgFilter", function () {
    var convert = function (icon) {
        if (icon == "") {
            return "img/personPhoto.png";
        }

    }

    return convert;
});
