(function(ns) {
  ns.EnvelopeGenerator = function($scope) {
    this.attack = 0.0;
    this.release = 1.0;
    this.volume = 1;
  };

  ns.EnvelopeGenerator.prototype.trigger = function() {
    var now = ns.audioContext.currentTime;

    this._param.cancelScheduledValues(now);
    this._param.setValueAtTime(0, now);
    var attack = Number(this.attack)
      , release = Number(this.release);
    this._param.linearRampToValueAtTime(this.volume, now + attack);
    this._param.linearRampToValueAtTime(0, now + attack + release);
  };

  ns.EnvelopeGenerator.prototype.connect = function(param) {
    this._param = param;
  };
})(App)
