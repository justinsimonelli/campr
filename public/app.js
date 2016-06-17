(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngCookies', 'ngResource'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                resolve: {
                  userData: function(UserService, AuthenticationService){
                    return UserService.snapshot(AuthenticationService.getLocalUID()).then(function(data){
                      return data.val();
                    });
                  }
                },
                controllerAs: 'vm',
                templateUrl: 'views/home.view.html',
                authenticate: true
            })

            .state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'views/login.view.html',
                controllerAs: 'vm'
            })

            .state('register', {
                url : '/register',
                controller: 'RegisterController',
                templateUrl: 'views/register.view.html',
                controllerAs: 'vm'
            })

            $urlRouterProvider.otherwise('/login');
    }

    run.$inject = ['$rootScope', '$state', 'AuthenticationService'];

    function run($rootScope, $state, AuthenticationService) {
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !AuthenticationService.authenticated()){
          // User isn’t authenticated
          $state.transitionTo("login");
          event.preventDefault();
        }
      });
    }


})();
