weChatApp.service('search-user-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var searchUserByIdFromServer = function(id) {
            var tempToken = appInfo.token.replace(/\//g, "__");
            var deferred = $q.defer();
            console.log(appInfo.basicUrl + "queryUserById/" + tempToken + "/"
                + userInfo.userId+"?id="+id);
            $http.get(appInfo.basicUrl + "queryUserById/" + tempToken + "/"
                    + userInfo.userId+"?id="+id).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject("false");
                });
            return deferred.promise;
        }

        return {
            searchUserByIdFromServer:searchUserByIdFromServer
        }

    } ]);