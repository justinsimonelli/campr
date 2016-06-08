(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService','UserService', '$state', '$rootScope', 'FlashService'];

    function RegisterController(AuthenticationService, UserService, $state, $rootScope, FlashService) {
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
                  FlashService.Success('Registration successful', true);
                  AuthenticationService.saveLocalUID(user.uid);
                  $state.go('home');
                }).catch(function(e){
                  console.log(e)
                });
              } else {
                //console.log('user is logged not in');
              }
            });
        }

        /**
        ** Write the user data to the users table; extended info about person
        ** returns - promise object
        **/
        function writeUserData(user) {
          var data = {
            uid:  user.uid,
            email: vm.user.email,
            username: vm.user.username,
            firstname: vm.user.firstname,
            lastname: vm.user.lastname
          };

          console.log(data)

          return firebase.database().ref('users/' + user.uid).update(data);
        }
    }

})();
