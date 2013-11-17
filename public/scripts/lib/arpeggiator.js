(function(ns) {
  ns.arpeggiator = function(oscillator) {
    this.phases = 4;

    var arpeggiatorId
      , ARPEGGIATION_STEP = 100
      , arpeggiationPhase = 1
      , arpeggiationBase = oscillator.frequency.value;


    _this = this;
    this.step = function() {
      arpeggiationPhase++;
      if (arpeggiationPhase === _this.phases + 1) {
        arpeggiationPhase = 1;
      }

      var newFrequency;
      if (arpeggiationPhase <= _this.phases / 2 + 1) {
        newFrequency = arpeggiationBase + ((arpeggiationPhase - 1) * ARPEGGIATION_STEP);
      }
      else {
        newFrequency = arpeggiationBase + ((arpeggiationPhase / 2 - 1) * ARPEGGIATION_STEP);
      }

      // console.log(arpeggiationPhase + " : " + newFrequency);

      oscillator.frequency.value = newFrequency;

      arpeggiatorId = setTimeout(_this.step, 200);
    };

    this.start = function() {
      arpeggiatorId = setTimeout(this.step, 200);
    };

    this.stop = function() {
      clearTimeout(arpeggiatorId);
    };

    return this;
  };
})(App);
