weChatApp.service('contact-list-service', [
		'$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

			var contacts;
			
			var getContacts = function(){
				contacts = [];
				return contacts;
			}

			var getContactsFromServer = function() {
				var tempToken = appInfo.token.replace(/\//g, "__");
				console.log("token " + tempToken);
				
				var deferred = $q.defer();
				$http.get(appInfo.basicUrl + "getContacts/" + tempToken + "/"
								+ userInfo.userId).success(function(response) {
					console.log("获取联系人成功 " + response);
					deferred.resolve(response);
				}).error(function(response) {
					console.log("获取联系人失败 " + response);
					 deferred.reject("error");  
				});
				return deferred.promise;
			}

			return {
				getContacts:getContacts,
				getContactsFromServer : getContactsFromServer
			}

		} ]);