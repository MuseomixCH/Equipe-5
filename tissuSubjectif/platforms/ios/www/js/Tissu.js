
var Tissu = (function(){
    var Tissu = {},
        beacons = [];

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

    function onRange(beaconInfo){
        console.log('onRange----------------------------');
          // Sort beacons by distance.

        
        beaconInfo.beacons.sort(function(beacon1, beacon2) {
            return beacon1.distance > beacon2.distance; });

        beacons = addTissuIdToBeacons(beaconInfo);


        console.log(_.first(beacons));

 
        //displayBeconInfo(beaconInfo);
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