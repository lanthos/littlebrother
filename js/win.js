/* global Controller, HUD, Helpers */

var winSound = new Audio('sounds/win_sound.mp3');
var storyBits = {2:'Walls and haystacks.<br></<br> That\'s all the <b>Storied</b> history of codes and <span class="strike">secrets</span> have amounted to.<br></<br> Just walls and haystacks.', 
5:'Rivers of redacted pages, ink upon ink, <span class="red">blood</span> after <span class="red">blood</span>.<br></<br> We\'ve always known of the monster under the bed.', 
6:'<span class="strike">Always</span> seen through the <span class="under">lies told to comfort</span>, told to <span class="strike">Protect</span>. But the lies hide more than the monster.<br></br> They keep us from wondering what it\'s hiding <i>from</i>.',
11:'Information reigns over an empty <span class="strike">Kingdom</span>.<br></br>The subversive truth, our rumpelstiltskin - <br></br>To learn its name is to <b>steal away</b> its <span class="under">power<span>.'}

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

