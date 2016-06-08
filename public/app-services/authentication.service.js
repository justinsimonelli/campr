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
        service.saveLocalUID = saveLocalUID;
        service.removeLocalUID = removeLocalUID
        service.register = register
        service.authenticated = authenticated;

        return service;

        /**
        ** Register a new user with Firebase using email,password
        **/
        function register(email, password) {
          return firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log('unable to register user. errorCode = '+ errorCode +', errorMessage = ' + errorMessage);
            });
        }

        /**
        ** Returns whether or not the user is authenticated
        **/
        function authenticated(){
          return (localStorage.getItem('uid') ? true : false);
        }

        /**
        **  Log the user in. DO ERROR HANDLING TOO!
        **/
        function login(email, password) {
          return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('unable to login user. errorCode = '+errorCode+', errorMessage = ' + errorMessage)
          });
        }

        /**
        **  Log the user out.
        **/
        function logout() {
          return firebase.auth().signOut();
        }

        function saveLocalUID(uid) {
            localStorage.setItem('uid', uid);
        }

        function removeLocalUID() {
            localStorage.removeItem('uid');
        }
    }

    function logout() {
        vm.dataLoading = true;
        AuthenticationService.logout().then(function() {
            AuthenticationService.removeLocalUID();
            $state.go('login');
          }, function(error) {
            console.log('error logging out!')
        });
    };

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
