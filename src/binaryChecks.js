class BinaryCheck {
  init = (selector = '.binaryCheck', config = {}) => {
    if (selector == null){selector = '.binaryCheck'}
    const elements = document.querySelectorAll(selector);

    const calculateMilliseconds = (seconds) => {
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
      return ms > 40 ? ms - 40 : ms;
    };

    let styleNode = document.createElement('style');
    styleNode.textContent = `
    .binaryCheckContainer {
      background: ${config.background || '#000000'};
      border-radius: .55rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 34px;
      height: 17px;
    }
    
    .binaryBtn {
      background: ${config.button || '#d62536'};
      border-radius: .65rem;
      width: 16px;
      height: 15px;
      position: relative;
      display: block;
      margin-left: 1px;
      margin-right: 1px;
    }
    
    @keyframes slideBtn-right {
      from {left: 0px;}
      to {left: 15.55px;}
    }
    
    @keyframes slideBtn-left {
      from {left: 15.55px;}
      to {left: 0px;}
    }
    
    .animateBtn-check {
      animation-name: slideBtn-right;
      animation-duration: ${config.animationDuration || '1s'};
      -webkit-animation-name: slideBtn-right;
      -webkit-animation-duration: ${config.animationDuration || '1s'};
    }
    
    .animateBtn-uncheck {
      animation-name: slideBtn-left;
      animation-duration: ${config.animationDuration || '1s'};
      -webkit-animation-name: slideBtn-left;
      -webkit-animation-duration: ${config.animationDuration || '1s'};
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(styleNode);

    elements.forEach((el) => {
      const tempID = el.id;

      if (el.dataset.label){
        const hiddenLabel = document.createElement('label');
        hiddenLabel.setAttribute('for', `${tempID}`);
        hiddenLabel.textContent = el.dataset.label;
        if (config.labelClass){hiddenLabel.classList.add(config.labelClass)}
        el.appendChild(hiddenLabel)
      }

      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = el.id;
      hiddenInput.id = tempID;
      if (el.dataset.uncheckedValue){
        hiddenInput.value = el.dataset.uncheckedValue
      }

      const checkDiv = document.createElement('div');
      checkDiv.classList.add('binaryCheckContainer');

      const btnSpan = document.createElement('span');
      btnSpan.classList.add('binaryBtn');

      el.appendChild(hiddenInput);
      el.id = `grabbed_${tempID}`;
      checkDiv.appendChild(btnSpan);
      el.appendChild(checkDiv)
    });

    const checkBox = (e) => {
      const targetBox = e.currentTarget;
      targetBox.classList.add('animateBtn-check');
      setTimeout(()=> {
        targetBox.setAttribute('style', 'left: 15.55px;');
        targetBox.classList.remove('animateBtn-check');
        targetBox.parentElement.parentElement.childNodes.forEach(node => {
          if (node.tagName.toLowerCase() === 'input'){
            node.value = targetBox.parentElement.parentElement.dataset.checkedValue;
          }
        });
        targetBox.addEventListener('click', uncheckBox);
        targetBox.removeEventListener('click', checkBox);
      }, calculateMilliseconds(config.animationDuration || 850))
    };

    const uncheckBox = (e) => {
      const targetBox = e.currentTarget;
      targetBox.classList.add('animateBtn-uncheck');
      setTimeout(()=> {
        targetBox.setAttribute('style', 'left: 0px;');
        targetBox.classList.remove('animateBtn-uncheck');
        targetBox.parentElement.parentElement.childNodes.forEach(node => {
          if (node.tagName.toLowerCase() === 'input'){
            targetBox.parentElement.parentElement.dataset.uncheckedValue
              ? node.value = targetBox.parentElement.parentElement.dataset.uncheckedValue
              : node.value = ''
          }
        });
        targetBox.addEventListener('click', checkBox);
        targetBox.removeEventListener('click', uncheckBox);
      }, calculateMilliseconds(config.animationDuration || 850))
    };

    document.querySelector('.binaryBtn').addEventListener('click', checkBox)
  };
}

