/* global Controller, Helpers, HUD, Draw */

var mousemoved, gravity, mouseclicked, match3Checker, tileCoordToIndex;

// misc vars
var mouseX = 0;
var mouseY = 0;
var selectedIdx = -1;
var tileOverIdx = -1;
var matches = [];

// match time
var baseLevelTime = 60;
var levelTime = baseLevelTime;

// score vars
var levelScoreMultiplier = 350;
var scoreMultiplier = 6; // this is for beefing up scoring to make people feel awesome
var scoreValue = 0;

//sound vars
audioFormat = Controller.soundFormat();
var noMatchSound = new Audio('sounds/no_match'+ audioFormat);
var yesMatchSound = new Audio('sounds/yes_match'+ audioFormat);
var dropSound = new Audio('sounds/drop_sound'+ audioFormat);
var backgroundMusic = new Audio('sounds/background'+ audioFormat);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4;

const TILE_W = 75;
const TILE_H = 75;
const TILE_GAP = 1;
const TILE_COLS = 8;
const TILE_ROWS = 8;

var tileGrid = [];

var tiles = {};
var tilesCount = 0;

var img = {};
const ORANGE = 0;
img[ORANGE] =document.getElementById("orange");
const GREEN = 1;
img[GREEN] =document.getElementById("green");
const BLUE = 2;
img[BLUE] =document.getElementById("blue");
const PURPLE = 3;
img[PURPLE] =document.getElementById("purple");
const PINK = 4;
img[PINK] =document.getElementById("pink");
const BLANK = 5;
img[BLANK] =document.getElementById("blank");

var InGame = {};
InGame.initialize = function(container, level){
  'use strict';

  // setup drawable surface
  this.canvas = document.createElement('canvas');
  this.canvas.width = 612;
  this.canvas.height = 600;
  container.appendChild(this.canvas);
  Draw.initialize(this.canvas);
  this.drawable = Draw;
  // init input
  this.canvas.addEventListener("mousemove", mousemoved);
  this.canvas.addEventListener("mousedown", mouseclicked);

  // background music setup
  this.backgroundMusic = backgroundMusic;
  // setup game structure
  this.currentLevel = level;
  // if(level > 1){
  //   levelTime *= 1.2;
  // }
  HUD.targetScore.innerHTML = levelScoreMultiplier * level;
  this.start_time = new Date();
  for (var c = 0; c < TILE_COLS; c++){
    for (var r = TILE_ROWS - 1; r >= 0; r--){
      var idxHere = tileCoordToIndex(c, r);
      var tileId = tileGrid[idxHere];
      if(tileId === undefined)
        new_tile(r, c);
        tiles[tilesCount].y = tiles[tilesCount].row * TILE_H + 11;
    } // end r
  }  // end c

  // these next few lines set up our game logic and render to happen 60 times per second
  var framesPerSecond = 10;
  var interval = setInterval(function() {
    gravity();
    match3Checker();
    this.removeClusters();
    this.render();
    if(this.checkFinished()){
      clearInterval(interval);
    }
  }.bind(this), 1000/framesPerSecond);

  this.canvas.font="12px Arial";
  Helpers.playSound(backgroundMusic);
};

InGame.removeClusters = function(){
  'use strict';
  for (var i = 0; i < matches.length; i++){
    matches[i].Type = BLANK;
  }
  matches = [];
  this.render();
};

InGame.checkFinished = function(){
  'use strict';
  var now = new Date();
  var elapsed_time = (now - this.start_time) / 1000;
  // console.log(elapsed_time);
  HUD.updateTime(Math.round(levelTime - elapsed_time));
  if(scoreValue >= this.currentLevel * levelScoreMultiplier){
    Controller.win();
    return true; // we should stop our loop
  }
  if(elapsed_time > levelTime) {
    Controller.lose();
    return true; // we should stop our loop
  }
  // did not win, did not lose, do this again
  return false;
}; // end checkFinished

InGame.render = function(){
  'use strict';
  Draw.colorRect(0, 0, 612, 600, 'black');
  Draw.context.fillStyle = 'white';
  var tilesDrawn = 0
  for(var eachCol=0; eachCol<TILE_COLS; eachCol++) {
    for(var eachRow=0; eachRow<TILE_ROWS; eachRow++) {
      var tileLeftEdgeX = eachCol * TILE_W;
      var tileTopEdgeY = eachRow * TILE_H;


      var idxHere = tileCoordToIndex(eachCol,eachRow);
      var tileId = tileGrid[idxHere];
      var pieceHere = tiles[tileId];
      pieceHere.row = eachRow;
      pieceHere.column = eachCol;
      var x = tileLeftEdgeX + 11;

      if(pieceHere.y != tileTopEdgeY + 11){
        pieceHere.y += 10
      }

      if(pieceHere.y > tileTopEdgeY + 11){
        pieceHere.y = eachRow * TILE_H + 11;
      }

      if (pieceHere.Type == 5)
        x += 20;
      tilesDrawn++;
      Draw.context.drawImage(img[pieceHere.Type], x, pieceHere.y);
      //debug info
      //canvasContext.fillText(eachRow + ", " + eachCol , tileLeftEdgeX+TILE_W/2, tileTopEdgeY+TILE_H);
      //canvasContext.fillText(pieceHere.y , x +TILE_W/2 , pieceHere.y +TILE_H/ 2);


      // not a super efficient way to do this, but c'mon, it's a boardgame!
      // based on exercises you've already done you could optimize this :)
      if(tileOverIdx == idxHere) {
        Draw.outlineRect(tileLeftEdgeX, tileTopEdgeY,
                 TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'green' );
      }
      if(selectedIdx == idxHere) {
        // cutting extra margin from each edge so it won't overlap mouseover tile
        Draw.outlineRect(tileLeftEdgeX+3, tileTopEdgeY+3,
                 TILE_W - TILE_GAP-6, TILE_H - TILE_GAP-6, 'yellow' );
      }
    } // end of for eachRow
  } // end of for eachCol
  // console.log(tilesDrawn)
  // console.log(tilesDrawn)
}; //end render (draw tiles);

gravity = function() {
  'use strict';
  for (var c = 0; c < TILE_COLS; c++){
    for (var r = TILE_ROWS - 1; r >= 0; r--){
      var idxHere = tileCoordToIndex(c, r);
      var tileId = tileGrid[idxHere];
      if(tileId === undefined)
        new_tile(r, c);

      if(!tiles[tileId] || tiles[tileId].Type === BLANK){
        if(r > 0){

          var idxAbove = tileCoordToIndex(c, r-1);

          tileGrid[idxHere] = tileGrid[idxAbove];
          tiles[tileGrid[idxHere]].row = r-1;

          tileGrid[idxAbove] = null;
        } else {
          Helpers.playSound(dropSound);
          new_tile(r, c);
          //tiles[tileId] = null
          //tileGrid[idxHere] = Math.floor(Math.random() * 5);
        }
      }
    } // end rows
  } // end columns
};  // end gravity

match3Checker = function (){
  'use strict';
  var lastSeen = -1;
  var reps = 0;
  for (var r = 0; r < TILE_ROWS; r++){
    lastSeen = -1;
    for (var c = 0; c < TILE_COLS; c++){
      var tile = getTile(r, c);
      if(isFalling(tile)){
        lastSeen =-1
        reps = 0
        break
      }
      var tileLeftEdgeX = (c-s) * TILE_W ;
      var tileTopEdgeY = r * TILE_H;
      //debug stuff
      //outlineRect(tileLeftEdgeX, tileTopEdgeY, TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'red' );

      if (tile.Type == lastSeen && tile.Type != BLANK){

        reps++;
        if (reps >= 2){
          for (var s = 0; s < 3; s++){

          //   tileGrid[tileCoordToIndex(c-s, r)] = BLANK;
            // console.log("tileidx = " + tileCoordToIndex(c-s, r))
            var tileLeftEdgeX = (c-s) * TILE_W ;
            var tileTopEdgeY = r * TILE_H;
            //debug stuff
            //outlineRect(tileLeftEdgeX, tileTopEdgeY, TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'red' );

            matches.push(getTile(r, c-s));
          }
          // console.log("Matched h! " + tile.Type);
          HUD.updateScore(scoreValue += (1 * scoreMultiplier));
        }
      } else {
        lastSeen = tile.Type;
        reps = 0;
      }
    } // end of c
  } // end of r
  lastSeen = -1;
  reps = 0;

  for (var c = 0; c < TILE_COLS; c++){
    lastSeen = -1;
    for (var r = 0; r < TILE_ROWS; r++){
      var tile = getTile(r, c);

      if(isFalling(tile)){
        lastSeen =-1
        reps = 0
        break
      }
      if (tile.Type == lastSeen && tile.Type != BLANK){
        reps++;
        if (reps >= 2){

          for (var s = 0; s < 3; s++){
            var tileLeftEdgeX = c * TILE_W ;
            var tileTopEdgeY = (r -s) * TILE_H;
            Draw.outlineRect(tileLeftEdgeX, tileTopEdgeY, TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'red' );
            // console.log("tileidx = " + tileCoordToIndex(c, r-s))
            matches.push(getTile(r-s, c));
          }
          // console.log("Matched v! " + tile.Type);
          HUD.updateScore(scoreValue += (1 * scoreMultiplier));
        }
      } else {
        lastSeen = tile.Type;
        reps = 0;
      }

    } // end of c
  } // end of r

}; // end of function

function isFalling(tile){
  'use strict';
  var y = tile.row * TILE_H + 11;
  if(tile.y - y !== 0){
    Draw.outlineRect(
      tile.column * TILE_W, tile.y,
      TILE_W - TILE_GAP, TILE_H - TILE_GAP,
      'blue'
    );
    return true;
  }
  for (var r = TILE_ROWS - 1; r >= 0; r--){
    var item = getTile(r, tile.column);
    y = item.row * TILE_H + 11;

    if(item.Type === BLANK || item.y - y > 11){

      Draw.outlineRect(item.column * TILE_W, item.y,
                 TILE_W - TILE_GAP, TILE_H - TILE_GAP, 'orange' );
      return true;
    }
  }
  return false;
}

function getTile(row, column){
  'use strict';
  var gridId = tileCoordToIndex(column, row);
  var tileId = tileGrid[gridId];
  var temptile = tiles[tileId];
  if(!temptile)
    debugger;
  return temptile;
}

function new_tile(row, column){
  'use strict';
  ++tilesCount;
  tiles[tilesCount] = {
    id: tilesCount,
    Type: Math.floor(Math.random() * 5),
    row: row,
    column: column,
    y: 0 - (row * TILE_H + 11)
  };
  var id = tileCoordToIndex(column, row);
  tileGrid[id] = tilesCount;
}


function idxToCR(idx){
  'use strict';
  var col = idx % TILE_COLS;
  var row = Math.floor(idx/TILE_COLS);
  return {"c": col, "r": row};
}

function swap (tile1, tile2) {
  'use strict';
  tileGrid[selectedIdx] = tile1;
  tileGrid[tileOverIdx] = tile2;
  tiles[tile1].y = tiles[tile1].row * TILE_H + 11;
  tiles[tile2].y = tiles[tile2].row * TILE_H + 11;

  var tileOverPos = idxToCR(tileOverIdx);
  var selectedPos = idxToCR(selectedIdx);
  tiles[tile1].column = tileOverPos.c;
  tiles[tile1].row = tileOverPos.r;
  tiles[tile2].column = selectedPos.c;
  tiles[tile2].row = selectedPos.r;
}

var clicked = false;
mouseclicked = function(evt) {
  'use strict';
  clicked = true;
  if(tileOverIdx < 0 || tileOverIdx >= tileGrid.length) { // invalid or off board
    return;
  }

  if(selectedIdx !== -1) {
    var tileOverPos = idxToCR(tileOverIdx);
    var selectedPos = idxToCR(selectedIdx);
    var diffC = Math.abs(tileOverPos.c - selectedPos.c);
    var diffR = Math.abs(tileOverPos.r - selectedPos.r);
    if ((diffC < 2 && diffR === 0) || (diffC === 0 && diffR < 2)){
      swap(tileGrid[tileOverIdx], tileGrid[selectedIdx]);

      match3Checker();
      InGame.render();
      if (matches.length === 0){
        Helpers.playSound(noMatchSound);
        swap(tileGrid[tileOverIdx], tileGrid[selectedIdx]);
      } else {
        Helpers.playSound(yesMatchSound);
      }
    }
    selectedIdx = -1; // forget selection
  } else {
    selectedIdx = tileOverIdx;
  }
  clicked = false;
};

mousemoved = function(evt) {
  'use strict';
  var rect = InGame.canvas.getBoundingClientRect();
  var root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
//  mouseX = evt.clientX - rect.left - root.scrollLeft;
//  mouseY = evt.clientY - rect.top - root.scrollTop;
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
  //if mouse is outside canvas, don't highlight
  if(mouseX < 0 || mouseX > InGame.canvas.width - 15)
    return;

  var tileOverCol = Math.floor(mouseX / TILE_W);
  var tileOverRow = Math.floor(mouseY / TILE_H);
  tileOverIdx = tileCoordToIndex(tileOverCol,tileOverRow);
};

tileCoordToIndex = function(tileCol, tileRow) {
  'use strict';
  return (tileCol + TILE_COLS*tileRow);
};

tileCoordFromIndex = function(index) {
  'use strict';
  var x = index%TILE_COLS;
  var y = Math.floor(index/TILE_COLS);
  return [x, y];
};