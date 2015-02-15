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
    		}).error(function(response) {
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
			ft.upload(imageURI, uri, function(response){
				console.log("上传头像成功" + response);
				deferred.resolve(response);
			}, function(response){
				console.log("上传头像失败" + response);
				deferred.reject(response);
			}, options);
		}

		var uploadIcon = function(){
			var deferred = $q.defer();
		    navigator.camera.getPicture(function(imageURI){//get photo success
//		    	var image = document.getElementById('originImg');
//			    image.src = imageURI;
			    uploadOrigin(imageURI,deferred);
			    
		    }, function(){//get photo error
		    	deferred.reject(false);
		    }, { quality:50, destinationType:navigator.camera.DestinationType.FILE_URI, 
		    	 sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY });
		    return deferred.promise;
		}
		
    	return {
    		getUserDetail:getUserDetail,
    		uploadIcon:uploadIcon
    	}
    } ]);