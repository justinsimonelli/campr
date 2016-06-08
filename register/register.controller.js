(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];

    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        //tells which methods are public
        vm.register = register;

        function register() {
            vm.dataLoading = true;
            console.debug('attempting to create user [' + vm.user.email + ']');

            var userPromise = firebase.auth().createUserWithEmailAndPassword(vm.user.email, vm.user.password)
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
            });

            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                /*
                console.log('user is logged in; writing their info');
                writeUserData(user).then(function(){
                  console.log('successfully updated user info!');
                  FlashService.Success('Registration successful', true);
                  $location.path('/login');
                }).catch(function(e){
                  console.log(e)
                });
                */
                console.log('user is authenticated');
                $location.path('/login').replace();
              } else {
                //console.log('user is logged not in');
              }
            });
        }

        //returns a promise
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
