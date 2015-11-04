
var Helpers = {
  playSound: function(sound){
    'use strict';
    if (!Controller.mute){
      sound.play();
    } else {
      return;
    }
  },
  generateNode: function(html){
    'use strict';
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.firstChild;
  }
};