weChatApp.service('contact-list-service', ['$http', "appInfo", "userInfo", function ($http, appInfo, userInfo) {


    var contacts = [{ "icon": "1", "userid": "12", "username": "aa123" },
        { "icon": "1", "userid": "13", "username": "Gracie" },
        { "icon": "1", "userid": "14", "username": "Sven" }];

    var getContacts = function () {
        console.log("token " + appInfo.token);
        var tempToken = appInfo.token.replace(/\//g, "__");
        console.log("temptoken " + tempToken);

        $http.get(appInfo.basicUrl + "getContacts/" + tempToken + "/" + userInfo.userId)
                .success(function (response) {
                    console.log("response ")
                    console.log(response);
                }).error(function (response) {
                        
                });
            return contacts;
        }

    return {
        getContacts: getContacts
    }

}]);