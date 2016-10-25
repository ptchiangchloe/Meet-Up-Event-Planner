'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsCtrl',
        isLogin: true
    });

}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {

    let ref = firebase.database().ref();
    $scope.events = $firebaseArray(ref);
    $scope.addFormShow = true;
    $scope.editFormShow = false;

    /* Bindable functions
 -----------------------------------------------*/
    $scope.endDateBeforeRender = endDateBeforeRender
    $scope.endDateOnSetTime = endDateOnSetTime
    $scope.startDateBeforeRender = startDateBeforeRender
    $scope.startDateOnSetTime = startDateOnSetTime

    function startDateOnSetTime() {
        $scope.$broadcast('start-date-changed');
    }

    function endDateOnSetTime() {
        $scope.$broadcast('end-date-changed');
    }

    function startDateBeforeRender($dates) {
        if ($scope.dateRangeEnd) {
            var activeDate = moment($scope.dateRangeEnd);

            $dates.filter(function(date) {
                return date.localDateValue() >= activeDate.valueOf()
            }).forEach(function(date) {
                date.selectable = false;
            })
        }
    }

    function endDateBeforeRender($view, $dates) {
        if ($scope.dateRangeStart) {
            var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

            $dates.filter(function(date) {
                return date.localDateValue() <= activeDate.valueOf()
            }).forEach(function(date) {
                date.selectable = false;
            })
        }
    };

    $scope.addContact = function() {
        var usersRef = ref.child($scope.event_name);
        console.log('adding contact...' + usersRef);
        usersRef.set({
            event_type: $scope.event_type,
            event_host: $scope.event_host,

        }).then(function(ref) {
            // var id = ref.key;
            // console.log('Update Contact ' + id);
            $scope.event_name = "";
            $scope.event_type = "";
            $scope.event_host = "";


        });
    }

    $scope.removeEvent = function(event) {
        $scope.events.$remove(event);
    }

    $scope.showEditForm = function(event) {
        $scope.addFormShow = false;
        $scope.editFormShow = true;
        console.log(event);
        $scope.id = event.$id;
        $scope.event_name = event.$id;
        $scope.event_type = event.event_type;
        $scope.event_host = event.event_host;
    }

    $scope.editEvent = function(event) {
        var id = $scope.id;
        console.log(id);

        var record = $scope.events.$getRecord(id);

        record.event_name = $scope.event_name;
        record.event_type = $scope.event_type;
        record.event_host = $scope.event_host;
        //save
        $scope.events.$save(record).then(function(ref) {
            console.log(ref.key);
        });

        $scope.event_name = "";
        $scope.event_type = "";
        $scope.event_host = "";

        $scope.addFormShow = true;
        $scope.editFormShow = false;

    };

    $scope.showGuestForm = function() {
        $scope.editGuestShow = true;
    }


    $scope.goToGuest = function() {
        $location.path('/guest');
    }


    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.')
        }, function(error) {
            // An error happened.
        });
    }



}]);
