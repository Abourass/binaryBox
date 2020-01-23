(function () {var a={};function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};document.querySelectorAll(e).forEach(function(e){var a=e.id;c(e,a,t.labelClass?t.labelClass:null),g(e,a,f(e,a))});var a=function(e){var a=d(e),c=a.checkDot,i=a.checkBox,o=a.containerDiv;c.classList.add("animateBtn-check"),i.classList.add("checked"),setTimeout(function(){c.setAttribute("style","left: 16px;"),c.classList.remove("animateBtn-check"),o.childNodes.forEach(function(e){e.tagName&&"input"===e.tagName.toLowerCase()&&(e.value=o.dataset.checkedValue)}),c.addEventListener("click",n),i.addEventListener("click",n),c.removeEventListener("click",i),i.removeEventListener("click",i)},t.animationDuration?b(t.animationDuration):250)},n=function e(a){var n=d(a),c=n.checkDot,i=n.checkBox,o=n.containerDiv;c.classList.add("animateBtn-uncheck"),i.classList.remove("checked"),setTimeout(function(){c.setAttribute("style","left: 0px;"),c.classList.remove("animateBtn-uncheck"),o.childNodes.forEach(function(e){e.tagName&&"input"===e.tagName.toLowerCase()&&(o.dataset.uncheckedValue?e.value=o.dataset.uncheckedValue:e.value="")}),c.addEventListener("click",i),i.addEventListener("click",c),c.removeEventListener("click",e),i.removeEventListener("click",e)},t.animationDuration?b(t.animationDuration):250)};document.querySelectorAll(".binaryBtn, .binarySwitchContainer").forEach(function(e){return e.addEventListener("click",a)})}var b=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=e.substring(0,e.length-1);switch(a[0]){case".":var i=a.substr(1,e.length);switch(i.length){case 1:t=parseInt("".concat(i,"00"),10);break;case 2:t=parseInt("".concat(i,"0"),10);break;case 3:t=parseInt("".concat(i),10);break;default:throw new Error("binaryBox only parses up to thousandths of a ms");}break;default:switch(a.length){case 1:t=parseInt("".concat(a,"000"),10);break;default:throw new Error("binaryBox only allows up to 9 seconds");}}return n&&(t+=n),t>50?t-50:t};var d=function(e){var t,n;return"span"===e.currentTarget.tagName.toLowerCase()?n=(t=e.currentTarget).parentElement:t=(n=e.currentTarget).childNodes[0],{checkDot:t,checkBox:n,containerDiv:n.parentElement}};var i=function(e){var t=document.createElement("style");t.textContent="\n    .binarySwitchContainer {\n      background: ".concat(e.background||"#eaeaeb",";\n      border: 1px solid ").concat(e.background||"#eaeaeb",";\n      border-radius: 1rem;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      width: 34px;\n      height: 15px;\n      cursor: pointer;\n    }\n    \n    .binaryBtn {\n      background: ").concat(e.button||"#fff",";\n      border-radius: .65rem;\n      width: 16px;\n      height: 15px;\n      position: relative;\n      display: block;\n      margin-left: 1px;\n      margin-right: 1px;\n      transition: all ").concat(e.animationDuration?b(e.animationDuration,50):300,"ms linear;\n    }\n    \n    @keyframes slideBtn-right {\n      from {left: 0px;}\n      to {left: 16px;}\n    }\n    \n    @keyframes slideBtn-left {\n      from {left: 16px;}\n      to {left: 0px;}\n    }\n    \n    .checked {\n      background: ").concat(e.checkedColor||"#00a28a !important",";\n      border: 1px solid ").concat(e.checkedColor||"#00a28a !important",";\n    }\n    \n    .animateBtn-check {\n      animation-name: slideBtn-right;\n      animation-duration: ").concat(e.animationDuration||".3s",";\n      -webkit-animation-name: slideBtn-right;\n      -webkit-animation-duration: ").concat(e.animationDuration||".3s",";\n    }\n    \n    .animateBtn-uncheck {\n      animation-name: slideBtn-left;\n      animation-duration: ").concat(e.animationDuration||".3s",";\n      -webkit-animation-name: slideBtn-left;\n      -webkit-animation-duration: ").concat(e.animationDuration||".3s",";\n    }\n    "),document.getElementsByTagName("head")[0].appendChild(t)};var c=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(e.dataset.label){var a=document.createElement("label");a.setAttribute("for","".concat(t)),a.textContent=e.dataset.label,n&&a.classList.add(n),e.prepend(a)}};var f=function(e,t){var n=document.createElement("input");return n.type="hidden",n.name=e.id,n.id=t,e.dataset.uncheckedValue&&(n.value=e.dataset.uncheckedValue),n};var g=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=document.createElement("div"),i=document.createElement("span");a.classList.add("binarySwitchContainer"),i.classList.add("binaryBtn"),n&&e.append(n),e.id="grabbed_".concat(t),a.appendChild(i),e.appendChild(a)};function j(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};document.querySelectorAll(e).forEach(function(e){var a=e.id;c(e,a,t.labelClass?t.labelClass:null);var n=f(e,a);e.insertBefore(n,e.children[1]),e.id="arrayed_".concat(a),e.childNodes.forEach(function(e){if(e.classList&&e.classList.contains("arrayChild")){var a=e.id,n=document.createElement("span");n.innerText=e.dataset.label,t.arrayLabelClass&&n.classList.add(t.arrayLabelClass),e.append(n),g(e,a)}})});var a=function(e){var a=d(e),i=a.checkDot,c=a.checkBox,r=a.containerDiv,o=r.parentElement;i.classList.add("animateBtn-check"),c.classList.add("checked"),setTimeout(function(){i.setAttribute("style","left: 16px;"),i.classList.remove("animateBtn-check"),o.childNodes.forEach(function(e){if(e.tagName&&"input"===e.tagName.toLowerCase()){var t=e.value?JSON.parse(e.value):[];t.includes(r.dataset.checkedValue)||(t.push(r.dataset.checkedValue),e.value=JSON.stringify(t))}}),i.addEventListener("click",n),c.addEventListener("click",n),i.removeEventListener("click",c),c.removeEventListener("click",c)},t.animationDuration?b(t.animationDuration):250)},n=function e(a){var n=d(a),i=n.checkDot,c=n.checkBox,r=n.containerDiv,o=r.parentElement;i.classList.add("animateBtn-uncheck"),c.classList.remove("checked"),setTimeout(function(){i.setAttribute("style","left: 0px;"),i.classList.remove("animateBtn-uncheck"),o.childNodes.forEach(function(e){if(e.tagName&&"input"===e.tagName.toLowerCase()){var t=JSON.parse(e.value);t.includes(r.dataset.checkedValue)&&(t.splice(t.indexOf(r.dataset.checkedValue),1),e.value=JSON.stringify(t))}}),i.addEventListener("click",c),c.addEventListener("click",i),i.removeEventListener("click",e),c.removeEventListener("click",e)},t.animationDuration?b(t.animationDuration):250)};document.querySelectorAll(".binaryBtn, .binarySwitchContainer").forEach(function(e){return e.addEventListener("click",a)})}a=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=r.arrayBoxSelector?r.arrayBoxSelector:".arrayBox",o=r.checkBoxSelector?r.checkBoxSelector:".binaryBox";i(r),document.querySelector(e)&&j(e,r),document.querySelector(o)&&h(o,r)};if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=a}else if(typeof define==="function"&&define.amd){define(function(){return a})}else{this["binBoxInit"]=a}})();