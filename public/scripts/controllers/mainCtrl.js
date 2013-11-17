(function(ns) {
  ns.registerController('MainCtrl', function($scope) {
    $scope.voices = [];

    var keyboard = new QwertyHancock({ id: "keyboard" });
    keyboard.keyDown = function (_, frequency) {
      play(frequency);
    };

    $scope.addVoice = function() {
      $scope.voices.push(new ns.Voice($scope));
    };

    $scope.addVoice();

    var play = function(frequency) {
      for (var i = 0; i < $scope.voices.length; i++) {
        $scope.voices[i].play(frequency);
      }
    };

    ns.Midi.initialize();

    // var arpeggiator;
    // $scope.arpeggiate = function() {
    // if (oscillator) {
    // arpeggiator = new ns.arpeggiator(oscillator);
    // arpeggiator.start();
    // }
    // };

    // var buildWave = function(voice) {
      // var real = new Float32Array(4096);
      // var imag = new Float32Array(4096);

      // var a1 = 0.0;
      // var b1 = 1.0;

      // var shift = 2 * Math.PI * 0.5;
      // real[1] = a1 * Math.cos(shift) - b1 * Math.sin(shift);
      // imag[1] = a1 * Math.sin(shift) + b1 * Math.cos(shift);
      // // imag[1] = 1.0;

      // ns.audioContext.createPeriodicWave(real, imag);
    // };
  });
})(App);
