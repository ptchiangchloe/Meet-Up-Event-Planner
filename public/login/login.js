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
        .then(function(response) {
          console.log("Success!", response); // the first I run this fn, firebase authenticate the visiter is a user but it didn't route to my contact page
          $location.path('/contacts');// the second time I click, firebase authenticate the visiter is a user again and route the user to the landing page
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          $location.path('/');
        });
    }
}
