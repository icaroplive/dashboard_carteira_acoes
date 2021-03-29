var app = angular.module("app", ["ngRoute", "angularUtils.directives.dirPagination", "angular-loading-bar","ngFileSaver"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/login.view.html",
      controller: "loginCtrl"
    })
    .when("/planos", {
      templateUrl: "views/planos.view.html",
      controller: "planosCtrl"
    })
    .when("/clientes", {
      templateUrl: "views/clientes.view.html",
      controller: "clientesCtrl"
    })
    .when("/devedores", {
      templateUrl: "views/devedores.view.html",
      controller: "devedoresCtrl"
    })
    .when("/logoff", {
      template: "",
      controller: "logoffCtrl"
    })
    .otherwise({ redirectTo: '/' });
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
  url: "http://pagamento.ipr.net.br/api"
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