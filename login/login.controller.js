(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;
        vm.logout = logout;

        function login() {
            vm.dataLoading = true;
            AuthenticationService.login(vm.username, vm.password).then(function(user){
              console.log('successfully logged in!');
              $state.go('home');
            });
        };

        function logout() {
            vm.dataLoading = true;
            AuthenticationService.logout().then(function() {
                AuthenticationService.removeLocalUID();
                $state.go('login');
              }, function(error) {
                console.log('error logging out!')
            });
        };
    }

})();
