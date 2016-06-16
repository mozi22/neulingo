var helloApp = angular.module("HelloApp", ['ngRoute'])
    .config(function($routeProvider){
    
    $routeProvider.
      when('/', {
        templateUrl: assets.getView(1),
        controller: 'mainController'
      });
  
    
    });

helloApp.controller("mainController", [ '$scope', function($scope) {
  $scope.name = "Calvin Hobbes";
}]);


// helloApp.directive('mainPage', function(){
//       url = assets.getView(1);
//       return {
//         restrict: 'E',
//         scope: false,
//         templateUrl: 'http://localhost/rf/assets/views/template_job.html'
//       }
// });


$('.nativedatepicker').focus(function(event) {
    var currentField = $(this);
    var myNewDate = Date.parse(currentField.val()) || new Date();

    // Same handling for iPhone and Android
    window.plugins.datePicker.show({
        date : myNewDate,
        mode : 'date', // date or time or blank for both
        allowOldDates : true
    }, function(returnDate) {
        var newDate = new Date(returnDate);
        currentField.val(newDate.toString("dd/MMM/yyyy"));

        // This fixes the problem you mention at the bottom of this script with it not working a second/third time around, because it is in focus.
        currentField.blur();
    });
});
