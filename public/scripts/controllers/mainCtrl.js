(function(ns) {
  ns.registerController('MainCtrl', function($scope) {
    $scope.voices = [];

    $scope.arpeggiate = true;
    $scope.arpeggiationSpeed = 200;
    $scope.arpeggioSort = true;
    var frequencies = [];

    var keyboard = new QwertyHancock({ id: "keyboard" });
    keyboard.keyDown = function (_, frequency) {
      if ($scope.arpeggiate) {
        frequencies.push(frequency);
        if ($scope.arpeggioSort) {
          frequencies.sort(numericalSorter);
        }
        playArpeggio();
      }
      else {
        play(frequency);
      }
    };
    keyboard.keyUp = function(_, frequency) {
      for (var i = 0; i < frequencies.length; i++) {
        if (frequencies[i] === frequency) {
          frequencies.splice(i, 1);
        }
      }
    };

    $scope.addVoice = function() {
      $scope.voices.push(new ns.Voice($scope));
    };

    $scope.addVoice(); // default voice

    var play = function(frequency) {
      for (var i = 0; i < $scope.voices.length; i++) {
        $scope.voices[i].play(frequency);
      }
    };

    var playingArpeggio = false;
    var playArpeggio = function() {
      if (playingArpeggio) { return }

      playingArpeggio = true;

      playNext(0);

      playingArpeggio = false;
    };

    var playNext = function(index) {
      play(frequencies[index]);
      if (frequencies.length > 0) {
        index = (index + 1) % frequencies.length;
        setTimeout(function() { playNext(index); }, $scope.arpeggiationSpeed);
      }
    };

    var numericalSorter = function(x, y) {
      return x - y;
    };

    ns.Midi.initialize();
  });
})(App);
