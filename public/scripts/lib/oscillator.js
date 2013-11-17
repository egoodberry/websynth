(function(ns) {
  ns.Oscillator = function($scope) {
    this.oscillatorType = 'sine';
    this.detune = 0;

    this._initialize();

    var _this = this;
    $scope.$watch(
      function() {
        return _this.oscillatorType;
      },
      function(newValue, oldValue) {
        _this._oscillator.type = newValue;
      }
    );

    $scope.$watch(
      function() {
        return _this.detune;
      },
      function(newValue, oldValue) {
        _this._oscillator.detune.value = Math.pow(2, 1/12) * newValue;
      }
    );
  };

  ns.Oscillator.prototype._initialize = function() {
    this._oscillator = ns.audioContext.createOscillator();
    this._oscillator.type = this.oscillatorType;
    this._oscillator.start(0);
    this.output = this._oscillator;
  };

  ns.Oscillator.prototype.setFrequency = function(frequency) {
    this._oscillator.frequency.setValueAtTime(frequency, ns.audioContext.currentTime);
  };

  ns.Oscillator.prototype.connect = function(node) {
    this.output.connect(node.input);
  };
})(App);
