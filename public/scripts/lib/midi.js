(function(ns) {
  ns.Midi = {
    initialize: function() {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(this.onSuccess, this.onError); //.then( onMIDIStarted)
      }
    },
    onSuccess: function(midi) {
      console.log(midi.inputs());
    },
    onError: function(error) {
      console.log(error);
    }
  };
})(App);
