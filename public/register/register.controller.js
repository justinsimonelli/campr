(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$rootScope', '$state','AuthenticationService','UserService','FlashService'];

    function RegisterController($rootScope, $state, AuthenticationService, UserService, FlashService) {
        var vm = this;

        //tells which methods are public
        vm.register = register;

        function register() {
            vm.dataLoading = true;
            console.debug('registering user ' + vm.user.email + '');

            AuthenticationService.register(vm.user).then(function(user){
              console.log('registration completed');
              vm.dataLoading = false;
              $state.go('home');
            }).catch(function(error){
              vm.dataLoading = false;
              FlashService.show(error.message, 'error', false);
            });
        }
    }

})();
