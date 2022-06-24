const button = document.querySelector('.button');
button.addEventListener('click', changeBackgroundColor, false);

function changeBackgroundColor() {
  let colorR, colorG, colorB;

  colorR = Math.floor(Math.random() * 256);
  colorG = Math.floor(Math.random() * 256);
  colorB = Math.floor(Math.random() * 256);

  document.body.style.backgroundColor =
    'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';

  outputColorName(colorR, colorG, colorB);
}

function rgbToHex(rgbX) {
  if (Number(rgbX).toString(16).length < 2) {
    return '0' + Number(rgbX).toString(16);
  }
  return Number(rgbX).toString(16);
}

function generateHexColor(colorR, colorG, colorB) {
  return '#' + rgbToHex(colorR) + rgbToHex(colorG) + rgbToHex(colorB);
}

function outputColorName(colorR, colorG, colorB) {
  let colorSystem;
  let ntcMatch;
  let hex = generateHexColor(colorR, colorG, colorB);

  colorSystem = Math.floor(Math.random() * 3) + 1;
  colorSpan = document.querySelector('.span-color');
  switch (colorSystem) {
    case 1:
      colorSpan.innerHTML = 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
      break;
    case 2:
      colorSpan.innerHTML = hex;
      break;
    case 3:
      ntcMatch = ntc.name(hex);
      colorSpan.innerHTML = ntcMatch[1];

      break;
  }
  hex = '';
}
