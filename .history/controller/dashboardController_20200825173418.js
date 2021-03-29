'use strict'

app.controller('dashboardCtrl', ['$scope', '$http', 'api', '$filter', function ($scope, $http, api, $filter) {

	$scope.labels = [];
	$http.get(api.url + "/LucroMensal").then(function (data) {
		console.log(data)

		angular.forEach(data.data, function (p) {
			$scope.labels.push($filter('date')(p.dataVenda, "MM/yyyy"));
			console.log(p.dataVenda)
		})

	})

	$scope.series = ['Opçoes', 'Ações'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];



}])



