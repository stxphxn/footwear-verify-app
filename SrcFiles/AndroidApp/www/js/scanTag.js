var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
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
        //app.receivedEvent('deviceready');

        nfc.addNdefListener(
          function(nfcEvent) {
              var tag = nfcEvent.tag,
                  message = tag.ndefMessage,
                  record = message[0],
                  value;

              if (util.isType(record, ndef.TNF_WELL_KNOWN, ndef.RTD_URI)) {
                  value = ndef.uriHelper.decodePayload(record.payload);

              } else if (util.isType(record, ndef.TNF_WELL_KNOWN, ndef.RTD_TEXT)) {
                  value = ndef.textHelper.decodePayload(record.payload);

              } else {
                  value = JSON.stringify(record);

              }

              alert("Tag successfully scanned");
              localStorage.nid = tag.id;
              localStorage.transaction = value;
              window.location.href ="resultScreen.html"; //direct to check Barcode screen

          }
        );



    },

    // readyToWrite: function() {
    //
    //     nfc.addNdefListener(app.writeNfc);
    // },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },









};
