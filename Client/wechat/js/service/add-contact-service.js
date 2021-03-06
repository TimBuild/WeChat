weChatApp.service('add-contact-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var addContactCheck = function(contactId) {
            var tempToken = appInfo.token.replace(/\//g, "__");
            var deferred = $q.defer();
            $http.get(appInfo.basicUrl + "addContactRequest/" + tempToken + "/"
                    + userInfo.userId+"?targetid="+contactId).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {

                });
            return deferred.promise;
        }

        
        return {
            addContactCheck:addContactCheck
        }
    } ]);