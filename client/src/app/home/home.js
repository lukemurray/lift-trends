
angular.module( 'lt.home', [
  'lt.trendComparer',
  'ngUpload'
])

.factory('csvImporter', function() {
  return {
    import: function(csv) {
      
    }
  };
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $http, csvImporter ) {

  $scope.habits = [];

  $scope.uploadComplete = function(content, completed) {
    if (completed && content) {
      if (content.success) {
        $scope.habits = content.habits;
      }
      else {
        alert('Upload failed: ' + content.msg);
      }
    }
  };

})

;