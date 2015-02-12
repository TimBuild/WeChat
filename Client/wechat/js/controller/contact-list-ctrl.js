
weChatApp.controller('contact-list-ctrl', ['$scope', '$timeout', "$stateParams", "$location", 
                                           "contact-list-service","userInfo","file-service",
    function ($scope, $timeout, $stateParams, $location, contactListService,userInfo,fileService) {
    var myScroll = new IScroll('#contact-list-wrapper', {
        scrollbars: true,
        bounce: false
    });


    $scope.contacts = contactListService.getContacts();
    
    contactListService.getContactsFromServer().then(function(response){
    	console.log("联系人");
    	if((response+"").indexOf("[") >0 && (response+"").indexOf("]")>0) {
    		for (var i=0; i < response.user.length; i++) {
            	$scope.contacts.push(response.user[i]);
            }
    	} else {
    		$scope.contacts.push(response.user);
    	}
        
        console.log("联系人列表 " + $scope.contacts.length);
        if ($scope.contacts.length != 0) {
        	fileService.saveContact(userInfo.userId, response);
        } else {
        	getContactsFromLocal();
        }
        
        
        
     });
    
    /*从文件获取联系人*/
    var getContactsFromLocal = function(){
    	fileService.getContactFromLocal().then(function(response) {
    		console.log("从本地获取联系人 " + response);
    	});
    }
    $scope.noData = function(){
  	  return $scope.contacts.length ==0;
    }

   
}]);