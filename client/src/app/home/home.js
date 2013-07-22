
angular.module( 'lt.home', [
  'lt.trendComparer',
  'ngUpload'
])

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $http ) {

  $scope.habits = [];

  $scope.uploadComplete = function(content, completed) {
    if (completed && content) {
      if (content.success) {
        $scope.habits = content.habits;
        $('#uploader').val('');
      }
      else {
        alert('Upload failed: ' + content.msg);
      }
    }
  };

})

;