var states = {
    object_description: "id-screen-object",
    search_cold: "id-screen-locating",
    search_warm: "id-screen-locating"
}

var app = {
    // Application Constructor
    initialize: function() {
        console.log("initialize");
        this.bindEvents();
        this.showScreen();
        Tissu.registerCallbacks(this.onWarm, this.onFound);
    },
    currentId: 1,
    currentSearchId:-1,
    state: states.object_description,
    currentScreenId: 'id-screen-home',
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
        Tissu.start();
    },
    foo: function(){
        console.log("foo-------------------------------------");
    },
    onWarm: function(){
        $('#id-screen-locating .status').html("chaud");
        this.state = states.search_warm;
    },
    onFound: function(){
        this.state = states.object_description;
        this.currentId = this.currentSearchId;
        this.showScreen();
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

    showScreen: function()
    {
        // Hide current screen if set.
        if (this.currentScreenId != null)
        {
            $('#' + this.currentScreenId).hide();
        }

        var screenId = this.state;
        // Show new screen.
        this.currentScreenId = screenId;
        $('#' + this.currentScreenId).show();
        document.body.scrollTop = 0;

        switch(this.state){
            case states.object_description:
                this.populateObjectDescription();
                break;
            case states.search_cold:
                this.populateSearchCold();
                break;
        }
    },

    populateObjectDescription: function(){
        var object = Model.objectForId(this.currentId);
   
        $('#id-screen-object .desc').html(object.description);
        $('#id-screen-object .name').html(object.name);

        var relations = Model.relationsForObjectId(this.currentId);

        $('#id-screen-object .choices').html("");

        var that = this;

        $.each(relations, function(index, relation){
            var element = $(that.createChoiceHTML(relation));

            $('#id-screen-object .choices').append(element);
        });
    },

    populateSearchCold: function(){
        // TODO change map
    },

    createChoiceHTML: function(relation){
        var htm = '<li ';
        htm += 'ontouchend="app.startSearchFor(' + relation.to +  ')">';
        htm += relation.name;
        htm += "</li>"
        return htm;
    },

    startSearchFor: function(id){
        window.alert("next screen " + id);

        var object = Model.objectForId(id);

        this.currentSearchId = id;
        this.state = states.search_cold;
        this.showScreen();
        Tissu.startSearchingForTissuId(object.beaconId);
    }, 

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