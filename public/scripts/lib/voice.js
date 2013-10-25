App.voice = {
  _praises: ["exact!", "correcte!", "excellent!", "magnefique!"],
  _reprimands: ["non!", "tort!"],

  say: function(text, speed) {
    meSpeak.speak(String(text), { voice: 'fr', speed: speed || 175 });
  },

  praise: function() {
    var index = Math.floor(Math.random() * _praises.length);
    return _praises[index];
  },

  reprimand: function() {
    var index = Math.floor(Math.random() * _reprimands.length);
    return _reprimands[index];
  }
};
