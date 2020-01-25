import BinaryBox from './binaryBox.js'
import ArrayBox from './arrayBox.js';
import {addStylesheet} from './helperFn.js';

module.exports = function binBoxInit(config = {}){
  const arrayContainerSelector = config.arrayBoxSelector ? config.arrayBoxSelector : '.arrayBox';
  const binaryBoxSelector = config.checkBoxSelector ? config.checkBoxSelector : '.binaryBox';

  addStylesheet(config);

  if(document.querySelector(arrayContainerSelector)){ArrayBox(arrayContainerSelector, config);}
  if (document.querySelector(binaryBoxSelector)){BinaryBox(binaryBoxSelector, config)}

  setTimeout(() => {
    document.querySelectorAll('.is-checked').forEach(el => {
      el.classList.remove('is-checked');
      el.dispatchEvent(
        new MouseEvent('click', {view: window, bubbles: true, cancelable: false,})
      );
    });
  }, 100)
};
