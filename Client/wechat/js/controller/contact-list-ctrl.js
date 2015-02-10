
weChatApp.controller('contact-list-ctrl', ['$scope', '$timeout', "$stateParams", "$location", 
                                           "contact-list-service","userInfo","file-service",
    function ($scope, $timeout, $stateParams, $location, contactListService,userInfo,fileService) {
    var myScroll = new IScroll('#contact-list-wrapper', {
        scrollbars: true,
        bounce: false
    });


    $scope.contacts = contactListService.getContacts();
    
    contactListService.getContactsFromServer().then(function(response){
        for (var i=0; i < response.user.length; i++) {
        	$scope.contacts.push(response.user[i]);
        }
        fileService.saveContact(userInfo.userId, response);
     });
    
    /*从文件获取联系人*/
    var getContactsFromLocal = function(){
    	fileService.getContactFromLocal();
    }

    
}]);