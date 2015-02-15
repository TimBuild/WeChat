weChatApp.service('chatting-service', ['$http',"appInfo","file-service","userInfo", "$q",
                    function ($http,appInfo, fileService,userInfo,$q) {

    var messages = {};

    var getAllMsg = function (id) {
        messages[id] = [];
        return messages[id];
    }

    var addMsg = function (contact,msg) {
        messages[msg.targetId].push(msg);
        
        changeHistory(contact,msg);
        
       // addMessage/[token]/[userid]?targetid=[targetid]&content=[content]
        var tempToken = appInfo.token.replace(/\//g, "__");
        $http.get(appInfo.basicUrl + "addMessage/" + tempToken + "/"
				+ userInfo.userId+"?targetid="+msg.targetId+"&content="+msg.content).success(function(response) {
			console.log("发送消息 " + response);
		}).error(function(response) {
			console.log("发送消息失败 " + response);
		});
    }
    
    var changeHistory = function(contact,msg){
    	var history = {};
        history.userId = contact.targetId;
        history.userName = contact.targetName;
        history.icon = contact.targetIcon;
        history.content = msg.content;
        fileService.addData(userInfo.userId, history);
    }
    
    var createLogDir = function(filePath){
    	fileService.createSubDir(filePath);
    }
    
    var getLog = function(userId, targetId , date){
    	
    	var deferred = $q.defer();
    	fileService.getLog(userId, targetId, date).then(function(response){
    		var data =  eval(response);
    		for (var i = 0; i < data.length; i++) {
    			messages[targetId].push(data[i]);
    		}
    		deferred.resolve(true);
    		
    	});
    	
    	return deferred.promise;
    }
    
    var createLog = function(targetId){
    	var msg_today = [];
    	var date = new Date();
    	var startTime = parseInt(new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0).getTime());
    	var endTime = parseInt(new Date(date.getFullYear(),date.getMonth(),date.getDate(),23,59,58).getTime());
    	
    	for (var i=0; i < messages[targetId].length; i++) {
			
			var today = parseInt(messages[targetId][i].date);
			
    		if (today > startTime && today < endTime) {
    			msg_today.push(messages[targetId][i]);
    		}
    	}
    	fileService.createLog(targetId,msg_today);
    }
    
    var loopMsg = function(targetId){
    	//http://[ip]:8080/WeChat/rest/UserService/getMessages/[token]/[userid]?targetid=[targetid]
    	var deferred = $q.defer();
    	var tempToken = appInfo.token.replace(/\//g, "__");
    	$http.get(appInfo.basicUrl + "getMessages/" + tempToken + "/"
				+ userInfo.userId+"?targetid="+targetId).success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			console.log("获得信息失败 " + response);
		});
    	return deferred.promise;
    }

    return {
        getAllMsg:getAllMsg,
        loopMsg:loopMsg,
        addMsg:addMsg,
        createLogDir:createLogDir,
        createLog:createLog,
        getLog:getLog,
        changeHistory:changeHistory
    }

}]);