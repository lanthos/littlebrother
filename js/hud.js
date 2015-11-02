
var HUD = {};

HUD.initialize = function (container){
  'use strict';
  if(typeof container === 'undefined')
    throw new Error('need to provide a container for the Heads Up Display');
  this.container = container;
  this.levelElem = container.querySelector("#level");
  this.highestLevelElem = container.querySelector("#highestlevel");
  this.scoreElem = container.querySelector("#score");
  this.highScoreElem = container.querySelector("#highscore");
  this.timeLeftElem = container.querySelector("#timeleft");

  if (typeof Storage === "undefined"){
    console.log('Web Storage is not supported. Progress will not be saved');
    return this;
  }
  if (localStorage.localHighScore) {
    this.highScoreValue = parseInt(localStorage.localHighScore);
  } else {
    this.highScoreValue = 0;
  }
  this.highScoreElem.innerHTML = this.highScoreValue;
  if (localStorage.localHighestLevel) {
    this.highestLevelValue = Number(localStorage.localHighestLevel);
  } else {
    this.highestLevelValue = 0;
  }
  this.highestLevelElem.innerHTML = this.highestLevelValue;
};

HUD.saveData = function () {
  'use strict';
  if(typeof Storage !== "undefined") {
      localStorage.localHighScore = this.highScoreValue;
      localStorage.localHighestLevel = this.highestLevelValue;
  } else {
    console.log("web storage not supported");
  }
};

HUD.updateTime = function(time){
  'use strict';
  this.timeLeftElem.innerHTML = Math.round(time*100)/100;
};

HUD.updateScore = function (newScore, newLevel) {
  'use strict';
  if(typeof newScore !== 'undefined'){
    if(newScore > 999999){
      newScore = 999999;
    }
    this.scoreElem.innerHTML = newScore;
    if (newScore > this.highScoreValue) {
      this.highScoreValue = newScore;
      this.highScoreElem.innerHTML = newScore;
      this.saveData();
    }
  }

  if(typeof newLevel !== 'undefined'){
    this.levelElem.innerHTML = newLevel;
    if (newLevel > this.highestLevelValue) {
      this.highestLevelValue = newLevel;
      this.highestLevelElem.innerHTML = newLevel;
      this.saveData();
    }
  }
};
