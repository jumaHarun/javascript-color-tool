const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputClr');
const alteredColor = document.getElementById('alteredClr');
const alteredColorText = document.getElementById('alteredClrText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const toggleBtn = document.getElementById('toggleBtn');
const ligthenText = document.getElementById('ligthenText');
const darkenText = document.getElementById('darkenText');

toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.remove('toggled');
    ligthenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    ligthenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  
  reset();
})

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value;
  
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');
  
  inputColor.style.backgroundColor = '#' + strippedHex;
  
  reset();
})

const isValidHex = (hex) => {
  if(!hex) return false;
  
  const strippedHex = hex.replace('#', '');
  return /^[a-f0-9]{6}$|^[a-f0-9]{3}$/gi.test(strippedHex);
}

const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#', '');
  
  if(strippedHex.length === 3) {
    strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2];
    
  }
  
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);
  
  return {r,g,b}
}

const convertRGBToHex = (r, g, b) => {
  const firstPair = ('0' + r.toString(16)).slice(-2);
  const secondPair = ('0' + g.toString(16)).slice(-2);
  const thirdPair = ('0' + b.toString(16)).slice(-2);
  
  const hex = '#' + firstPair + secondPair + thirdPair;
  return hex;
}

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amount = Math.floor((percentage / 100) * 255);
  
  const increaseWithin0And255 = (hex, amount) => {
    // const newHex = hex + amount;
    // if(newHex > 255) return 255;
    // if(newHex < 0) return 0;
    // return newHex;
    return Math.min(255, Math.max(0, hex + amount))
  }
  
  const newR = increaseWithin0And255(r, amount);
  const newG = increaseWithin0And255(g, amount);
  const newB = increaseWithin0And255(b, amount);
  
  return convertRGBToHex(newR, newG, newB);
}

slider.addEventListener('input', () => {
  if(!isValidHex(hexInput.value)) return;
  
  sliderText.textContent = `${slider.value}%`;
  
  const toggleOption = toggleBtn.classList.contains('toggled')
      ? -slider.value
      : slider.value;
  
  const alteredHex = alterColor(hexInput.value, toggleOption);
  
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`
})

const reset = () => {
  slider.value = 0;
  sliderText.innerText = `0%`;
  let hex = hexInput.value
  const strippedHex = hex.replace('#', '')
  hex = '#' + hex
  alteredColor.style.backgroundColor = hex;
  alteredColorText.innerText = `Altered Color ${hex}`;
}