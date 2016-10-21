'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsCtrl'
    });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

    var ref = firebase.database().ref();


    $scope.events = $firebaseArray(ref);
    $scope.addFormShow = true;
    $scope.editFormShow = false;
    $scope.addContact = function() {
        console.log('adding contact...');
        $scope.events.$add({
            event_name: $scope.event_name,
            event_type: $scope.event_type,
            event_host: $scope.event_host,

        }).then(function(ref) {
            var id = ref.key;
            console.log('Added Contact ' + id);
            $scope.event_name = "";
            $scope.event_type = "";
            $scope.event_host = "";


        });
    }

    $scope.removeEvent = function(event){
      $scope.events.$remove(event);
    }

    $scope.showEditForm = function (event) {
      $scope.addFormShow = false;
      $scope.editFormShow = true;

      $scope.id = event.$id;
      $scope.event_name = event.event_name;
      $scope.event_type = event.event_type;
      $scope.event_host = event.event_host;
    }

    $scope.editEvent = function(){
      var id = $scope.id;

      var record = $scope.events.$getRecord(id);

      record.event_name = $scope.event_name;
      record.event_type = $scope.event_type;
      record.event_host = $scope.event_host;
      //save
      $scope.events.$save(record).then(function(ref){
        console.log(ref.key);
      });

      $scope.event_name = "";
      $scope.event_type = "";
      $scope.event_host = "";

      $scope.addFormShow = true;
      $scope.editFormShow = false;

    };

    $scope.showGuestForm = function(){
      $scope.editGuestShow = true;
    }

    $scope.logout = function(){
          firebase.auth().signOut().then(function() {
      console.log('Sign-out successful.')
    }, function(error) {
      // An error happened.
    });
    }

}]);
