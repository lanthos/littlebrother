
var Draw = {};

Draw.initialize = function(canvas){
  'use strict';
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
};

Draw.colorRect = function(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
  'use strict';
  this.context.fillStyle = fillColor;
  this.context.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);

};

Draw.outlineRect = function(topLeftX, topLeftY, boxWidth, boxHeight, lineColor) {
  'use strict';
  this.context.beginPath();
  this.context.strokeStyle = lineColor;
  this.context.lineWidth = "3";
  this.context.rect(topLeftX, topLeftY, boxWidth, boxHeight);
  this.context.stroke();
};
