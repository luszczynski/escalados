

angular.module('escalados').controller('EditFuncaoController', function($scope, $routeParams, $location, FuncaoResource , MinisterioResource, EscaladoResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.funcao = new FuncaoResource(self.original);
            MinisterioResource.queryAll(function(items) {
                $scope.ministerioSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.funcao.ministerio && item.id == $scope.funcao.ministerio.id) {
                        $scope.ministerioSelection = labelObject;
                        $scope.funcao.ministerio = wrappedObject;
                        self.original.ministerio = $scope.funcao.ministerio;
                    }
                    return labelObject;
                });
            });
            EscaladoResource.queryAll(function(items) {
                $scope.escaladosSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.funcao.escalados){
                        $.each($scope.funcao.escalados, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.escaladosSelection.push(labelObject);
                                $scope.funcao.escalados.push(wrappedObject);
                            }
                        });
                        self.original.escalados = $scope.funcao.escalados;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            $location.path("/Funcaos");
        };
        FuncaoResource.get({FuncaoId:$routeParams.FuncaoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.funcao);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.funcao.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Funcaos");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Funcaos");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.funcao.$remove(successCallback, errorCallback);
    };
    
    $scope.$watch("ministerioSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.funcao.ministerio = {};
            $scope.funcao.ministerio.id = selection.value;
        }
    });
    $scope.escaladosSelection = $scope.escaladosSelection || [];
    $scope.$watch("escaladosSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.funcao) {
            $scope.funcao.escalados = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.funcao.escalados.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});