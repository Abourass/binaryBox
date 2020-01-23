export const calculateMilliseconds = (seconds, addMS = null) => {
  const secs = seconds.substring(0, seconds.length - 1);
  let ms;
  switch (secs[0]){
    case '.': {
      const parsedMS = secs.substr(1, seconds.length);
      switch (parsedMS.length){
        case 1: { ms = parseInt(`${parsedMS}00`, 10); break; }
        case 2: { ms = parseInt(`${parsedMS}0`, 10); break; }
        case 3: { ms = parseInt(`${parsedMS}`, 10); break; }
        default: {throw new Error('binaryBox only parses up to thousandths of a ms')}
      }
      break;
    }
    default: {
      switch (secs.length){
        case 1: { ms = parseInt(`${secs}000`, 10); break; }
        default: {throw new Error('binaryBox only allows up to 9 seconds')}
      }
    }
  }
  if (addMS){ms += addMS}
  return ms > 50 ? ms - 50 : ms;
};

export const getDotBoxAndContainer = (e) => {
  let checkDot, checkBox;
  if (e.currentTarget.tagName.toLowerCase() === 'span'){
    checkDot = e.currentTarget; checkBox = checkDot.parentElement
  } else {
    checkBox = e.currentTarget; checkDot = checkBox.childNodes[0];
  }
  return {checkDot, checkBox, containerDiv: checkBox.parentElement}
};

export const addStylesheet = (config) => {
  let styleNode = document.createElement('style');
  styleNode.textContent = `
    .binarySwitchContainer {
      background: ${config.background || '#eaeaeb'};
      border: 1px solid ${config.background || '#eaeaeb'};
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: ${config.switchWidth || '34px'};
      height: ${config.switchHeight || '15px'};
      cursor: pointer;
    }
    
    .binaryBtn {
      background: ${config.button || '#fff'};
      border-radius: ${config.dotRadius || '.65rem'};
      width: ${config.dotWidth || '16px'};
      height: ${config.dotHeight || '15px'};
      position: relative;
      display: block;
      margin-left: 1px;
      margin-right: 1px;
      transition: all ${config.animationDuration ? calculateMilliseconds(config.animationDuration, 50) :  300}ms linear;
    }
    
    @keyframes slideBtn-right {
      from {left: 0px;}
      to {left: ${((config.switchWidth * 2) + 2) || '16'}px;}
    }
    
    @keyframes slideBtn-left {
      from {left: ${((config.switchWidth * 2) + 2) || '16'}px;}
      to {left: 0px;}
    }
    
    .checked {
      background: ${config.checkedColor || '#00a28a !important'};
      border: 1px solid ${config.checkedColor || '#00a28a !important'};
    }
    
    .animateBtn-check {
      animation-name: slideBtn-right;
      animation-duration: ${config.animationDuration || '.3s'};
      -webkit-animation-name: slideBtn-right;
      -webkit-animation-duration: ${config.animationDuration || '.3s'};
    }
    
    .animateBtn-uncheck {
      animation-name: slideBtn-left;
      animation-duration: ${config.animationDuration || '.3s'};
      -webkit-animation-name: slideBtn-left;
      -webkit-animation-duration: ${config.animationDuration || '.3s'};
    }
    `;
  document.getElementsByTagName('head')[0].appendChild(styleNode);
};

export const createLabel = (el, forID, labelClass = null) =>{
  if (el.dataset.label){
    const hiddenLabel = document.createElement('label');
    hiddenLabel.setAttribute('for', `${forID}`);
    hiddenLabel.textContent = el.dataset.label;
    if (labelClass){hiddenLabel.classList.add(...labelClass)}
    el.prepend(hiddenLabel)
  }
};

export const createInput = (el, tempID) => {
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = el.id;
  hiddenInput.id = tempID;
  if (el.dataset.uncheckedValue){
    hiddenInput.value = el.dataset.uncheckedValue
  }
  return hiddenInput;
};

export const createSwitch = (el, tempID, inputEl = null, checked = false) => {
  const checkBox = document.createElement('div'),
        checkDot = document.createElement('span');
  checkBox.classList.add('binarySwitchContainer');
  if (checked){
    checkBox.classList.add('checked');
    checkDot.setAttribute('style', `left: 16px;`)
  }
  checkDot.classList.add('binaryBtn');

  if(inputEl){el.append(inputEl)}
  el.id = `grabbed_${tempID}`;
  checkBox.appendChild(checkDot);
  el.appendChild(checkBox)
};

export default {
  calculateMilliseconds,
  getDotBoxAndContainer,
  addStylesheet,
  createLabel,
  createInput,
  createSwitch
}
