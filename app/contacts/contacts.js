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


    $scope.contacts = $firebaseArray(ref);

    $scope.addFormShow = true;
    $scope.editFormShow = false;
    $scope.addContact = function() {
        console.log('adding contact...');
        $scope.contacts.$add({

            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        }).then(function(ref) {
            var id = ref.key;
            console.log('Added Contact ' + id);

            $scope.name = "";
            $scope.email = "";
            $scope.password = "";

        });
    }

    $scope.removeContact = function(contact){
      $scope.contacts.$remove(contact);
    }

    $scope.showEditForm = function (contact) {
      $scope.addFormShow = false;
      $scope.editFormShow = true;

      $scope.id = contact.$id; // angular.js:13920 TypeError: Cannot read property '$id' of undefined
    //at ChildScope.$scope.showEditForm
      $scope.name = contact.name;
      $scope.email = contact.email;
      $scope.password = contact.password;
    }

    $scope.editContact = function(){
      var id = $scope.id;

      var record = $scope.contacts.$getRecord(id);

      record.name = $scope.name;
      record.email = $scope.email;
      record.password = $scope.password;
      //save
      $scope.contacts.$save(record).then(function(ref){
        console.log(ref.key);
      });

      $scope.name = "";
      $scope.email = "";
      $scope.password = "";

    }

}]);
