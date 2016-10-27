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
        let auth = firebase.auth();

        new Promise(function(resolve, reject) {
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    console.log(firebaseUser);
                    resolve();
                } else {
                    console.log('Not log in.');
                    reject()
                }
            })
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            $location.path('/');
            // ...
        });

        $location.path('/contacts');
    }
}
