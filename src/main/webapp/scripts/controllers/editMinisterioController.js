

angular.module('escalados').controller('EditMinisterioController', function($scope, $routeParams, $location, MinisterioResource , FuncaoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.ministerio = new MinisterioResource(self.original);
            FuncaoResource.queryAll(function(items) {
                $scope.funcoesSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.ministerio.funcoes){
                        $.each($scope.ministerio.funcoes, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.funcoesSelection.push(labelObject);
                                $scope.ministerio.funcoes.push(wrappedObject);
                            }
                        });
                        self.original.funcoes = $scope.ministerio.funcoes;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Ministerios");
        };
        MinisterioResource.get({MinisterioId:$routeParams.MinisterioId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.ministerio);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.ministerio.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Ministerios");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Ministerios");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.ministerio.$remove(successCallback, errorCallback);
    };
    
    $scope.funcoesSelection = $scope.funcoesSelection || [];
    $scope.$watch("funcoesSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.ministerio) {
            $scope.ministerio.funcoes = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.ministerio.funcoes.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});