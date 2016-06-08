(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'AuthenticationService', 'FlashService'];
    function LoginController($state, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;

        function login() {
            vm.dataLoading = true;
            AuthenticationService.login(vm.user.email, vm.user.password).then(function(user){
              console.log('successfully logged in!');
              AuthenticationService.saveLocalUID(user.uid);
              $state.go('home');
            });
        };
    }

})();
