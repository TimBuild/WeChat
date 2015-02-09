
weChatApp.config(function ($stateProvider, $urlRouterProvider) {
    /*
	 * Default on start or navigating to wrong url
	 */
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'pages/routepages/login.html',
        controller:'login-ctrl'
    }).state('register', {
        url: '/register',
        templateUrl: 'pages/routepages/register.html',
        controller:'register-ctrl'
    }).state('main', {
        url: '/main',
        templateUrl: 'pages/routepages/main.html',
        controller:'main-ctrl'
    }).state('main.chat-list', {
        url: '/chat-list',
        templateUrl: 'pages/routepages/chat-list.html',
        controller: 'chat-list-ctrl'
    }).state('main.contact-list', {
        url: '/contact-list',
        templateUrl: 'pages/routepages/contact-list.html',
        controller: 'contact-list-ctrl'
    }).state('user-detail', {
        url: '/user-detail',
        templateUrl: 'pages/routepages/user-detail.html',
        controller: 'user-detail-ctrl'
    }).state('chatting', {
        url: '/chatting/:userId/:userName/:icon',
        templateUrl: 'pages/routepages/chatting.html',
        controller: 'chatting-ctrl'
    }).state('add-contact', {
            url: '/add-contact',
            templateUrl: 'pages/routepages/add-contact.html',
            controller: 'add-contact-ctrl'
    });

    $urlRouterProvider.otherwise("/login");
});