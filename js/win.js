/* global Controller, HUD, Helpers */

var winSound = new Audio('sounds/win_sound.mp3');
var storyBits = {5:"Walls and haystacks.<br></br> That's all the Storied history of codes and secrets have amounted to.<br></br> Just walls and haystacks.", 
10:"Rivers of redacted pages, ink upon ink, blood after blood.<br></br>We've always known of the monster under the bed.", 
15:"Always seen through the lies told to comfort, told to Protect. But the lies hide more than the monster.<br></br> They keep us from wondering what it's hiding <i>from</i>.",
20:"Information reigns over an empty Kingdom.<br></br>The subversive truth, our rumpelstiltskin - <br></br>To learn its name is to steal away its power.",
25:"For all the walls, all the haystacks, the whole of it remains a house of Cards for one simple reason: <br></br>A lock is built to be opened.",
30:"Boxes within boxes; secrets within secrets;<br><br>what you don’t know can’t haunt you<br></br>right?",
35:"If you give a mouse a cookie, it will eat for a day.<br></br>It will learn where the cookies are kept.",
40:"Scratching beneath the floorboards, burrowing in the walls,<br></br>traps and cats can kill, but no cookie is safe forever.",
45:"We are all Americans now.<br></br>We are all on camera, in writing, stored and logged, classified and eyes only.",
50:"We are all suspected, all traitors in the making, all criminals and revolutionaries.<br></br>We are all Americans now.",
55:"May the right hand never know who the left is hurting.<br></br>The magician's assistant is in on the trick;<br></br>dead rabbits are cheaper than magic."
};

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

