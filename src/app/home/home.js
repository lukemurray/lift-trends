
angular.module( 'lt.home', [
  'lt.trendComparer',
  'ngUpload'
])

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $http, $timeout ) {

  $scope.habits = [];
  $scope.dialogOpts = {
    backdropFade: true,
    dialogFade:true
  };

  $scope.showExportInfo = function () {
    $scope.whyInfo = false;
    $scope.exportInfo = !$scope.exportInfo;
    $scope.info = $scope.exportInfo;
  };

  $scope.showWhyInfo = function() {
    $scope.exportInfo = false;
    $scope.whyInfo = !$scope.whyInfo;
    $scope.info = $scope.whyInfo;
  };

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