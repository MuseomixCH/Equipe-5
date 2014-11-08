
var Tissu = (function(){
    var Tissu = {},
        tissuBeacons = [];

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

    function onRange(beaconInfo){
        console.log('onRange----------------------------');
          // Sort beacons by distance.

        
        beaconInfo.beacons.sort(function(beacon1, beacon2) {
            return beacon1.distance > beacon2.distance; });

        tissuBeacons = addTissuIdToBeacons(beaconInfo);

        //console.log(_.first(tissuBeacons));

        
        var targetBeaconId = 2;

        var beacon = findTissuBeaconWithId(tissuBeacons, targetBeaconId);
        var proximity = _.isUndefined(beacon) ? "unknown" : formatProximity(beacon.proximity);

        if (! _.isUndefined(beacon)){
            console.log(beacon.distance);
        }
        console.log(proximity);
    }

    function onError(errorMessage){
        console.log('Range error: ' + errorMessage);
    }

    Tissu.start = function(){
        EstimoteBeacons.requestAlwaysAuthorization();

        EstimoteBeacons.startRangingBeaconsInRegion(
            {}, // Empty region matches all beacons.
            onRange,
            onError);
    }


    return Tissu;
})();