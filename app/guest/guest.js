angular.module('myApp.guest', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/guest', {
        templateUrl: 'guest/guest.html',
        controller: 'GuestCtrl',
    });
}])
.controller('GuestCtrl',GuestController);

GuestController.$inject = ['$scope','$firebaseArray','$location',];

function GuestController($scope, $firebaseArray, $location) {

          $scope.addGuest = function () {
            let query = firebase.database().ref().orderByChild('event_name').equalTo($scope.event_name);
            query.on('child_added', function(snapshot) {
                snapshot.ref().update({ guest_first_name: $scope.guest_first_name,
                guest_last_name: $scope.guest_last_name,
                guest_email: $scope.guest_email
               });
            }).then(function(ref) {
                var id = ref.key;
                console.log('Update Contact ' + id);
                $scope.guest_first_name = "";
                $scope.guest_last_name = "";
                $scope.guest_email = "";
            });
          }

          $scope.removeGuest = function(guest){
            $scope.guests.$remove(guest);
          }

          $scope.closeGuestWindow= function(){
      $location.path('/contacts');
          }
}
