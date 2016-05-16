var app = angular.module('project', []);
app.controller('projectController',['$scope','$http','$location', function($scope, $http, $location){
  // IMAGENS
  $scope.baseurl = {
    basedir: $location.absUrl(),
    basedirImg: "images/"
  }

  // DESTAQUES
  var products = [];
  $scope.products = [];

  $http ({
    method: 'GET',
    url: 'js/server.js'
  })
  .success(function (data, status, header, config){
    angular.forEach(data, function(value, key){
      $scope.products[key] = data[key];
    });
    //console.log($scope.products);
  })
  .error(function (data, status, header, config){
    console.log(status);
  });

  // MODAL
  // dados do form a serem impressos step3
  $scope.planocontratado = [];
  // dados do form step2
  $scope.formcompra = {
    cod: '',
    plano: '',
    nome: '',
    nasc: '',
    venc: '',
    cpf: ''
  };
  // plano selecionado step1
  $scope.productSel = {
    value: ''
  };
  // toggle form
  $scope.class1 = '';
  $scope.class2 = 'selected';
  $scope.toggle = {
    step1: true,
    step2: false,
    step3: false
  }


  // ativa validacao do form no modal do step2
  $scope.ativaModal = function(){
    init();
  }
  // seleciona plano step1
  $scope.selecionaPlano = function(){
    $scope.formcompra.plano = $scope.productSel.value;
    $scope.toggle.step1 = !$scope.toggle.step1;
    $scope.toggle.step2 = !$scope.toggle.step2;
  }



  $scope.enviar = function() {
    $scope.planocontratado.push({
      'cod': '00000001',
      'plano': $scope.formcompra.plano,
      'nome': $scope.formcompra.nome,
      'nasc': $scope.formcompra.nasc,
      'venc': '10',
      'cpf': cpf
    });
    $scope.toggle.step2 = !$scope.toggle.step2;
    $scope.toggle.step3 = !$scope.toggle.step3;
  }


}]);
