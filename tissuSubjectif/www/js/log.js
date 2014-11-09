var L = (function(){
    var L = {},
        domLog = document.getElementById('log');

    L.log = function(toLog){
        domLog.innerHTML = toLog;
    }

    L.apLog = function(toLog){
        //domLog.innerHTML += toLog + "<br>";
    }

    return L;

})();