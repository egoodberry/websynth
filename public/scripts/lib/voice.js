App.voice = {
  _praises: ["exact!", "correcte!", "excellent!", "magnefique!"],
  _reprimands: ["non!", "tort!"],

  say: function(text, speed) {
    meSpeak.speak(String(text), { voice: 'fr', speed: speed || 175 });
  },

  praise: function() {
    var index = Math.floor(Math.random() * this._praises.length)
      , randomPraise = this._praises[index];
    this.say(randomPraise);
  },

  reprimand: function() {
    var index = Math.floor(Math.random() * this._reprimands.length)
      , randomReprimand = this._reprimands[index];
    this.say(randomReprimand);
  }
};
