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
</body>
<script src="src/binaryBox.js"></script>
```

## Initialize

```html
<script src="src/binaryBox.js"></script>
<script>
  new BinaryBox().init();
</script>
```

## Config

```html
<script src="src/binaryBox.js"></script>
<script>
  const config = {
    background: '#00a28a',
    button: '#fff',
    animationDuration: '.6s',
    labelClass: 'label'
}
  new BinaryBox().init(null, config);
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
