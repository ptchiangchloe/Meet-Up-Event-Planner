'use strict';

angular.module('myApp.contacts', ['ngRoute','ui.bootstrap.datetimepicker','ui.dateTimeInput'])

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

    // $scope.today = function () {
    //             $scope.dt = new Date();
    //         };
    // $scope.mindate = new Date();
    // $scope.dateformat="MM/dd/yyyy";
    // $scope.today();
    // $scope.showcalendar = function ($event) {
    //     $scope.showdp = true;
    // };
    // $scope.showdp = false;

    function startDateBeforeRender($dates) {
        console.log($dates);
        $dates.forEach(function  (date) {
          date.past = false;
        });
        if ($scope.add_end_time) {
            var activeDate = moment($scope.add_end_time);
            console.log(activeDate);
            $dates.filter(function(date) {
                return date.localDateValue() <= activeDate.valueOf()
            }).forEach(function(date) {
                date.selectable = false;
            })
        }
    }

    function endDateBeforeRender($view, $dates) {
        if ($scope.add_start_time) {
            var activeDate = moment($scope.add_start_time).subtract(1, $view).add(1, 'minute');

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
        let datest = $scope.dateRangeStart;
        console.log($scope.add_end_time);
        new Promise(function(resolve) {
          usersRef.set({
              event_type: $scope.event_type,
              event_host: $scope.event_host,
              start_time: $scope.add_start_time.toString().slice(0,11),
              end_time: $scope.add_end_time.toString().slice(0,11),
              location: $scope.location
          });
          resolve();
        })
        .then(function(){
            // var id = ref.key.$id;
            console.log('It\'s a promise');

        });
        $scope.event_name = "";
        $scope.event_type = "";
        $scope.event_host = "";
        $scope.add_start_time = "";
        $scope.add_end_time = "";
        $scope.location = "";
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
        $scope.location = event.location;
    }

    $scope.editEvent = function(event) {
        var id = $scope.id;
        console.log(id);

        var record = $scope.events.$getRecord(id);
        console.log(record);
        record.event_name = $scope.event_name;
        record.event_type = $scope.event_type;
        record.event_host = $scope.event_host;
        record.start_time = $scope.edit_start_time;
        record.end_time = $scope.edit_end_time;
        record.location = $scope.location;
        //save
        $scope.events.$save(record).then(function(ref) {
            console.log(ref.key);
        });

        $scope.event_name = "";
        $scope.event_type = "";
        $scope.event_host = "";
        $scope.edit_start_time = "";
        $scope.edit_end_time = "";
        $scope.location = "";

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
