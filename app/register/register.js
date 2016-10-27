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
            let promise = auth.createUserWithEmailAndPassword(vm.email, vm.password);
            promise
            .then(function () {

            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
            $location.path('/contacts');
        };
    }

})();
