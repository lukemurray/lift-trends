angular.module('lt.trendComparer', [
	'common.chart'
])
.directive('trendComparer', function() {
	var datesShowing = [];
	var months = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov' ,'Dec'
	];
	var uniqueColors = [
		'rgba(66,139,202,o)','rgba(92,184,92,o)','rgba(240,173,78,o)',
		'rgba(255,102,51,o)','rgba(144,97,194,o)','rgba(145,121,93,o)',
		'rgba(43,187,216,o)','rgba(243,213,189,o)',
		'rgba(144,202,119,o)','rgba(57,114,73,o)',
		'rgba(192,192,192,o)'
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
			$scope.goBackOptions = [
				{ name: '5 weeks', id: 0, groupMonth: false, value: 5 },
				{ name: '10 weeks', id: 1, groupMonth: false, value: 10 },
				{ name: '15 weeks', id: 2, groupMonth: false, value: 15 },
				{ name: '3 months', id: 3, groupMonth: true, value: 3 },
				{ name: '6 months', id: 4, groupMonth: true, value: 6 },
				{ name: '9 months', id: 5, groupMonth: true, value: 9 },
				{ name: '1 year', id: 6, groupMonth: true, value: 12 }
			];
			$scope.goBack = $scope.goBackOptions[1];

			$scope.setupRange = function() {
				// default to last 10 weeks
				var now = new Date();
				now.setHours(0);
				now.setMinutes(0);
				now.setSeconds(0);
				var day = now.getDay();
				if (day > 0) {
					diff = now.getDate() - day; // adjust when day is sunday
					now = new Date(now.setDate(diff));				
				}

				var lbls =[];
				for (var i = $scope.goBack.value - 1; i >= 0; i--) {
					var d = new Date(now.getTime()- ( (7 * i) *24*60*60*1000));
					datesShowing.push(d);
					var lbl = months[d.getMonth()];
					if (!$scope.goBack.groupMonth) {
						lbl = lbl + '/' + d.getDate();
					}
					lbls.push(lbl);
				}
				$scope.labels = lbls;
			};

			$scope.getBackground = function(alpha, $index) {
				return uniqueColors[$index % uniqueColors.length].replace('o', alpha);
			};

			$scope.selectHabit = function($event, habit, $index) {
				var checkbox = $event.target;
				var color = uniqueColors[$index % uniqueColors.length];

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

			$scope.setupRange();
		},
		link: function(scope, element, attrs) {

		}
	};
})
;