angular.module('escalados').factory('EscaladoResource', function($resource){
    var resource = $resource('rest/escalados/:EscaladoId',{EscaladoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});