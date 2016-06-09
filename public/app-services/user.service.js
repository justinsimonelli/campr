(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.snapshot = snapshot;
        service.user = {};

        return service;

        /**
        **  Get a snapshot of the user
        **/
        function snapshot(userId) {
          console.log('getting snapshot for ' + userId)
          return firebase.database().ref('/users/' + userId).once('value');
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
          var _promise = firebase.database().ref('users/' + user.uid).update(data);
          _promise.then(function(){
              service.user = data;
          });

          return _promise;
        }

    }

})();
