
angular.module('escalados').controller('NewMinisterioController', function ($scope, $location, locationParser, MinisterioResource , FuncaoResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.ministerio = $scope.ministerio || {};
    
    $scope.funcoesList = FuncaoResource.queryAll(function(items){
        $scope.funcoesSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("funcoesSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.ministerio.funcoes = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.ministerio.funcoes.push(collectionItem);
            });
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Ministerios/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        MinisterioResource.save($scope.ministerio, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Ministerios");
    };
});