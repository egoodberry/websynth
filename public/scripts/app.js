$(function() {
  initialize();
  bindInputs();
});

function initialize() {
  meSpeak.loadConfig("scripts/mespeak_config.json");

  function loadVoice(id) {
    var fname="scripts/voices/"+id+".json";
    meSpeak.loadVoice(fname);
  }

  loadVoice('fr');
}

function bindInputs() {
  $('#next').click(function() {
    setNumber();
    sayNumber();
  });

  $('#repeat').click(function() {
    sayNumber();
  });

  $('form').submit(function(e) {
    e.preventDefault();

    submitAnswer();
  });

  $('#showanswer').click(function() {
    showAnswer();
  });
}

var numberType, plainNumber, euro, centimes;

function setNumber() {
  numberType = $('[name=numbertype]:checked').val();
  if (numberType === 'currency') {
    euro = getRandomNumber();
    centimes = getRandomNumber(0, 99);
  }
  else {
    plainNumber = getRandomNumber();
  }
}

function getMaximum() {
  return Number($('[name=maximum]:checked').val());
}

function getSpeed() {
  return Number($('#speed').val());
}

function getRandomNumber(min, max) {
  var min = min || 0
    , max = max || getMaximum();
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sayNumber() {
  var speech;
  if (numberType === 'currency') {
    speech = euro + ' euro ' + centimes;
  }
  else {
    speech = plainNumber;
  }
  say(speech, getSpeed());
}

function submitAnswer() {
  var response = $('#answer').val();
  if (response === correctAnswer()) {
    say('exact');
    clearAnswer();
  }
  else {
    say('non');
  }
}

function correctAnswer() {
  if (numberType === 'currency') {
    return euro + '.' + centimes;
  }
  else {
    return String(plainNumber);
  }
}

function showAnswer() {
  var answer = correctAnswer();
  if (answer !== "undefined") {
    alert(correctAnswer());
  }
}

function clearAnswer() {
  $('#answer').val('');
}

function say(text, speed) {
  meSpeak.speak(String(text), { voice: 'fr', speed: speed || 175 });
}
