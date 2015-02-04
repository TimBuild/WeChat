
weChatApp.config(function ($stateProvider, $urlRouterProvider) {
    /*
	 * Default on start or navigating to wrong url
	 */
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'pages/routePages/login.html',
        controller:'login-ctrl'
    }).state('register', {
        url: '/register',
        templateUrl: 'pages/routePages/register.html',
        controller:'register-ctrl'
    }).state('main', {
        url: '/main',
        templateUrl: 'pages/routePages/main.html',
        controller:'main-ctrl'
    }).state('main.chat-list', {
        url: '/chat-list',
        templateUrl: 'pages/routePages/chat-list.html',
        controller: 'chat-list-ctrl'
    }).state('main.contact-list', {
        url: '/contact-list',
        templateUrl: 'pages/routePages/contact-list.html',
        controller: 'contact-list-ctrl'
    }).state('user-detail', {
        url: '/user-detail',
        templateUrl: 'pages/routePages/user-detail.html'
    }).state('chatting', {
        url: '/chatting/:userId/:userName/:icon',
        templateUrl: 'pages/routePages/chatting.html',
        controller: 'chatting-ctrl'
    }).state('add-contact', {
            url: '/add-contact',
            templateUrl: 'pages/routePages/add-contact.html',
    });

    $urlRouterProvider.otherwise("/login");
});