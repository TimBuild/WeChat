weChatApp.service('contact-list-service', ['$http', "appInfo", "userInfo", function ($http, appInfo, userInfo) {


    var contacts = [{ "icon": "", "userid": "1234567", "username": "aaa" },
        { "icon": "", "userid": "111111", "username": "55" },
        { "icon": "", "userid": "222222", "username": "66" }];

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