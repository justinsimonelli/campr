(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'AuthenticationService', '$state', 'userData'];
    function HomeController($scope, AuthenticationService, $state, userData) {
        var vm = this;
        vm.logout = logout;
        vm.user = userData;

        function logout(){
          AuthenticationService.logout().then(function(){
            $state.go('login');
          });
        }
    }

})();
