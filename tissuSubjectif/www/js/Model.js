var Model = (function(){
    var Model = {};

    Model.relationsForObjectId = function(objectId){
        var filterF = function(r){
            return r.from === objectId;
        };
        return _.filter(relations, filterF);
    }; 

    return Model;
})();