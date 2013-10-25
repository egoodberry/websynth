App.util = {
  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  alert: function(message) {
    window.alert(message);
  }
};
