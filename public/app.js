(function() {
    'use strict';
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCLeGpFoe1YyLV5FopAe9jgzVLOZMPXTqA",
        authDomain: "meet-up-event-planner-d45a4.firebaseapp.com",
        databaseURL: "https://meet-up-event-planner-d45a4.firebaseio.com",
        storageBucket: "meet-up-event-planner-d45a4.appspot.com",
        messagingSenderId: "711700494163"
    };
    firebase.initializeApp(config);
    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'firebase',
        'myApp.login',
        'myApp.guest',
        'myApp.contacts',
        'ui.bootstrap.datetimepicker',
        'ui.dateTimeInput',
        'ngMessages'
    ]).
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'vm'
        })

        .otherwise({
            // redirectTo: '/'
        });
    }]);

}());
