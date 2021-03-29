'use strict'

app.controller('dashboardCtrl', ['$scope', '$http', 'api', '$filter', function ($scope, $http, api, $filter) {

	$scope.labels = [];
	$scope.data = [];
	$http.get(api.url + "/LucroMensal").then(function (data) {
		console.log(data)

		angular.forEach(data.data, function (p) {
			$scope.labels.push($filter('date')(p.acoes.dataVenda, "MM/yyyy"));
			$scope.data.push(p.acoes.lucro)
		})

	})

	//$scope.series = ['Opçoes', 'Ações'];




}])



