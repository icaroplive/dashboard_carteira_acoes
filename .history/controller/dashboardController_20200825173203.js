'use strict'

app.controller('dashboardCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {

	$scope.labels = [];
	$http.get(api.url + "/LucroMensal").then(function (data) {
		console.log(data)

		angular.forEach(data.data, function (p) {
			$scope.labels.push(p.dataVenda);
		})

	})

	$scope.series = ['Opçoes', 'Ações'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];



}])



