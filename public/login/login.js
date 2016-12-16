angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
    });
}])

.controller('LoginCtrl', LoginController);

LoginController.$inject = ['$location'];

function LoginController($location) {
    let vm = this,
        ref = firebase.database().ref();
    console.log("its working.")

    vm.loginVerify = function() {
        firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
        .then((firebaseUser) => {

            console.log("Signed in as:", firebaseUser.uid);
            return firebaseUser
        })
        .then((firebaseUser) => {
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
        });





    }
}
