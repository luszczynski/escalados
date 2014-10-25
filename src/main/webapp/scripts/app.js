'use strict';

angular.module('escalados',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Escalas',{templateUrl:'views/Escala/search.html',controller:'SearchEscalaController'})
      .when('/Escalas/new',{templateUrl:'views/Escala/detail.html',controller:'NewEscalaController'})
      .when('/Escalas/edit/:EscalaId',{templateUrl:'views/Escala/detail.html',controller:'EditEscalaController'})
      .when('/Escalados',{templateUrl:'views/Escalado/search.html',controller:'SearchEscaladoController'})
      .when('/Escalados/new',{templateUrl:'views/Escalado/detail.html',controller:'NewEscaladoController'})
      .when('/Escalados/edit/:EscaladoId',{templateUrl:'views/Escalado/detail.html',controller:'EditEscaladoController'})
      .when('/Funcaos',{templateUrl:'views/Funcao/search.html',controller:'SearchFuncaoController'})
      .when('/Funcaos/new',{templateUrl:'views/Funcao/detail.html',controller:'NewFuncaoController'})
      .when('/Funcaos/edit/:FuncaoId',{templateUrl:'views/Funcao/detail.html',controller:'EditFuncaoController'})
      .when('/Ministerios',{templateUrl:'views/Ministerio/search.html',controller:'SearchMinisterioController'})
      .when('/Ministerios/new',{templateUrl:'views/Ministerio/detail.html',controller:'NewMinisterioController'})
      .when('/Ministerios/edit/:MinisterioId',{templateUrl:'views/Ministerio/detail.html',controller:'EditMinisterioController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
