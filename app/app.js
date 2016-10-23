'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'firebase',
    'myApp.login',
    'myApp.guest',
    'myApp.contacts',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
    })

.otherwise({
        redirectTo: '/'
    });
}]);
