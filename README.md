# ajn.js


  Simple, minimalist web framework for [Node.js](http://nodejs.org).

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```js
import  AJN from "ajn-js" 

const app=new AJN()

app.listen(8000,()=>{
    console.log("listening")
})

app.get("/",({req,res})=>{
res.end("hello world!")

})
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 18 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install ajn-js
```


## Features

  * Flexible and Robust routing 
  * Simple and minimalistic syntax
  * Built-in body parser support
  * Built-in typescript support