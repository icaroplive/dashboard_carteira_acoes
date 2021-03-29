'use strict'

app.controller('devedoresCtrl', ['$scope', '$http', 'api', '$filter', function ($scope, $http, api, $filter) {



	$scope.differenceInDays = function (data) {
		var dataHoje = new Date();
		dataHoje = ($filter("date")(dataHoje, "dd-MM-yyyy"));

		var dt2 = dataHoje.split('-'),
			dt1 = $filter("date")(data, 'dd-MM-yyyy').split('-'),
			one = new Date(dt1[2], dt1[1] - 1, dt1[0]),
			two = new Date(dt2[2], dt2[1] - 1, dt2[0]);
		//console.log(one +" "+ two);

		var millisecondsPerDay = 1000 * 60 * 60 * 24;
		var millisBetween = two.getTime() - one.getTime();
		var days = millisBetween / millisecondsPerDay;

		return Math.floor(days);
	};
	$scope.debito = 0.0;
	$http.get(api.url + '/devedores').then(function (data) {
		console.log(data)
		$scope.data = data.data

		angular.forEach($scope.data, function (p) {
			$scope.debito += p.vlr_cob
		})

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
		$http.put(api.url + '/devedores', form).then(function (data) {
			console.log(data);
			$scope.data[$scope.data.indexOf($scope.dados)] = data.data
			//snackbar.create("Dados atualiazdos com sucesso!")
			$('#modalupload').modal('hide');
		})
	}
	$scope.salvar = function (form) {

		if (!form.idfin_movimento) {
			var data = save(form);
		}
		else { var data = update(form); }
	}




}])



