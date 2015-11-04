/* global HUD, InGame, WinScene, LoseScene*/

var Controller = {};
var audioFormat;

Controller.initialize = function(container){
  'use strict';
  if(typeof container === 'undefined'){
    throw new Error('Controller needs a container element');
  }
  this.container = container;
  this.level = 1;
  HUD.updateScore(0, 1);
};

Controller.mainMenu = function(){
  'use strict';
  this.clearChildren();
  MainMenu(this.container);
};

Controller.lose = function(){
  'use strict';
  LoseScene(this.container);
};

Controller.win = function(){
  'use strict';
  WinScene(this.container);
};

Controller.nextLevel = function(){
  'use strict';
  this.clearChildren();
  InGame.initialize(this.container, this.level);
};

Controller.clearChildren = function(){
  'use strict';
  var cont = this.container;
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }
};

Controller.soundFormat = function() {
  var audio = new Audio();
  if (audio.canPlayType("audio/mp3")){
    this.audioFormat = ".mp3";
  } else {
    this.audioFormat = ".ogg";
  }
  return this.audioFormat;
}