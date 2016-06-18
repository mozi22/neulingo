

(function(){ 
var helloApp = angular.module("HelloApp", ['ngRoute'])
    .config(function($routeProvider){
    
    $routeProvider.
      when('/', {
        templateUrl: assets.getView(1),
        controller: 'mainController'
      });  
    
    });

helloApp.controller("mainController", [ '$scope','$location', function($scope,$location) {
  $scope.name = "Calvin Hobbes";
}]);





/***********************************************************/
/***********************************************************/
/*********************** TEMPLATES *************************/
/***********************************************************/
/***********************************************************/



helloApp.directive('navBar', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:8000/views/browser/templates/nav_bar.html'
      }
});


})();
