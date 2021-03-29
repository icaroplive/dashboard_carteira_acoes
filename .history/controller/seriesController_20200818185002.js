'use strict'

app.controller('seriesCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {


	$http.get(api.url + '/serie').then(function (data) {
		$scope.data = data.data
		console.log(data.data)
	})




}])



