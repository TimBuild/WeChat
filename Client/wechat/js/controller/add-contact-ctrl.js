weChatApp.controller('add-contact-ctrl', ['$scope', '$timeout', "$stateParams", "$location",'$state',
    'add-contact-service','userInfo',function ($scope, $timeout, $stateParams, $location,$state,addContactServer,userInfo) {
        $scope.back=function(){
            $state.go('search-user');
        }

//        console.log($stateParams.name);
        $scope.username=$stateParams.name;

        $scope.addToContact=function(){
            addContactServer.addContactCheck($stateParams.userId).then(function(response){
                console.log("addContact----"+response);
                if ("sent"==response) {
                	alert("Already send");
                } else if (response=="exist"){
                	alert("Already in your contacts list");
                } else if (response=="true"){
                	alert("Request success");
                } else {
                	alert("Request failure");
                }
            });
        }
    }]);
