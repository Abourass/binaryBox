import {
  createLabel,
  createInput,
  createSwitch,
  getDotBoxAndContainer,
  calculateMillisecondsWithAnimationOffset
} from './helperFn.js'

export default function BinaryBox(selector, config = {}){
  document.querySelectorAll(selector).forEach((el) => {
    const tempID = el.id;
    createLabel(el, tempID, config.labelClass ? config.labelClass : null);
    createSwitch(el, tempID, createInput(el, tempID));
  });

  const checkBox = (e) => {
    const {checkDot, checkBox, containerDiv} = getDotBoxAndContainer(e);

    checkDot.classList.add('animateBtn-check');                       // Animate the dot (To checked)
    checkBox.classList.add('checked');                                // Change the background of the checkbox to show it's checked

    setTimeout(()=> {                                         // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', `left: ${((config.switchWidth * 2) + 2) || '16'}px;`);  // Set the dot to be where the animation will end
      checkDot.classList.remove('animateBtn-check');          // Stop the animation
      containerDiv.childNodes.forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'input'){                 // Find the input we created and set it to the check value
          node.value = containerDiv.dataset.checkedValue;
        }
      });
      checkDot.addEventListener('click', uncheckBox);   // Add the uncheckBox event listener
      checkBox.addEventListener('click', uncheckBox);

      checkDot.removeEventListener('click', checkBox); // Remove this event listener
      checkBox.removeEventListener('click', checkBox);
    }, config.animationDuration
      ? calculateMillisecondsWithAnimationOffset(config.animationDuration)
      : 250)
  };

  const uncheckBox = (e) => {
    const {checkDot, checkBox, containerDiv} = getDotBoxAndContainer(e);

    checkDot.classList.add('animateBtn-uncheck');                    // Animate the dot (to unchecked)
    checkBox.classList.remove('checked');                     // Remove the background of the checkbox to show it's no longer checked

    setTimeout(()=> {                                        // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', 'left: 0px;');     // Set the dot to be where the animation will end
      checkDot.classList.remove('animateBtn-uncheck');       // Stop the animation
      containerDiv.childNodes.forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'input'){                // Find the input we created and set it to the unchecked value (or blank)
          containerDiv.dataset.uncheckedValue
            ? node.value = containerDiv.dataset.uncheckedValue
            : node.value = ''
        }
      });
      checkDot.addEventListener('click', checkBox);       // Add the checkbox event listener
      checkBox.addEventListener('click', checkDot);

      checkDot.removeEventListener('click', uncheckBox); // Remove this event listener
      checkBox.removeEventListener('click', uncheckBox)
    }, config.animationDuration
      ? calculateMillisecondsWithAnimationOffset(config.animationDuration)
      : 250)
  };

  document.querySelectorAll('.binaryBtn, .binarySwitchContainer').forEach(el => el.addEventListener('click', checkBox));
};
