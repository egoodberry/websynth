(function(ns) {
  ns.Voice = function($scope) {
    this.oscillator = new ns.Oscillator($scope);
    this.amplifier = new ns.Amplifier($scope);
    this.envelope = new ns.EnvelopeGenerator($scope);

    this.oscillator.connect(this.amplifier);
    this.envelope.connect(this.amplifier.amplitude);
    this.amplifier.connect(ns.audioContext.destination);

    this.play = function(frequency) {
      this.oscillator.setFrequency(frequency);
      this.envelope.trigger();
    };
  }
})(App);
