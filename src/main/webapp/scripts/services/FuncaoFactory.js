angular.module('escalados').factory('FuncaoResource', function($resource){
    var resource = $resource('rest/funcaos/:FuncaoId',{FuncaoId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});