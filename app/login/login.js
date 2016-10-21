angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
    });
}])

.controller('LoginCtrl', LoginController);

LoginController.$inject = ['$firebaseArray','$location'];

function LoginController($firebaseArray, $location) {
  let vm = this,
      ref = firebase.database().ref();


      vm.loginVerify  = function(){
        firebase.auth().signInWithEmailAndPassword(vm.email, vm.password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
$location.path('/contacts');
}
}
