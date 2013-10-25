(function(ns) {
  ns.registerController('MainCtrl', function($scope) {
    var plainNumber, euro, centimes = null;

    $scope.response = null;
    $scope.numberSpoken = false;
    $scope.stars = [];

    $scope.speed = 100;
    $scope.maximum = 100;
    $scope.numberType = "plain";

    $scope.newNumber = function() {
      setNumber();
      $scope.sayNumber();
    };

    $scope.sayNumber = function() {
      var speech;
      if ($scope.numberType === 'currency') {
        speech = euro + ' euro ' + centimes;
      }
      else {
        speech = plainNumber;
      }
      ns.voice.say(speech, $scope.speed);
      $scope.numberSpoken = true;
    };

    $scope.respond = function() {
      if ($scope.response === correctResponse()) {
        ns.voice.praise();
        $scope.addStar();
        clearResponse();
      }
      else {
        ns.voice.reprimand();
        $scope.removeStar();
      }
    };

    $scope.showAnswer = function() {
      ns.util.alert(correctResponse());
      clearResponse();
    };

    $scope.disableMaximum = function() {
      return $scope.numberType === 'year';
    };

    $scope.addStar = function() {
      $scope.stars.push({ number: $scope.stars.length + 1 });
    };

    $scope.removeStar = function() {
      $scope.stars.pop();
    };

    function setNumber() {
      if ($scope.numberType === 'currency') {
        euro = ns.util.randomNumber(0, $scope.maximum);
        centimes = ns.util.randomNumber(0, 99);
      }
      else if ($scope.numberType === 'year') {
        plainNumber = ns.util.randomNumber(1000, 2100);
      }
      else {
        plainNumber = ns.util.randomNumber(0, $scope.maximum);
      }
    }

    function correctResponse() {
      if ($scope.numberType === 'currency') {
        return euro + '.' + centimes;
      }
      else {
        return String(plainNumber);
      }
    }

    function clearResponse() {
      $scope.response = null;
      plainNumber = null;
      euro = null;
      centimes = null;

      $scope.numberSpoken = false;
    }
  });
})(App);
