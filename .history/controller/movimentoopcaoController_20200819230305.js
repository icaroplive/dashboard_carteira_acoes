'use strict'

app.controller('movimentoopcaoCtrl', ['$scope', '$http', 'api', function ($scope, $http, api) {

	$scope.lucro = 0.0;
	$http.get(api.url + '/movimentoopcao').then(function (data) {
		$scope.data = data.data
		console.log(data.data)
		angular.forEach($scope.data, function (p) {
			$scope.lucro += (p.valorPremio * p.quantidade)
		})
	})
	$http.get(api.url + '/movimentoacao').then(function (data) {
		console.log(data.data)
		$scope.movimentoAcao = data.data

	})

	$http.get(api.url + '/opcao').then(function (data) {
		$scope.opcoes = data.data
		console.log(data.data)
	})



	$scope.exercicio = function (dt, exercicio) {
		$http.post(api.url + '/exercicio', { movimentoOpcaoId: dt.movimentoOpcaoId, exerceu: exercicio }).then(function (data) {
			console.log(data)
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



