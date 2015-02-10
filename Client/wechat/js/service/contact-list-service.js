weChatApp.service('contact-list-service', [
		'$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

			var contacts;
			
			var getContacts = function(){
				contacts = [];
				return contacts;
			}

			var getContactsFromServer = function() {
				var tempToken = appInfo.token.replace(/\//g, "__");
				var deferred = $q.defer();
				$http.get(appInfo.basicUrl + "getContacts/" + tempToken + "/"
								+ userInfo.userId).success(function(response) {
					deferred.resolve(response);
				}).error(function(response) {

				});
				return deferred.promise;
			}
			
			var getContactsFromLocal = function(){
				
			}

			return {
				getContacts:getContacts,
				getContactsFromServer : getContactsFromServer,
				getContactsFromLocal: getContactsFromLocal
			}

		} ]);