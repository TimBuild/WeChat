weChatApp.service('login-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var login = function() {
            var deferred = $q.defer();
            console.log("userId " + userInfo.userId);
            console.log("psw " + userInfo.psw);
            $http.get(appInfo.basicUrl + "login?userid=" + userInfo.userId + "&psw="
                    + userInfo.psw).success(function(response) {
                    console.log("登录成功 " + response);
                    deferred.resolve(response);
                }).error(function(response) {
                	console.log("登录失败 " + response);
                	deferred.reject(response);
                });
            return deferred.promise;
        }

        return {
            login:login
        }
    } ]);