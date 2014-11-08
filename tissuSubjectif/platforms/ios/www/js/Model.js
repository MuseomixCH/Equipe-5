var Model = (function(){
    var Model = {};

    Model.relationsForObjectId = function(objectId){
        var filterF = function(r){
            return r.from === objectId;
        };
        return _.filter(relations, filterF);
    }; 


    Model.objectForId = function(id){
        return _.find(objects, {id: id});
    };

    return Model;
})();