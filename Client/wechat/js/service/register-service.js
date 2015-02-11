weChatApp.service('register-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var registerCheck=function(userName,psw){
            var deferred = $q.defer();
            $http.get(appInfo.basicUrl + "register?username=" + userName + "&psw="
                    + psw).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {

                });
            return deferred.promise;
        }

        return {
            registerCheck:registerCheck
        }
    } ]);