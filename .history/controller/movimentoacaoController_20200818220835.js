'use strict'

app.controller('movimentoacaoCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {


	$http.get(api.url + '/movimentoacao').then(function (data) {
		$scope.data = data.data
		console.log(data.data)
	})

	$http.get(api.url + '/acao').then(function (data) {
		$scope.acoes = data.data
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
		$http.post(api.url + '/movimentoacao', form).then(function (data) {
			$scope.data.push(data.data);
			//	snackbar.create("Cadastrado com sucesso");
			$('#modalupload').modal('hide');

		})

	}
	function update(form) {
		$http.put(api.url + '/movimentoacao/' + form.acaoId, form).then(function (data) {
			console.log(data);
			$scope.data[$scope.data.indexOf($scope.dados)] = data.data
			//snackbar.create("Dados atualiazdos com sucesso!")
			$('#modalupload').modal('hide');
		})
	}
	$scope.salvar = function (form) {

		if (!form.acaoId) {
			var data = save(form);
		}
		else { var data = update(form); }
	}

}])



