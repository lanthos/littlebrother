
var Helpers = {
  playSound: function(sound){
    'use strict';
    if (!this.mute){
      sound.play();
    } else {
      return;
    }
  }
};