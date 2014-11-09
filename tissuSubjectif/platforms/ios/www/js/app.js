var states = {
    object_description: "id-screen-object",
    search_cold: "id-screen-locating",
    search_warm: "id-screen-locating",
    visit_end: 'id-screen-end'
}

var currentId = 37; // set start object
var currentSearchId = -1;
var currentScreenId = 'id-screen-home';

var state = states.object_description;

var showScreen = function(){
    // Hide current screen if set.
    $('.style-screen').hide();


    var screenId = this.state;
    // Show new screen.
    currentScreenId = screenId;
    $('#' + currentScreenId).show();
    document.body.scrollTop = 0;

    L.apLog(" " + currentScreenId + " " + state); 

    switch(state){
        case states.object_description:
            populateObjectDescription();
            break;
        case states.search_cold:
            populateSearchCold();
            break;
    }
};

function onWarm(){
    $('#id-screen-locating .status').html("chaud").removeClass('cold').addClass('warm');
    state = states.search_warm;
}

function onFound(){
    //L.apLog("on found");
    if (state == states.object_description) return;

    currentScreenId = state;
    state = states.object_description;
    currentId = currentSearchId;

    //L.apLog(" " + currentScreenId + " " + state);
    //setInterval(showScreen, 60);
    //showScreenFound();

    // danger
    $('.style-screen').hide();


    // Show new screen.
    currentScreenId = state;
    $('#' + currentScreenId).show();
    document.body.scrollTop = 0;

    L.apLog(currentId + " " + currentScreenId + " " + state); 
    populateObjectDescription();
}

function populateObjectDescription(){
    var object = Model.objectForId(this.currentId);

    L.apLog( "popu description " + currentId + " " + object.name);

    $('#id-screen-object .desc').html(object.description);
    $('#id-screen-object .name').html(object.name);

    var relations = Model.relationsForObjectId(currentId);

    $('#id-screen-object .choices').html("");

    if (relations.length == 0){
        $('#id-screen-object .choices').html("la démo est finie, merci!<br>vous pouvez maintenant remplacer un objet");
    }

    $.each(relations, function(index, relation){
        var element = $(createChoiceHTML(relation));

        $('#id-screen-object .choices').append(element);
    });
}

function populateSearchCold(){
    // TODO change map
    $('#id-screen-locating .status').html("froid").removeClass('warm').addClass('cold');
}

function createChoiceHTML(relation){
    var htm = '<li ';
    htm += 'ontouchend="startSearchFor(' + relation.to +  ')">';
    htm += relation.name;
    htm += "</li>"
    return htm;
}

function startSearchFor(id){
    //window.alert("next screen " + id);

    var object = Model.objectForId(id);

    currentSearchId = id;
    state = states.search_cold;
    showScreen();
    Tissu.startSearchingForTissuId(object.beaconId);
}

var app = {
    // Application Constructor
    initialize: function() {
        console.log("initialize");
        this.bindEvents();
        showScreen();
        Tissu.registerCallbacks(onWarm, onFound);
        Tissu.start();
    },
    

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log('##################### device ready...');
        
    },
    foo: function(){
        console.log("foo-------------------------------------");
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // Application data.
    

    // ------------- Public application functions ------------- // 

    showHomeScreen: function()
    {
        this.showScreen('id-screen-home');
    },
    showLocatingScreen: function()
    {
        this.showScreen('id-screen-locating');
    },
    showObjectScreen: function()
    {
        this.showScreen('id-screen-object');
    },
    showFirstObjectScreen: function()
    {
        this.showScreen();
    }

};

app.initialize();