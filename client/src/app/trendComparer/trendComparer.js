angular.module('lt.trendComparer', [
	'common.chart'
])
.directive('trendComparer', function() {
	var datesShowing = [];
	var months = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov' ,'Dec'
	];
	
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'trendComparer/trendComparer.tpl.html',
		scope: {
			habits: '=',
			height: '@'
		},
		controller: function($scope) {

			$scope.labels = [];
			$scope.datasets = [];

			$scope.uniqueColors = [
				'rgba(66,139,202,o)','rgba(92,184,92,o)','rgba(240,173,78,o)',
				'rgba(255,102,51,o)','rgba(57,114,73,o)','rgba(243,213,189,o)',
				'rgba(43,187,216,o)','rgba(144,202,119,o)',
				'rgba(192,192,192,o)'
			];

			// default to last 10 weeks
			var now = new Date();
			now.setHours(0);
			now.setMinutes(0);
			var day = now.getDay();
			if (day > 0) {
				diff = now.getDate() - day; // adjust when day is sunday
				now = new Date(now.setDate(diff));				
			}

			for (var i = 9; i >= 0; i--) {
				var d = new Date(now.getTime()- ( (7 * i) *24*60*60*1000));
				datesShowing.push(d);
				$scope.labels.push(months[d.getMonth()] + '/' + d.getDate());
			}

			$scope.selectHabit = function($event, habit, color) {
				var checkbox = $event.target;
				if (checkbox.checked) {
					// go through checkIns and see if any hits our range
					var data = [];
					angular.forEach(datesShowing, function(d, idx) {
						data.push(0);
						angular.forEach(habit.checkIns, function(checkin) {
							var cDate = new Date(checkin.date);
							if (cDate >= d && cDate < new Date(d.getTime() + 7*24*60*60*1000)) {
								data[idx] += 1;
							}
						});
					});
					var rgba = color.replace('o', '0.5');
					var rgb = color.replace('o', '1');

					$scope.datasets.push({
						fillColor : rgba,
						strokeColor : rgb,
						pointrgb : rgb,
						pointStrokeColor : "#fff",
						data : data,
						habitName: habit.name
					});
				}
				else {
					var newSet = [];
					angular.forEach($scope.datasets, function(ds) {
						if (ds.habitName != habit.name) {
							newSet.push(ds);
						}
					});
					$scope.datasets = newSet;
				}
			};
		},
		link: function(scope, element, attrs) {

		}
	};
})
;