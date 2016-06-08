(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['AuthenticationService','UserService', '$state'];
    function HomeController(AuthenticationService, UserService, $state) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function logout(){
          AuthenticationService.logout().then(function(){
            AuthenticationService.removeLocalUID();
            console.log('logged out');
            $state.go('login');
          });
        }

        initController();

        function initController() {
            //loadCurrentUser();
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();
