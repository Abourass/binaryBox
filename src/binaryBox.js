class BinaryBox {
  init = (selector = '.binaryBox', config = {}) => {
    if (selector == null){selector = '.binaryBox'}
    const elements = document.querySelectorAll(selector);

    const calculateMilliseconds = (seconds, addMS = null) => {
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
    const addStylesheet = () => {
      let styleNode = document.createElement('style');
      styleNode.textContent = `
    .binaryCheckContainer {
      background: ${config.background || '#eaeaeb'};
      border: 1px solid ${config.background || '#eaeaeb'};
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 34px;
      height: 15px;
      cursor: pointer;
    }
    
    .binaryBtn {
      background: ${config.button || '#fff'};
      border-radius: .65rem;
      width: 16px;
      height: 15px;
      position: relative;
      display: block;
      margin-left: 1px;
      margin-right: 1px;
      transition: all ${config.animationDuration ? calculateMilliseconds(config.animationDuration, 50) :  300}ms linear;
    }
    
    @keyframes slideBtn-right {
      from {left: 0px;}
      to {left: 16px;}
    }
    
    @keyframes slideBtn-left {
      from {left: 16px;}
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
    const getDotBoxAndContainer = (e) => {
      let checkDot, checkBox;
      if (e.currentTarget.tagName.toLowerCase() === 'span'){
        checkDot = e.currentTarget; checkBox = checkDot.parentElement
      } else {
        checkBox = e.currentTarget; checkDot = checkBox.childNodes[0];
      }
      return {checkDot, checkBox, containerDiv: checkBox.parentElement}
    };

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
      const {checkDot, checkBox, containerDiv} = getDotBoxAndContainer(e);

      checkDot.classList.add('animateBtn-check');                       // Animate the dot (To checked)
      checkBox.classList.add('checked');                                // Change the background of the checkbox to show it's checked

      setTimeout(()=> {                                         // Start a timer to remove the animation / the event handler
        checkDot.setAttribute('style', 'left: 16px;');  // Set the dot to be where the animation will end
        checkDot.classList.remove('animateBtn-check');          // Stop the animation
        containerDiv.childNodes.forEach(node => {
          if (node.tagName.toLowerCase() === 'input'){                 // Find the input we created and set it to the check value
            node.value = containerDiv.dataset.checkedValue;
          }
        });
        checkDot.addEventListener('click', uncheckBox);   // Add the uncheckBox event listener
        checkBox.addEventListener('click', uncheckBox);

        checkDot.removeEventListener('click', checkBox); // Remove this event listener
        checkBox.removeEventListener('click', checkBox);
      }, config.animationDuration ? calculateMilliseconds(config.animationDuration) : 250)
    };

    const uncheckBox = (e) => {
      const {checkDot, checkBox, containerDiv} = getDotBoxAndContainer(e);

      checkDot.classList.add('animateBtn-uncheck');                    // Animate the dot (to unchecked)
      checkBox.classList.remove('checked');                     // Remove the background of the checkbox to show it's no longer checked

      setTimeout(()=> {                                        // Start a timer to remove the animation / the event handler
        checkDot.setAttribute('style', 'left: 0px;');     // Set the dot to be where the animation will end
        checkDot.classList.remove('animateBtn-uncheck');       // Stop the animation
        containerDiv.childNodes.forEach(node => {
          if (node.tagName.toLowerCase() === 'input'){                // Find the input we created and set it to the unchecked value (or blank)
            containerDiv.dataset.uncheckedValue
              ? node.value = containerDiv.dataset.uncheckedValue
              : node.value = ''
          }
        });
        checkDot.addEventListener('click', checkBox);       // Add the checkbox event listener
        checkBox.addEventListener('click', checkDot);

        checkDot.removeEventListener('click', uncheckBox); // Remove this event listener
        checkBox.removeEventListener('click', uncheckBox)
      }, config.animationDuration ? calculateMilliseconds(config.animationDuration) : 250)
    };

    addStylesheet();
    document.querySelector('.binaryBtn').addEventListener('click', checkBox);
    document.querySelector('.binaryCheckContainer').addEventListener('click', checkBox);
  };
}

