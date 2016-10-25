angular.module('myApp.guest', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/guest', {
            templateUrl: 'guest/guest.html',
            controller: 'GuestCtrl',
        });
    }])
    .controller('GuestCtrl', GuestController);

GuestController.$inject = ['$scope', '$firebaseArray', '$location', ];

function GuestController($scope, $firebaseArray, $location) {
    let ref = firebase.database().ref();
    $scope.events = $firebaseArray(ref);
    $scope.addGuest = function() {
        console.log($scope.selected);
        var usersRef = ref.child($scope.selected);

        usersRef.push({
            guest_last_name: $scope.guest_last_name,
            guest_first_name: $scope.guest_first_name,
            guest_email: $scope.guest_email
        }).then(function(ref) {
            var id = ref.key;
            console.log('Update Contact ' + id);
            $scope.guest_first_name = "";
            $scope.guest_last_name = "";
            $scope.guest_email = "";
        });

    }

    $scope.removeGuest = function(guest) {
        $scope.guests.$remove(guest);
    }

    $scope.closeGuestWindow = function() {
        $location.path('/contacts');
    }
}
