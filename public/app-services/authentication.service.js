(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.login = login;
        service.logout = logout;
        service.getLocalUID = getLocalUID;
        service.saveLocalUID = saveLocalUID;
        service.removeLocalUID = removeLocalUID
        service.register = register
        service.authenticated = authenticated;

        return service;

        /**
        ** Register a new user with Firebase using email,password
        **/
        function register(email, password) {
          var _promise = firebase.auth().createUserWithEmailAndPassword(email, password);
          _promise.then(function(user){
            if (user) {
              $state.go('home');
            } else {
              //console.log('user is logged not in');
            }
          });

          return _promise;
        }

        /**
        ** Returns whether or not the user is authenticated
        **/
        function authenticated(){
          var authenticated = localStorage.getItem('uid');
          console.log('authenticated = ' + authenticated)
          return (authenticated ? true : false);
        }

        /**
        **  Log the user in.
        **/
        function login(email, password) {
          var _promise = firebase.auth().signInWithEmailAndPassword(email, password);
          _promise.then(function(user){
            console.log('successfully logged in!');
            saveLocalUID(user.uid);
          });

          return _promise;
        }

        /**
        **  Log the user out.
        **/
        function logout() {
          var _promise = firebase.auth().signOut();
          _promise.then(function(){
            removeLocalUID();
            console.log('logged out');
          });

          return _promise;
        }

        function getLocalUID(){
          return localStorage.getItem('uid');
        }

        function saveLocalUID(uid) {
            localStorage.setItem('uid', uid);
        }

        function removeLocalUID() {
            localStorage.removeItem('uid');
        }
    }
})();
