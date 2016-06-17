(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'AuthenticationService', '$state', 'userData'];
    function HomeController($scope, AuthenticationService, $state, userData) {
        var vm = this;
        vm.logout = logout;
        //userData --> UserService.snapshot
        vm.user = userData;
        vm.trips;
        
        function logout(){
          AuthenticationService.logout().then(function(){
            $state.go('login');
          });
        }

        function addTrip(){

        }
    }

})();
