'use strict'

app.controller('clientesCtrl', ['$scope', '$http', 'api', 'FileSaver', 'Blob', function ($scope, $http, api, FileSaver, Blob) {
	$scope.ativos = true
	$scope.parcelasSelecionadas = [];
	$scope.filtroAtivos = function (x) {
		if ($scope.ativos) {
			if ((x.dt_fim == null || x.dt_fim == '0001-01-01T00:00:00') && (x.dt_inicio != null && x.dt_inicio != '0001-01-01T00:00:00')) { return x }
		}
		else { return x; }

	}
	$scope.grafico = function (dados) {
		$scope.visible = true;
		$scope.nome = dados.nome
		if ($scope.visible) {
			$http.get(api.url + "/graph/" + dados.cpfcnpj).then(function (data) {
				$scope.graph = data.data;
				return data.data;
			})
		}
	}

	$http.get(api.url + '/clientes').then(function (data) {
		//console.log(data)
		$scope.data = data.data
		//console.log($scope.data)

	})
	$http.get(api.url + '/planos').then(function (data) {
		$scope.planos = data.data
		//	console.log($scope.planos)
	})

	function pegarParcelas(dt) {
		$scope.parcelas = null;
		$http.get(api.url + '/parcelas/' + dt.idcad_cliente).then(function (data) {
			$scope.parcelas = data.data
		})
	}



	$scope.editar = function (dados) {
		console.log(dados)
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

	$scope.lista_parcelas = function (dados) {
		pegarParcelas(dados);
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
		$('#modalParcelas').modal('show');
	}

	function save(form) {
		$http.post(api.url + '/clientes', form).then(function (data) {
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
		$http.put(api.url + '/clientes', form).then(function (data) {
			console.log(data);
			$scope.data[$scope.data.indexOf($scope.dados)] = data.data
			//snackbar.create("Dados atualiazdos com sucesso!")
			$('#modalupload').modal('hide');
		})
	}
	$scope.salvar = function (form) {

		if (!form.idcad_cliente) {
			var data = save(form);
		}
		else { var data = update(form); }
	}

	$scope.parcelasSelecionadas = [];

	$scope.cancelarERemoverParcelas = function (cancela = false) {
		$scope.getParcelas();
		if ($scope.parcelasSelecionadas.length > 0) {

			$http.delete(api.url + (cancela ? '/cancelarERemoverParcelas' : '/removerParcelas'), { data: $scope.parcelasSelecionadas, headers: { 'Content-Type': 'application/json;charset=utf-8' } }).then(function (data) {
				if (data.status == 200) {
					angular.forEach($scope.parcelasSelecionadas, function (p) {
						angular.forEach($scope.parcelas, function (pp) {
							if (pp.idfin_movimento == p) { $scope.parcelas.splice($scope.parcelas.indexOf(pp), 1) }
						})
					})
				}
			})
		}
		else { alert('Nenhuma parcela selecionada') }
	}
	$scope.getParcelas = function () {
		$scope.parcelasSelecionadas = []
		for (var i = 0; i <= $scope.parcelas.length - 1; i++) {
			if ($scope.parcelas[i].Selected) { $scope.parcelasSelecionadas.push($scope.parcelas[i].idfin_movimento) }
		}

	}

	$scope.gerarBoletos = function () {
		$scope.getParcelas();
		if ($scope.parcelasSelecionadas.length > 0) {
			if (confirm("Deseja gerar boleto para as parcelas selecionadas?")) {
				console.log($scope.parcelasSelecionadas)
				$http.post(api.url + '/addCobranca', $scope.parcelasSelecionadas).then(function (data) {
					console.log(data)
					angular.forEach(data.data, function (p) {
						angular.forEach($scope.parcelas, function (pp) {
							if (pp.idfin_movimento == p.idfin_movimento) { pp.codigo_barra = p.codigo; pp.Selected = false }
						})
					})
				})
			}
		}
		else { alert('Nenhuma parcela selecionada') }

	}


	$scope.syncBoletos = function () {
		$scope.getParcelas();
		if ($scope.parcelasSelecionadas.length > 0) {
			if (confirm("Deseja sincronizar boleto para as parcelas selecionadas?")) {
				console.log($scope.parcelasSelecionadas)
				$http.put(api.url + '/syncBoleto', $scope.parcelasSelecionadas).then(function (data) {
					console.log(data.data)
					angular.forEach(data.data, function (p) {
						console.log(p)
						angular.forEach($scope.parcelas, function (pp) {
							if (pp.idfin_movimento == p.idfin_movimento && p.sucesso) { pp.Selected = false }
						})
					})
				})
			}
		}
		else { alert('Nenhuma parcela selecionada') }

	}

	$scope.printBoletos = function () {
		$scope.getParcelas();

		if ($scope.parcelasSelecionadas.length > 0) {

			$http.post(api.url + '/pdf', $scope.parcelasSelecionadas).then(function (response) {
				window.location= api.url + "/pdf/" + response.data

			})


		}
		else { alert('Nenhuma parcela selecionada') }

	}



}])



