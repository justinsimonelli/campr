(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', 'AuthenticationService', 'FlashService', 'UserService'];
    function LoginController($rootScope, $state, AuthenticationService, FlashService, UserService) {
        var vm = this;
        vm.login = login;

        function init(){
          console.log('inside LoginController.init(): checking auth..')
          if(AuthenticationService.authenticated()){
            $state.go('home');
          }
        }

        function login() {
            vm.dataLoading = true;
            AuthenticationService.login(vm.user.email, vm.user.password).then(function(user){
              vm.dataLoading = false;
              $state.go('home');
            }).catch(function(error) {
              vm.dataLoading = false;
              FlashService.show(error.message, 'error', false);
            });;
        };

        init();
    }

})();
