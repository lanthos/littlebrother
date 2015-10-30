/* global Controller, HUD, Helpers */

var winSound = new Audio('sounds/win_sound.mp3');
var storyBits = {2:"Walls and haystacks. That's all the Storied history of codes and secrets have amounted to. Just walls and haystacks.", 
5:"Rivers of redacted pages, ink upon ink, blood after blood. We've always known of the monster under the bed.", 
6:"Always seen through the lies told to comfort, told to Protect. But the lies hide more than the monster."}

function WinScene(container){
  'use strict';
  var bit = storyBits[Controller.level] || '';
  Helpers.playSound(winSound);
  // This can be done much better by making an ajax call.  #TODO need to make this display the story bits better
  container.appendChild(Helpers.generateNode('<div class="center-parent temp-menu"><div>'+
    '<h3>You have beaten level '+Controller.level+'</h3>'+ '<p> ' + bit + '<br></br>' +
    '<button type="button" class="nextLevel" >Play the next Level</button>'+
  '</div></div>'));
  container.querySelector('.nextLevel').addEventListener('click', function(){
    Controller.nextLevel();
  });
  HUD.updateScore(void 0, ++Controller.level);
}

