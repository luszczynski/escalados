angular.module('escalados').factory('EscalaResource', function($resource){
    var resource = $resource('rest/escalas/:EscalaId',{EscalaId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});