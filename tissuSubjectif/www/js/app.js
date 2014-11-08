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
    },
    currentId: 1,
    state: states.object_description,
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
    currentScreenId: 'id-screen-home',

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

    createChoiceHTML: function(relation){
        var htm = '<li ';
        htm += 'ontouchend="app.startSearchFor(' + relation.to +  ')">';
        htm += relation.name;
        htm += "</li>"
        return htm;
    },

    startSearchFor: function(id){
        console.log("next screen " + id);
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