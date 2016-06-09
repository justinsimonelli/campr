﻿(function () {
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
            console.debug('attempting to create user [' + vm.user.email + ']');

            AuthenticationService.register(vm.user.email, vm.user.password).then(function(user){
              console.log('register completed');
              if (user) {
                console.log('user is logged in; writing their info');
                writeUserData(user).then(function(){
                  console.log('successfully updated user info!');
                  AuthenticationService.saveLocalUID(user.uid);
                  UserService.snapshot(user.uid).then(function(snapshot){
                    UserService.user = snapshot;
                    $state.go('home');
                  });
                }).catch(function(e){
                  console.log(e)
                });
              } else {
                //console.log('user is logged not in');
              }
            }).catch(function(error){
              FlashService.show(error.message, 'error', false);
            });
        }
    }

})();
