import {createLabel, createInput, createSwitch, calculateMilliseconds, getDotBoxAndContainer} from './helperFn.js';

export default function ArrayBox(selector, config = {}){
  document.querySelectorAll(selector).forEach((arrayOfSwitches) => {
    const tempArrayID = arrayOfSwitches.id;

    createLabel(arrayOfSwitches, tempArrayID, config.labelClass ? config.labelClass : null);
    const hiddenInput = createInput(arrayOfSwitches, tempArrayID);
    arrayOfSwitches.insertBefore(hiddenInput, arrayOfSwitches.children[1]);
    arrayOfSwitches.id = `arrayed_${tempArrayID}`;

    arrayOfSwitches.childNodes.forEach((childEl) => {
      if (childEl.classList && childEl.classList.contains('arrayChild')){
        const tempChildID = childEl.id;

        const pseudoLabel = document.createElement('span');
        pseudoLabel.innerText = childEl.dataset.label;
        if(config.arrayLabelClass){
          pseudoLabel.classList.add(...config.arrayLabelClass)
        }
        childEl.append(pseudoLabel);
        createSwitch(childEl, tempChildID, null, childEl.dataset.checked ? childEl.dataset.checked : null);
      }
    });
  });

  const checkBox = (e) => {
    const {checkDot, checkBox, containerDiv} = getDotBoxAndContainer(e);
    const arrayContainer = containerDiv.parentElement;

    checkDot.classList.add('animateBtn-check');                       // Animate the dot (To checked)
    checkBox.classList.add('checked');                                // Change the background of the checkbox to show it's checked

    setTimeout(()=> {                                         // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', 'left: 16px;');     // Set the dot to be where the animation will end
      checkDot.classList.remove('animateBtn-check');          // Stop the animation
      arrayContainer.childNodes.forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'input'){ // Find the input we created and set it to the check value
          let valueArray = node.value ? JSON.parse(node.value) : [];
          if(!valueArray.includes(containerDiv.dataset.checkedValue)){
            valueArray.push(containerDiv.dataset.checkedValue);
            node.value = JSON.stringify(valueArray);
          }
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
    const arrayContainer = containerDiv.parentElement;

    checkDot.classList.add('animateBtn-uncheck');                    // Animate the dot (to unchecked)
    checkBox.classList.remove('checked');                     // Remove the background of the checkbox to show it's no longer checked

    setTimeout(()=> {                                        // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', 'left: 0px;');     // Set the dot to be where the animation will end
      checkDot.classList.remove('animateBtn-uncheck');       // Stop the animation
      arrayContainer.childNodes.forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'input'){// Find the input we created and set it to the unchecked value (or blank)
          let valueArray = JSON.parse(node.value);
          if(valueArray.includes(containerDiv.dataset.checkedValue)){
            valueArray.splice(valueArray.indexOf(containerDiv.dataset.checkedValue), 1)
            node.value = JSON.stringify(valueArray);
          }
        }
      });
      checkDot.addEventListener('click', checkBox);       // Add the checkbox event listener
      checkBox.addEventListener('click', checkDot);

      checkDot.removeEventListener('click', uncheckBox); // Remove this event listener
      checkBox.removeEventListener('click', uncheckBox)
    }, config.animationDuration ? calculateMilliseconds(config.animationDuration) : 250)
  };

  document.querySelectorAll('.binaryBtn, .binarySwitchContainer').forEach(el => el.addEventListener('click', checkBox));
};
