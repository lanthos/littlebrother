/* global Controller, Draw, HUD, Helpers */

function MainMenu(container){
  'use strict';
  HUD.updateScore(0, 1);
  // This can be done much better by making an ajax call
  container.innerHTML = '<div class="centered">'+
    '<h3>Welcom to Little Brother</h3>'+
    '<button type="button" class="next-level" >Click To Begin Playing</button>'+
  '</div>';
  container.querySelector('.next-level').addEventListener('click', function(){
    Controller.nextLevel();
  });
}

