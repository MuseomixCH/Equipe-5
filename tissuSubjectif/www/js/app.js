var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.showFirstObjectScreen();
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
        Tissu.start();
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

    showScreen: function(screenId)
    {
        // Hide current screen if set.
        if (this.currentScreenId != null)
        {
            $('#' + this.currentScreenId).hide();
        }

        // Show new screen.
        this.currentScreenId = screenId;
        $('#' + this.currentScreenId).show();
        document.body.scrollTop = 0;
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
        this.showScreen('id-screen-firstObject');
    }

};

app.initialize();