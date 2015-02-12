weChatApp.controller('search-user-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'search-user-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,searchUserServer,userInfo) {

        $scope.searchUser=function(){
            var id=$("#userId").val();
            searchUserServer.searchUserByIdFromServer(id).then(function(response){
                if(response==""){
                    $("#searchError").removeClass("hidden");
                }
                else{
                    $state.go('add-contact');
                }
            })
        }
        $scope.back=function(){
            $state.go('main.chat-list');
        }
    }]);
