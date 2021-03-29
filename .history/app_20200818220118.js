var app = angular.module("app", ["ngRoute", "angularUtils.directives.dirPagination", "angular-loading-bar", "ngFileSaver"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/acoes", {
      templateUrl: "views/acoes.view.html",
      controller: "acoesCtrl"
    })
    .when("/opcoes", {
      templateUrl: "views/opcoes.view.html",
      controller: "opcoesCtrl"
    })
    .when("/series", {
      templateUrl: "views/series.view.html",
      controller: "seriesCtrl"
    })
    .when("/finacoes", {
      templateUrl: "views/finacoes.view.html",
      controller: "finacoesCtrl"
    })

    .otherwise({ redirectTo: '/acoes' });
});
app.run(
  function ($rootScope, $http, $location) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      $rootScope.location = $location;
      //console.log('bosta ' + window.localStorage.getItem('cpf'));
      //if (window.localStorage.getItem('cpf')) {
      //	console.log('temcpf')

      //}
      //else {
      //$location.path('/');

      //}



    });
  });
app.constant('api', {
  url: "http://localhost:5000/api"
  // url: "http://pagamento.ipr.net.br/api"
});
/*app.directive('inputMask', function(){
  return {
    restrict: 'A',
    link: function(scope, el, attrs){
	//	console.log(attrs.inputMask)
      $(el).mask(attrs.inputMask);
    }
  };
});*/