/* global Controller, Helpers, HUD */

var loseSound = new Audio('sounds/lose_sound.mp3');

function LoseScene(container){
  'use strict';
  HUD.updateScore(0, 1);
  Helpers.playSound(loseSound);
  // This can be done much better by making an ajax call
  container.innerHTML = '<div>'+
    '<h3>You Have Lost level '+Controller.level+'</h3>'+
    '<button type="button" class="next-level" >Play a new Game</button>'+
    '<button type="button" class="main-menu" >Return to Main Menu</button>'+
  '</div>';
  container.querySelector('.next-level').addEventListener('click', function(){
    Controller.nextLevel();
  });
  container.querySelector('.main-menu').addEventListener('click', function(){
    Controller.mainMenu();
  });
}
