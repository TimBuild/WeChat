
weChatApp.controller('contact-list-ctrl', ['$scope', '$timeout', "$stateParams", "$location", 
                                           "contact-list-service","userInfo","file-service",
    function ($scope, $timeout, $stateParams, $location, contactListService,userInfo,fileService) {
    var myScroll = new IScroll('#contact-list-wrapper', {
        scrollbars: true,
        bounce: false
    });

    $scope.result={"noData":true};
    $scope.contacts = contactListService.getContacts();
    
    contactListService.getContactsFromServer().then(function(response){
    	if (response =="null" || response=="") {
    		return ;
    	}
    	$scope.result.noData = false;
    	//(response+"").indexOf("[") >0 && (response+"").indexOf("]")>0
    	if(response.user.length!=undefined) {
    		for (var i=0; i < response.user.length; i++) {
            	$scope.contacts.push(response.user[i]);
            }
    	} else {
    		$scope.contacts.push(response.user);
    	}
        
        if ($scope.contacts.length != 0) {
        	fileService.saveContact(userInfo.userId, response);
        } else {
        	getContactsFromLocal();
        }
     },function(){//reject
    	 getContactsFromLocal();
     });
    
    /*从文件获取联系人*/
    var getContactsFromLocal = function(){
    	fileService.getContactFromLocal().then(function(response) {
    		var data = JSON.parse(response)["user"];
    		if (data ==undefined || response ==""){
    			return;
    		}
    		$scope.result.noData = false;
     		if (data.length == undefined) {
    			$scope.contacts.push(data);
    		} else {
    			for(var i = 0; i < data.length; i++) {
        			$scope.contacts.push(data[i]);
        		}
    		}
    	});
    }
    
    $scope.contactDetail= function($index){
    	localStorage.username = $scope.contacts[$index].username;
    	localStorage.userid=$scope.contacts[$index].userid;
    	localStorage.icon=$scope.contacts[$index].icon;
    	$location.path('/contact-detail');
    }
   
}]);