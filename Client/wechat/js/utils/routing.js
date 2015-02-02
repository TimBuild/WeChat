
weChatApp.config(function ($stateProvider, $urlRouterProvider) {
    /*
	 * Default on start or navigating to wrong url
	 */
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'pages/routePages/login.html'
    }).state('register', {
        url: '/register',
        templateUrl: 'pages/routePages/register.html'
    }).state('main', {
        url: '/main',
        templateUrl: 'pages/routePages/main.html'
    }).state('main.chat-list', {
        url: '/chat-list',
        templateUrl:'pages/routePages/chat-list.html'
    }).state('main.contact-list', {
        url: '/contact-list',
        templateUrl: 'pages/routePages/contact-list.html'
    });

    $urlRouterProvider.otherwise("/login");
});