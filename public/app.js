(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm',
                authenticate: true
            })

            .state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .state('register', {
                url : '/register',
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
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
