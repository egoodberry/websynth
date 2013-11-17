(function(ns) {
  ns.Amplifier = function($scope) {
    this._gain = ns.audioContext.createGain();
    this._gain.gain.value = 0;

    this.output = this._gain;
    this.input = this._gain;

    this.amplitude = this._gain.gain;
  };

  ns.Amplifier.prototype.connect = function(node) {
    this.output.connect(node);
  };
})(App);
