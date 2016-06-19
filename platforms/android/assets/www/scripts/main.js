

(function(){ 
var helloApp = angular.module("HelloApp", ['ngRoute'])
    .config(function($routeProvider){
    
    $routeProvider.
      when('/', {
        templateUrl: assets.getView(1),
        controller: 'mainController'
      }).when('/dashboard', {
        templateUrl: assets.getView(2),
        controller: 'dashboardController'
      }).when('/settings', {
        templateUrl: assets.getView(4),
        controller: 'dashboardController'
      }).when('/shops', {
        templateUrl: assets.getView(3),
        controller: 'dashboardController'
      });  
    
    });

helloApp.controller("mainController", [ '$scope','$location', function($scope,$location) {
  $scope.name = "Calvin Hobbes";
}]);
helloApp.controller("dashboardController", [ '$scope','$location', function($scope,$location) {
  $scope.go = function(){
    alert("mozi");
  }
}]);


setTimeout(function(){

$('.morebutton').click(function(){
  var body = $("html, body");
  body.stop().animate({scrollTop:700}, '500', 'swing', function() { 
  });
});
},1000);

/***********************************************************/
/***********************************************************/
/*********************** TEMPLATES *************************/
/***********************************************************/
/***********************************************************/

var port = 8001;

helloApp.directive('navBar', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/nav_bar.html'
      }
});
helloApp.directive('mainPageIntro', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/main_page_intro.html'
      }
});

helloApp.directive('loginPopup', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/login_popup.html'
      }
});

helloApp.directive('heroboard', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/heroboard.html'
      }
});
helloApp.directive('navBarLoggedIn', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/nav_bar_logged_in.html'
      }
});
helloApp.directive('recentJobs', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/recent_jobs.html'
      }
});
helloApp.directive('userTypeSelectionCard', function(){
      return {
        restrict: 'E',
        scope: false,
        templateUrl: 'http://localhost:' +  port + '/views/browser/templates/user_type_selection_card.html'
      }
});


setTimeout(function(){
    Dropzone.autoDiscover = false;
    $("#dZUpload").dropzone({
        url: "hn_SimpeFileUploader.ashx",
        addRemoveLinks: true,
        success: function (file, response) {
            var imgName = response;
            file.previewElement.classList.add("dz-success");
            console.log("Successfully uploaded :" + imgName);
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        }
    });     



},1000);

})();
