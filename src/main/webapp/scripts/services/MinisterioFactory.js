angular.module('escalados').factory('MinisterioResource', function($resource){
    var resource = $resource('rest/ministerios/:MinisterioId',{MinisterioId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});