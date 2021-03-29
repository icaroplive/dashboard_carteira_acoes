'use strict'

app.controller('movimentoopcaoCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {


	$http.get(api.url + '/movimentoopcao').then(function (data) {
		$scope.data = data.data
		console.log(data.data)
	})

	$http.get(api.url + '/opcao').then(function (data) {
		$scope.opcoes = data.data
		console.log(data.data)
	})

	$scope.pegarMovimentoAcaoPorAcaoId = function (acaoId) {
		$http.get(api.url + '/movimentoopcao/acaoId').then(function (data) {
			console.log(data);

		})
	}



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
		$http.post(api.url + '/movimentoopcao', form).then(function (data) {
			$scope.data.push(data.data);
			//	snackbar.create("Cadastrado com sucesso");
			$('#modalupload').modal('hide');

		})

	}
	function update(form) {
		$http.put(api.url + '/movimentoopcao/' + form.movimentoOpcaoId, form).then(function (data) {
			console.log(data);
			$scope.data[$scope.data.indexOf($scope.dados)] = data.data
			//snackbar.create("Dados atualiazdos com sucesso!")
			$('#modalupload').modal('hide');
		})
	}
	$scope.salvar = function (form) {

		if (!form.movimentoOpcaoId) {
			var data = save(form);
		}
		else { var data = update(form); }
	}

}])



