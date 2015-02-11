weChatApp.service('login-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var loginCheck = function(password) {
            var deferred = $q.defer();
            $http.get(appInfo.basicUrl + "login?userid=" + userInfo.userId + "&psw="
                    + password).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {

                });
            return deferred.promise;
        }

        return {
            loginCheck:loginCheck
        }
    } ]);