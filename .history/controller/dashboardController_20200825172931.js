'use strict'

app.controller('dashboardCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {

	$http.get(api.url + "/LucroMensal").then(function (data) {
		console.log(data)

	})
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Opçoes', 'Ações'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];



}])



