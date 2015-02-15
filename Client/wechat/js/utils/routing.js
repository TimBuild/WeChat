
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
        }).state('contact-detail', {
            url: '/contact-detail/{userId}/{name}/{icon}',
            templateUrl: 'pages/routepages/contact-detail.html',
            controller: 'contact-detail-ctrl'
        }).state('chatting', {
            url: '/chatting/{userId}/{name}/{icon}',
            templateUrl: 'pages/routepages/chatting.html',
            controller: 'chatting-ctrl'
        }).state('add-contact', {
            url: '/add-contact/{userId}/{name}',
            templateUrl: 'pages/routepages/add-contact.html',
            controller: 'add-contact-ctrl'
        }).state('main.current-user', {
            url: '/current-user',
            templateUrl: 'pages/routepages/current-user.html',
            controller:'current-user-ctrl'
        }).state('search-user', {
            url: '/search-user',
            templateUrl: 'pages/routepages/search-user.html',
            controller: 'search-user-ctrl'
        });

    $urlRouterProvider.otherwise("/login");
});