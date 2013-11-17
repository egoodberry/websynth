var App = window.App || {};
App.module = angular.module('app',[]);

App.registerController = function(name, controller) {
  App.module.controller(name, controller);
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;
App.audioContext = new AudioContext();
