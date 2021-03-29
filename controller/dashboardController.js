'use strict'

app.controller('dashboardCtrl', ['$scope', '$http', 'api', '$filter', function ($scope, $http, api, $filter) {

	$scope.labels = [];
	$scope.labels2 = [];
	$scope.data = [];
	$scope.data2 = [];
	$http.get(api.url + "/LucroMensal").then(function (data) {
		console.log(data)

		angular.forEach(data.data.acoes, function (p) {
			$scope.labels.push($filter('date')(p.dataVenda, "MM/yyyy"));
			$scope.data.push(p.lucro)
		})
		angular.forEach(data.data.opcoes, function (p) {
			$scope.labels2.push($filter('date')(p.dataVenda, "MM/yyyy"));
			$scope.data2.push(p.lucro)
		})

	})

	//$scope.series = ['Opçoes', 'Ações'];




}])



