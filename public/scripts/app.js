var App = window.App || {};
App.module = angular.module('app',[]);

App.registerController = function(name, controller) {
  App.module.controller(name, controller);
};

meSpeak.loadConfig("/scripts/vendor/meSpeak/config.json");
meSpeak.loadVoice("/scripts/vendor/meSpeak/voices/fr.json");
