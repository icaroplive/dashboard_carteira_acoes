'use strict'

app.controller('seriesCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {


	$http.get(api.url + '/serie').then(function (data) {
		$scope.data = data.data
		console.log(data.data)
	})



	$scope.editar = function (dados) {
		if (!angular.isUndefined(dados)) {
			$scope.dados = dados;
			$scope.up2 = dados;
			$scope.up = angular.copy(dados);
		}
		else {
			$scope.dados = null;
			$scope.up2 = null;
			$scope.up = null;
		}
		$('#modalupload').modal('show');
	}

	function save(form) {
		$http.post(api.url + '/serie', form).then(function (data) {
			$scope.data.push(data.data);
			$('#modalupload').modal('hide');

		})

	}
	function update(form) {
		$http.put(api.url + '/serie/' + form.serieId, form).then(function (data) {
			console.log(data);
			$scope.data[$scope.data.indexOf($scope.dados)] = data.config.data
			$('#modalupload').modal('hide');
		})
	}
	$scope.salvar = function (form) {

		if (!form.serieId) {
			var data = save(form);
		}
		else { var data = update(form); }
	}

}])



