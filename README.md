<h1 align="center">Welcome to binary-box 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/AntonioBourassa" target="_blank">
    <img alt="Twitter: AntonioBourassa" src="https://img.shields.io/twitter/follow/AntonioBourassa.svg?style=social" />
  </a>
</p>

> Tired of checkboxes not returning values when unchecked? This is the library for you

## Include

```html
<body>
  // Include a div you want your checkbox to show up within (using the class .binaryBox)
  // The input you get when you process the form will have the id you used on this div
  <div id="amAnimal"
       class="binaryBox form-input"
       data-checked-value="weasel"
  ></div>
<div id="typesOfAnimal" class="arrayBox" data-label="What type of animals do you like?">
  <div id="weasel" class="arrayChild" data-label="Weasel" data-checked-value="weasel"></div>
  <div id="cat" class="arrayChild" data-label="Cat" data-checked-value="cat"></div>
  <div id="fish" class="arrayChild" data-label="Fish" data-checked-value="fish"></div>
</div>
<br />
<br />
<div id="superheros" class="arrayBox" data-label="What super hero's powers would you absorb for your own usage?">
  <div id="thor" class="arrayChild" data-label="Thor" data-checked-value="thor"></div>
  <div id="batman" class="arrayChild" data-label="Batman" data-checked-value="batman"></div>
  <div id="godzilla" class="arrayChild" data-label="Godzilla" data-checked-value="godzilla"></div>
  <div id="vision" class="arrayChild" data-label="Vision" data-checked-value="vision"></div>
  <div id="captainUnderpants" class="arrayChild" data-label="Captain Underpants" data-checked-value="captainUnderpants"></div>
</div>
<br />
<br />
<div id="isAlive" class="binaryBox" data-checked-value="true" data-unchecked-value="false" data-label="You are alive?"></div>
<div id="isRobotic" class="binaryBox" data-checked-value="true" data-unchecked-value="false" data-label="You are a cyborg?"></div>
</body>
```

## Initialize

```html
<script type="module">
  import binBoxInit from './src/binBoxInit.js';
  binBoxInit({
    labelClass: 'label',
    arrayLabelClass: 'pseudoLabel'
  });
</script>
```

## Config

```html
<script type="module">
  import binBoxInit from './src/binBoxInit.js';
  const config = {
    background: '#00a28a',
    button: '#fff',
    animationDuration: '.6s',
    labelClass: 'label'
}
  binBoxInit(config);
</script>
```

## Author

👤 **Antonio B.**

* Twitter: [@AntonioBourassa](https://twitter.com/AntonioBourassa)
* Github: [@Abourass](https://github.com/Abourass)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
