

angular.module('escalados').controller('EditEscaladoController', function($scope, $routeParams, $location, EscaladoResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.escalado = new EscaladoResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Escalados");
        };
        EscaladoResource.get({EscaladoId:$routeParams.EscaladoId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.escalado);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.escalado.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Escalados");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Escalados");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.escalado.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});