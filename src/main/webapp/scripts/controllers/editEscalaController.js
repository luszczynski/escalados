

angular.module('escalados').controller('EditEscalaController', function($scope, $routeParams, $location, EscalaResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.escala = new EscalaResource(self.original);
        };
        var errorCallback = function() {
            $location.path("/Escalas");
        };
        EscalaResource.get({EscalaId:$routeParams.EscalaId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.escala);
    };

    $scope.save = function() {
        var successCallback = function(){
            $scope.get();
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        };
        $scope.escala.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Escalas");
    };

    $scope.remove = function() {
        var successCallback = function() {
            $location.path("/Escalas");
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError=true;
        }; 
        $scope.escala.$remove(successCallback, errorCallback);
    };
    
    
    $scope.get();
});