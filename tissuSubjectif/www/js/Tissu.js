
var Tissu = (function(){
    var Tissu = {};

    function onRange(beaconInfo){
        console.log('onRange----------------------------');
          // Sort beacons by distance.
        beaconInfo.beacons.sort(function(beacon1, beacon2) {
            return beacon1.distance > beacon2.distance; });

        // Generate HTML for beacons.
        $.each(beaconInfo.beacons, function(key, beacon){
            var element = $(createBeaconHTML(beacon));
            $('#id-screen-range .style-beacon-list').append(element);
        });
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