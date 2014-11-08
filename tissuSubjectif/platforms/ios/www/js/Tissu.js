
var Tissu = (function(){
    var Tissu = {},
        tissuBeacons = [],
        currentTissuId = -1,
        onWarm,
        onFound;

    Tissu.proximityNames = [
        'unknown',
        'immediate',
        'near',
        'far'];


    function formatProximity(proximity){
        if (!proximity) { return 'Unknown'; }

        // Eliminate bad values (just in case).
        proximity = Math.max(0, proximity);
        proximity = Math.min(3, proximity);

        // Return name for proximity.
        return Tissu.proximityNames[proximity];
    }

    function findBeaconDescriptorForBeacon(beacon){
        return _.first(_.filter(beaconDescriptors, function(d){ return d.major === beacon.major }));
    }

    function addTissuIdToBeacons(beaconInfo){
        var beacons = _.map(beaconInfo.beacons, 
                            function(b) { 
                                var beaconDescriptor = findBeaconDescriptorForBeacon(b);
                                if (_.isUndefined(beaconDescriptor)){
                                    return null;
                                }else{
                                    b.tissuId = beaconDescriptor.id;
                                    return b;
                                }});

        beacons = _.reject(beacons, _.isNull);

        return beacons;
    }

    function findTissuBeaconWithId(tissuBeacons, tissuId){
        return _.find(tissuBeacons, {tissuId : tissuId});
    }

    // test cb function, obsolete
    function onRange(beaconInfo){
        console.log('onRange----------------------------');
          // Sort beacons by distance.

        
        beaconInfo.beacons.sort(function(beacon1, beacon2) {
            return beacon1.distance > beacon2.distance; });

        tissuBeacons = addTissuIdToBeacons(beaconInfo);
    
        var beacon = findTissuBeaconWithId(tissuBeacons, currentTissuId);
        var proximity = _.isUndefined(beacon) ? "unknown" : formatProximity(beacon.proximity);

        if(proximity == Tissu.proximityNames[3]){
            onWarm();
        }

        if(proximity == Tissu.proximityNames[1] || proximity == Tissu.proximityNames[1]){
            onFound();
        }

        console.log(proximity);
        
    }

    function onSearch(beaconInfo){
        console.log('onRange----------------------------');
        // Sort beacons by distance.

        
        beaconInfo.beacons.sort(function(beacon1, beacon2) {
            return beacon1.distance > beacon2.distance; });

        tissuBeacons = addTissuIdToBeacons(beaconInfo);
    
        var beacon = findTissuBeaconWithId(tissuBeacons, currentTissuId);
        var proximity = _.isUndefined(beacon) ? "unknown" : formatProximity(beacon.proximity);

        if(proximity == Tissu.proximityNames[3]){
            onWarm();
        }

        if(proximity == Tissu.proximityNames[1] || proximity == Tissu.proximityNames[1]){
            onFound();
        }

        console.log(proximity);
    }

    function onError(errorMessage){
        console.log('Range error: ' + errorMessage);
    }

    Tissu.startSearchingForTissuId = function(tissuId){

        currentTissuId = tissuId;

        EstimoteBeacons.requestAlwaysAuthorization();

        EstimoteBeacons.startRangingBeaconsInRegion(
            {}, // Empty region matches all beacons.
            onSearch,
            onError);
    }

    Tissu.stopSearch = function(){
        EstimoteBeacons.stopRangingBeaconsInRegion({});
    }

    // obsolete
    Tissu.start = function(){
        EstimoteBeacons.requestAlwaysAuthorization();

        EstimoteBeacons.startRangingBeaconsInRegion(
            {}, // Empty region matches all beacons.
            onRange,
            onError);
    }

    Tissu.registerCallbacks = function(onWarmCb, onFoundCb){
        onWarm = onWarmCb;
        onFound = onFoundCb;
    }


    return Tissu;
})();