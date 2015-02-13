weChatApp.service('search-user-service', [
    '$http',"appInfo","userInfo",'$q',function($http, appInfo, userInfo,$q) {

        var searchUserByIdFromServer = function(id) {
            var tempToken = appInfo.token.replace(/\//g, "__");
            var deferred = $q.defer();
            console.log(appInfo.basicUrl + "queryUserById/" + tempToken + "/"
                + userInfo.userId+"?id="+id);
            $http.get(appInfo.basicUrl + "queryUserById/" + tempToken + "/"
                    + userInfo.userId+"?id="+id).success(function(response) {
                    console.log("response="+response);
                    deferred.resolve(response);
                }).error(function(response) {
                    console.log("response="+response+"查询失败")
                });
            return deferred.promise;
        }

        return {
            searchUserByIdFromServer:searchUserByIdFromServer
        }

    } ]);