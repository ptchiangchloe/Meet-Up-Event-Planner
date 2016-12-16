(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('RegisterCtrl', RegisterController);

    RegisterController.$inject = ['$firebaseArray', '$location'];

    function RegisterController($firebaseArray, $location) {
        let vm = this;
        vm.createAccount = function() {
            let auth = firebase.auth();
            auth.createUserWithEmailAndPassword(vm.email, vm.password)
            .then(function (firebaseUser) {
              console.log("Success!", firebaseUser);
              firebase.auth().onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                  window.location = '/#!/contacts'
                }
              });
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                $location.path('/');
            });
        };
    }

})();
