weChatApp.service('change-userInfo-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var changeUserInfo=function(userName,psw){
            var deferred = $q.defer();
            var tempToken = appInfo.token.replace(/\//g, "__");
            $http.get(appInfo.basicUrl + "modifyUserNameOrPsw/"+tempToken+"/" +userInfo.userId+"?username="
                    + userName + "&psw="+ psw).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    console.log("change userInfo error " + response);
                });
            return deferred.promise;
        }

        return {
            changeUserInfo:changeUserInfo
        }
    } ]);