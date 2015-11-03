/* global Controller, Draw, HUD, Helpers */

function MainMenu(container){
  'use strict';
  HUD.updateScore(0, 1);
  // This can be done much better by making an ajax call
  container.innerHTML = '<div class="centered">'+
    '<h3>Welcom to Little Brother</h3>'+
    '<button type="button" class="next-level" >Click To Begin Playing</button>'+
    '<br></br> Created by: <br></br>'+
    '<div class="credits">'+
    '<div>Art: Sasha </div>'+
    '<div>Coder types: Sdonai, Sam, Jeremy </div>'+
    '<div>Game Design: Calix </div>'+
    '<div>Music: tbd </div>'+
    '<div>Project lead: Jeremy Kenyon </div>'+
    '<div>You peeps rock!  Thanks for all of the help and hard work. - JK :)</div>' 
  '</div>';
  container.querySelector('.next-level').addEventListener('click', function(){
    Controller.nextLevel();
  });
}

