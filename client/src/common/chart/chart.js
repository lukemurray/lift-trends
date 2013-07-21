angular.module('common.chart', [])

.directive('lineChart', function() {
	var chart;
	var data = { labels: null, datasets: null };
	var options = {
		animationSteps: 40
	};
	
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'chart/chart.tpl.html',
		scope: {
			labels: '=',
			datasets: '=',
			height: '@'
		},
		controller: function($scope) {

		},
		link: function(scope, element, attrs) {
			
			var ctx = element.find('canvas')[0].getContext('2d');
			chart = new Chart(ctx);

			scope.$watch('labels.length', function(n) {
				data.labels = scope.labels;
				chart.Line(data, options);
			});

			scope.$watch('datasets.length', function(n) {
				data.datasets = scope.datasets;
				chart.Line(data, options);
			});

			scope.$watch('labels', function(n) {
				data.labels = n;
				chart.Line(data, options);
			});

			scope.$watch('datasets', function(n) {
				data.datasets = n;
				chart.Line(data, options);
			});
		}
	};
})

;