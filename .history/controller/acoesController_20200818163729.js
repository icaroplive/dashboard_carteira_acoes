'use strict'

app.controller('acoesCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {


	$http.get(api.url + '/acoes').then(function (data) {
		$scope.data = data.data
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
		$http.post(api.url + '/acoes', form).then(function (data) {
			var ew = {
				cliente: {},
				canal: null
			};
			ew.cliente = data.data
			$scope.data.push(ew);
			snackbar.create("Cadastrado com sucesso");
			$('#modalupload').modal('hide');

		})

	}
	function update(form) {
		$http.put(api.url + '/acoes', form).then(function (data) {
			console.log(data);
			$scope.data[$scope.data.indexOf($scope.dados)] = data.data
			//snackbar.create("Dados atualiazdos com sucesso!")
			$('#modalupload').modal('hide');
		})
	}
	$scope.salvar = function (form) {

		if (!form.id) {
			var data = save(form);
		}
		else { var data = update(form); }
	}

}])



