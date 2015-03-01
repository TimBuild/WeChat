weChatApp.service('current-user-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

    	///queryUserById/{token}/{userid}"
    	var getUserDetail = function(){
    		var tempToken = appInfo.token.replace(/\//g, "__");
    		var deferred = $q.defer();
    		$http.get(appInfo.basicUrl + "queryUserById/" + tempToken + "/"
    						+ userInfo.userId+"?id="+userInfo.userId).success(function(response) {
    			console.log("get user detail success" + response);
    			deferred.resolve(response);
    		}).error(function(error) {
    			console.log("get user detail " + error);
    			 deferred.reject("error");  
    		});
    		return deferred.promise;
    	}

    	function uploadOrigin(imageURI,deferred){
    		console.log("image uri " + imageURI);
    		var tempToken = appInfo.token.replace(/\//g, "__");
			var options = new FileUploadOptions();
			options.fileKey = "image";
			options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
			options.mimeType = "image/jpeg";
			options.chunkedMode = true;
			
			var uri = encodeURI(appInfo.basicUrl+"uploadIcon/"+tempToken+"/"+userInfo.userId);
			var ft = new FileTransfer();
			ft.upload(imageURI, uri, function(result){
				console.log("上传头像成功" + result);
				deferred.resolve(result.response);
			}, function(result){
				console.log("上传头像失败" + result);
				deferred.resolve("false");
			}, options);
		}

		var uploadIcon = function(){
			var deferred = $q.defer();
		    navigator.camera.getPicture(function(imageURI){//get photo success
			    uploadOrigin(imageURI,deferred);
			    
		    }, function(){//get photo error
		    	deferred.reject(false);
		    }, { quality:50, destinationType:navigator.camera.DestinationType.FILE_URI, 
		    	 sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY });
		    return deferred.promise;
		}
		
		//get all request
		var getRequest = function(){
			//getContactRequests/{token}/{userid}
			var deferred = $q.defer();
			var tempToken = appInfo.token.replace(/\//g, "__");
    		var deferred = $q.defer();
    		$http.get(appInfo.basicUrl + "getContactRequests/" + tempToken + "/"
    						+ userInfo.userId).success(function(response) {
    			console.log("get request success" + response.userRelatedToCR);
    			deferred.resolve(response.userRelatedToCR);
    		}).error(function(error) {
    			 console.log("get request error " + error);
    			 deferred.reject("null");  
    		});
    		return deferred.promise;
		}
		
		var changeStatus = function(targetId, status){
			///setContactRequestStatus/{token}/{userid}
			var deferred = $q.defer();
			var tempToken = appInfo.token.replace(/\//g, "__");
    		var deferred = $q.defer();
    		$http.get(appInfo.basicUrl + "setContactRequestStatus/" + tempToken + "/"
    						+ userInfo.userId+"?targetid="+targetId+"&status="+status).success(function(response) {
    			deferred.resolve(response);
    		}).error(function(error) {
    			 deferred.reject("false");  
    		});
    		return deferred.promise;
		}
    	return {
    		getUserDetail:getUserDetail,
    		uploadIcon:uploadIcon,
    		getRequest:getRequest,
    		changeStatus:changeStatus
    	}
    } ]);