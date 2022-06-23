var colorR, colorG, colorB;
var hex = '';
var ntcMatch;
var colorSystem;

function onClick() {
  colorR = Math.floor(Math.random() * 256);
  colorG = Math.floor(Math.random() * 256);
  colorB = Math.floor(Math.random() * 256);

  document.body.style.backgroundColor =
    'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';

  generateHexColor();

  outputColorName();

  hex = '';
}

var rgbToHex = function (rgbX) {
  var hex = Number(rgbX).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

var generateHexColor = function () {
  hex += '#';
  hex += rgbToHex(colorR);
  hex += rgbToHex(colorG);
  hex += rgbToHex(colorB);
};

var outputColorName = function () {
  colorSystem = Math.floor(Math.random() * 3) + 1;
  switch (colorSystem) {
    case 1:
      document.getElementsByClassName('span-color')[0].innerHTML =
        'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
      break;
    case 2:
      document.getElementsByClassName('span-color')[0].innerHTML = hex;
      break;
    case 3:
      ntcMatch = ntc.name(hex);
      document.getElementsByClassName('span-color')[0].innerHTML = ntcMatch[1];

      break;
  }
};
