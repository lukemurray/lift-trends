angular.module( 'liftTrend', [
  'templates-app',
  'templates-common',
  'lt.home',
  'lt.about'
])

.config(function($routeProvider) {
	$routeProvider.when('/home', {
		controller: 'HomeCtrl',
		templateUrl: 'home/home.tpl.html'
	})
	.when('/', { redirectTo: '/home' });
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

