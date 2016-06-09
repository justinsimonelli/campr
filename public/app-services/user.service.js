(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    //UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        service.snapshot = snapshot;
        service.writeUserData = writeUserData;

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
        function writeUserData(authenticatedFirebaseUser) {
          var data = {
            uid:  authenticatedFirebaseUser.uid,
            email: authenticatedFirebaseUser.userModel.email,
            username: authenticatedFirebaseUser.userModel.username,
            firstname: authenticatedFirebaseUser.userModel.firstname,
            lastname: authenticatedFirebaseUser.userModel.lastname
          };

          console.log(data);
          return firebase.database().ref('users/' + authenticatedFirebaseUser.uid).update(data);
        }

    }

})();
