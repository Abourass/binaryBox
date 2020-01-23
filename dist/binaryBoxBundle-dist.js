(function () {
// ASSET: binBoxInit.js
var $HuqN$exports = {};

function $wiIP$var$_toConsumableArray(arr) {
  return $wiIP$var$_arrayWithoutHoles(arr) || $wiIP$var$_iterableToArray(arr) || $wiIP$var$_nonIterableSpread();
}

function $wiIP$var$_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function $wiIP$var$_iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function $wiIP$var$_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var $wiIP$export$calculateMilliseconds = function calculateMilliseconds(seconds) {
  var addMS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var secs = seconds.substring(0, seconds.length - 1);
  var ms;

  switch (secs[0]) {
    case '.':
      {
        var parsedMS = secs.substr(1, seconds.length);

        switch (parsedMS.length) {
          case 1:
            {
              ms = parseInt("".concat(parsedMS, "00"), 10);
              break;
            }

          case 2:
            {
              ms = parseInt("".concat(parsedMS, "0"), 10);
              break;
            }

          case 3:
            {
              ms = parseInt("".concat(parsedMS), 10);
              break;
            }

          default:
            {
              throw new Error('binaryBox only parses up to thousandths of a ms');
            }
        }

        break;
      }

    default:
      {
        switch (secs.length) {
          case 1:
            {
              ms = parseInt("".concat(secs, "000"), 10);
              break;
            }

          default:
            {
              throw new Error('binaryBox only allows up to 9 seconds');
            }
        }
      }
  }

  if (addMS) {
    ms += addMS;
  }

  return ms > 50 ? ms - 50 : ms;
};

var $wiIP$export$getDotBoxAndContainer = function getDotBoxAndContainer(e) {
  var checkDot, checkBox;

  if (e.currentTarget.tagName.toLowerCase() === 'span') {
    checkDot = e.currentTarget;
    checkBox = checkDot.parentElement;
  } else {
    checkBox = e.currentTarget;
    checkDot = checkBox.childNodes[0];
  }

  return {
    checkDot: checkDot,
    checkBox: checkBox,
    containerDiv: checkBox.parentElement
  };
};

var $wiIP$export$addStylesheet = function addStylesheet(config) {
  var styleNode = document.createElement('style');
  styleNode.textContent = "\n    .binarySwitchContainer {\n      background: ".concat(config.background || '#eaeaeb', ";\n      border: 1px solid ").concat(config.background || '#eaeaeb', ";\n      border-radius: 1rem;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      width: ").concat(config.switchWidth || '34px', ";\n      height: ").concat(config.switchHeight || '15px', ";\n      cursor: pointer;\n    }\n    \n    .binaryBtn {\n      background: ").concat(config.button || '#fff', ";\n      border-radius: ").concat(config.dotRadius || '.65rem', ";\n      width: ").concat(config.dotWidth || '16px', ";\n      height: ").concat(config.dotHeight || '15px', ";\n      position: relative;\n      display: block;\n      margin-left: 1px;\n      margin-right: 1px;\n      transition: all ").concat(config.animationDuration ? $wiIP$export$calculateMilliseconds(config.animationDuration, 50) : 300, "ms linear;\n    }\n    \n    @keyframes slideBtn-right {\n      from {left: 0px;}\n      to {left: ").concat(config.switchWidth * 2 + 2 || '16', "px;}\n    }\n    \n    @keyframes slideBtn-left {\n      from {left: ").concat(config.switchWidth * 2 + 2 || '16', "px;}\n      to {left: 0px;}\n    }\n    \n    .checked {\n      background: ").concat(config.checkedColor || '#00a28a !important', ";\n      border: 1px solid ").concat(config.checkedColor || '#00a28a !important', ";\n    }\n    \n    .animateBtn-check {\n      animation-name: slideBtn-right;\n      animation-duration: ").concat(config.animationDuration || '.3s', ";\n      -webkit-animation-name: slideBtn-right;\n      -webkit-animation-duration: ").concat(config.animationDuration || '.3s', ";\n    }\n    \n    .animateBtn-uncheck {\n      animation-name: slideBtn-left;\n      animation-duration: ").concat(config.animationDuration || '.3s', ";\n      -webkit-animation-name: slideBtn-left;\n      -webkit-animation-duration: ").concat(config.animationDuration || '.3s', ";\n    }\n    ");
  document.getElementsByTagName('head')[0].appendChild(styleNode);
};

var $wiIP$export$createLabel = function createLabel(el, forID) {
  var labelClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (el.dataset.label) {
    var hiddenLabel = document.createElement('label');
    hiddenLabel.setAttribute('for', "".concat(forID));
    hiddenLabel.textContent = el.dataset.label;

    if (labelClass) {
      var _hiddenLabel$classLis;

      (_hiddenLabel$classLis = hiddenLabel.classList).add.apply(_hiddenLabel$classLis, $wiIP$var$_toConsumableArray(labelClass));
    }

    el.prepend(hiddenLabel);
  }
};

var $wiIP$export$createInput = function createInput(el, tempID) {
  var hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = el.id;
  hiddenInput.id = tempID;

  if (el.dataset.uncheckedValue) {
    hiddenInput.value = el.dataset.uncheckedValue;
  }

  return hiddenInput;
};

var $wiIP$export$createSwitch = function createSwitch(el, tempID) {
  var inputEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var checked = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var checkBox = document.createElement('div'),
      checkDot = document.createElement('span');
  checkBox.classList.add('binarySwitchContainer');

  if (checked) {
    checkBox.classList.add('checked');
    checkDot.setAttribute('style', "left: 16px;");
  }

  checkDot.classList.add('binaryBtn');

  if (inputEl) {
    el.append(inputEl);
  }

  el.id = "grabbed_".concat(tempID);
  checkBox.appendChild(checkDot);
  el.appendChild(checkBox);
};

function $mBHV$export$default(selector) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  document.querySelectorAll(selector).forEach(function (el) {
    var tempID = el.id;
    $wiIP$export$createLabel(el, tempID, config.labelClass ? config.labelClass : null);
    $wiIP$export$createSwitch(el, tempID, $wiIP$export$createInput(el, tempID));
  });

  var checkBox = function checkBox(e) {
    var _getDotBoxAndContaine = $wiIP$export$getDotBoxAndContainer(e),
        checkDot = _getDotBoxAndContaine.checkDot,
        checkBox = _getDotBoxAndContaine.checkBox,
        containerDiv = _getDotBoxAndContaine.containerDiv;

    checkDot.classList.add('animateBtn-check'); // Animate the dot (To checked)

    checkBox.classList.add('checked'); // Change the background of the checkbox to show it's checked

    setTimeout(function () {
      // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', "left: ".concat(config.switchWidth * 2 + 2 || '16', "px;")); // Set the dot to be where the animation will end

      checkDot.classList.remove('animateBtn-check'); // Stop the animation

      containerDiv.childNodes.forEach(function (node) {
        if (node.tagName && node.tagName.toLowerCase() === 'input') {
          // Find the input we created and set it to the check value
          node.value = containerDiv.dataset.checkedValue;
        }
      });
      checkDot.addEventListener('click', uncheckBox); // Add the uncheckBox event listener

      checkBox.addEventListener('click', uncheckBox);
      checkDot.removeEventListener('click', checkBox); // Remove this event listener

      checkBox.removeEventListener('click', checkBox);
    }, config.animationDuration ? $wiIP$export$calculateMilliseconds(config.animationDuration) : 250);
  };

  var uncheckBox = function uncheckBox(e) {
    var _getDotBoxAndContaine2 = $wiIP$export$getDotBoxAndContainer(e),
        checkDot = _getDotBoxAndContaine2.checkDot,
        checkBox = _getDotBoxAndContaine2.checkBox,
        containerDiv = _getDotBoxAndContaine2.containerDiv;

    checkDot.classList.add('animateBtn-uncheck'); // Animate the dot (to unchecked)

    checkBox.classList.remove('checked'); // Remove the background of the checkbox to show it's no longer checked

    setTimeout(function () {
      // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', 'left: 0px;'); // Set the dot to be where the animation will end

      checkDot.classList.remove('animateBtn-uncheck'); // Stop the animation

      containerDiv.childNodes.forEach(function (node) {
        if (node.tagName && node.tagName.toLowerCase() === 'input') {
          // Find the input we created and set it to the unchecked value (or blank)
          containerDiv.dataset.uncheckedValue ? node.value = containerDiv.dataset.uncheckedValue : node.value = '';
        }
      });
      checkDot.addEventListener('click', checkBox); // Add the checkbox event listener

      checkBox.addEventListener('click', checkDot);
      checkDot.removeEventListener('click', uncheckBox); // Remove this event listener

      checkBox.removeEventListener('click', uncheckBox);
    }, config.animationDuration ? $wiIP$export$calculateMilliseconds(config.animationDuration) : 250);
  };

  document.querySelectorAll('.binaryBtn, .binarySwitchContainer').forEach(function (el) {
    return el.addEventListener('click', checkBox);
  });
}

;

function $O87o$var$_toConsumableArray(arr) {
  return $O87o$var$_arrayWithoutHoles(arr) || $O87o$var$_iterableToArray(arr) || $O87o$var$_nonIterableSpread();
}

function $O87o$var$_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function $O87o$var$_iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function $O87o$var$_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function $O87o$export$default(selector) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  document.querySelectorAll(selector).forEach(function (arrayOfSwitches) {
    var tempArrayID = arrayOfSwitches.id;
    $wiIP$export$createLabel(arrayOfSwitches, tempArrayID, config.labelClass ? config.labelClass : null);
    var hiddenInput = $wiIP$export$createInput(arrayOfSwitches, tempArrayID);
    arrayOfSwitches.insertBefore(hiddenInput, arrayOfSwitches.children[1]);
    arrayOfSwitches.id = "arrayed_".concat(tempArrayID);
    arrayOfSwitches.childNodes.forEach(function (childEl) {
      if (childEl.classList && childEl.classList.contains('arrayChild')) {
        var tempChildID = childEl.id;
        var pseudoLabel = document.createElement('span');
        pseudoLabel.innerText = childEl.dataset.label;

        if (config.arrayLabelClass) {
          var _pseudoLabel$classLis;

          (_pseudoLabel$classLis = pseudoLabel.classList).add.apply(_pseudoLabel$classLis, $O87o$var$_toConsumableArray(config.arrayLabelClass));
        }

        childEl.append(pseudoLabel);
        $wiIP$export$createSwitch(childEl, tempChildID, null, childEl.dataset.checked ? childEl.dataset.checked : null);
      }
    });
  });

  var checkBox = function checkBox(e) {
    var _getDotBoxAndContaine = $wiIP$export$getDotBoxAndContainer(e),
        checkDot = _getDotBoxAndContaine.checkDot,
        checkBox = _getDotBoxAndContaine.checkBox,
        containerDiv = _getDotBoxAndContaine.containerDiv;

    var arrayContainer = containerDiv.parentElement;
    checkDot.classList.add('animateBtn-check'); // Animate the dot (To checked)

    checkBox.classList.add('checked'); // Change the background of the checkbox to show it's checked

    setTimeout(function () {
      // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', 'left: 16px;'); // Set the dot to be where the animation will end

      checkDot.classList.remove('animateBtn-check'); // Stop the animation

      arrayContainer.childNodes.forEach(function (node) {
        if (node.tagName && node.tagName.toLowerCase() === 'input') {
          // Find the input we created and set it to the check value
          var valueArray = node.value ? JSON.parse(node.value) : [];

          if (!valueArray.includes(containerDiv.dataset.checkedValue)) {
            valueArray.push(containerDiv.dataset.checkedValue);
            node.value = JSON.stringify(valueArray);
          }
        }
      });
      checkDot.addEventListener('click', uncheckBox); // Add the uncheckBox event listener

      checkBox.addEventListener('click', uncheckBox);
      checkDot.removeEventListener('click', checkBox); // Remove this event listener

      checkBox.removeEventListener('click', checkBox);
    }, config.animationDuration ? $wiIP$export$calculateMilliseconds(config.animationDuration) : 250);
  };

  var uncheckBox = function uncheckBox(e) {
    var _getDotBoxAndContaine2 = $wiIP$export$getDotBoxAndContainer(e),
        checkDot = _getDotBoxAndContaine2.checkDot,
        checkBox = _getDotBoxAndContaine2.checkBox,
        containerDiv = _getDotBoxAndContaine2.containerDiv;

    var arrayContainer = containerDiv.parentElement;
    checkDot.classList.add('animateBtn-uncheck'); // Animate the dot (to unchecked)

    checkBox.classList.remove('checked'); // Remove the background of the checkbox to show it's no longer checked

    setTimeout(function () {
      // Start a timer to remove the animation / the event handler
      checkDot.setAttribute('style', 'left: 0px;'); // Set the dot to be where the animation will end

      checkDot.classList.remove('animateBtn-uncheck'); // Stop the animation

      arrayContainer.childNodes.forEach(function (node) {
        if (node.tagName && node.tagName.toLowerCase() === 'input') {
          // Find the input we created and set it to the unchecked value (or blank)
          var valueArray = JSON.parse(node.value);

          if (valueArray.includes(containerDiv.dataset.checkedValue)) {
            valueArray.splice(valueArray.indexOf(containerDiv.dataset.checkedValue), 1);
            node.value = JSON.stringify(valueArray);
          }
        }
      });
      checkDot.addEventListener('click', checkBox); // Add the checkbox event listener

      checkBox.addEventListener('click', checkDot);
      checkDot.removeEventListener('click', uncheckBox); // Remove this event listener

      checkBox.removeEventListener('click', uncheckBox);
    }, config.animationDuration ? $wiIP$export$calculateMilliseconds(config.animationDuration) : 250);
  };

  document.querySelectorAll('.binaryBtn, .binarySwitchContainer').forEach(function (el) {
    return el.addEventListener('click', checkBox);
  });
}

;

$HuqN$exports = function binBoxInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var arrayContainerSelector = config.arrayBoxSelector ? config.arrayBoxSelector : '.arrayBox';
  var binaryBoxSelector = config.checkBoxSelector ? config.checkBoxSelector : '.binaryBox';
  $wiIP$export$addStylesheet(config);

  if (document.querySelector(arrayContainerSelector)) {
    $O87o$export$default(arrayContainerSelector, config);
  }

  if (document.querySelector(binaryBoxSelector)) {
    $mBHV$export$default(binaryBoxSelector, config);
  }
};

if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS
  module.exports = $HuqN$exports;
} else if (typeof define === "function" && define.amd) {
  // RequireJS
  define(function () {
    return $HuqN$exports;
  });
} else {
  // <script>
  this["binBoxInit"] = $HuqN$exports;
}
})();