
angular.module('escalados').controller('NewEscaladoController', function ($scope, $location, locationParser, EscaladoResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.escalado = $scope.escalado || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Escalados/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EscaladoResource.save($scope.escalado, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Escalados");
    };
});