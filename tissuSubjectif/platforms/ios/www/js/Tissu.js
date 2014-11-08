
var Tissu = (function(){
    var Tissu = {};

    function onRange(beaconInfo){
        console.log('onRange----------------------------');
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