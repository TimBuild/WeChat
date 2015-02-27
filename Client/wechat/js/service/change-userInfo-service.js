weChatApp.service('change-user-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var changePassword=function(psw){
            var tempToken = appInfo.token.replace(/\//g, "__");
            var deferred = $q.defer();
            $http.get(appInfo.basicUrl + "modifyUserNameOrPsw/" + tempToken + "/"
                    + userInfo.userId+"?username="+userInfo.userName+"&psw="+psw).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {

                });
            return deferred.promise;
        }

        var changeUsername=function(userName){
            var tempToken = appInfo.token.replace(/\//g, "__");
            var deferred = $q.defer();
            $http.get(appInfo.basicUrl + "modifyUserNameOrPsw/" + tempToken + "/"
                    + userInfo.userId+"?username="+userName+"&psw="+userInfo.psw).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {

                });
            return deferred.promise;
        }
        return {
            changePassword:changePassword,
            changeUsername:changeUsername
        }

    } ]);