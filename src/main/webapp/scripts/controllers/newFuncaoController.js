
angular.module('escalados').controller('NewFuncaoController', function ($scope, $location, locationParser, FuncaoResource , MinisterioResource, EscaladoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.funcao = $scope.funcao || {};
    
    $scope.ministerioList = MinisterioResource.queryAll(function(items){
        $scope.ministerioSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("ministerioSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.funcao.ministerio = {};
            $scope.funcao.ministerio.id = selection.value;
        }
    });
    
    $scope.escaladosList = EscaladoResource.queryAll(function(items){
        $scope.escaladosSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("escaladosSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.funcao.escalados = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.funcao.escalados.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Funcaos/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        FuncaoResource.save($scope.funcao, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Funcaos");
    };
});