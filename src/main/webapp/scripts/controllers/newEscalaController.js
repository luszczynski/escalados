
angular.module('escalados').controller('NewEscalaController', function ($scope, $location, locationParser, EscalaResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.escala = $scope.escala || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Escalas/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        EscalaResource.save($scope.escala, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Escalas");
    };
});