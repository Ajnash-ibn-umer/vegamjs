# Vegam

  Simple, minimalist web framework for [Node.js](http://nodejs.org).

<!-- [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url] -->



> ⚠️ **Note:** This package is currently in active development and is not yet suitable for production use. It may undergo significant changes, and features are subject to modification. Use it at your own discretion for testing and development purposes only. Contributions and feedback are welcome!
 
## Features

* Flexible and Robust routing
* Simple and minimalistic syntax
* Built-in body parser support
* Built-in typescript support
* middleware support


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 18 or higher is required.

currently only support in esm modules.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

Using npm:

```console
$ npm install vegamjs
```

Using yarn:

```console
$ yarn add vegamjs
```

## Examples

```js
import Vegam from "vegamjs";


const app = new Vegam();

// middleware
app.use((ctx, next) => {
    console.log("in middleware")
  next();
});

//routing
app.get("/", (ctx) => {
  const body = ctx.req.body;

  ctx.res.json("hello world!");
});


app.listen(8000,()=>{
    console.log(`server listening on 8000`);
});


```

### Typescript Example
```ts
import Vegam, { Context } from "vegamjs";


const app = new Vegam({
  routerOptions: {
    caseSensitive: true,
    ignoreTrailingSlash: true,
  },
});

// middleware
app.use((ctx: Context, next) => {
  console.log("in middleware");
  next();
});

//routing
app.get("/", (ctx: Context) => {
  const body = ctx.req.body;

  ctx.res.json("hello world!");
});

app.listen(8000, () => {
  console.log(`server listening on ${8000}`);
});



```

### Plugin
Plugin is a feature to add express middlewares in VegamJs.


```ts

import Vegam from "vegamjs";
import cors from "cors"

const app = new Vegam({
  plugins:[
    // add your middlewares here
    cors()
  ]
});

```


### FileUpload
VegamJs has built-in file-upload support by express-file-uploader. if want to customize default configuration you can change by fileUploadOptions field
```ts

import Vegam from "vegamjs";
import cors from "cors"

const app = new Vegam({
 fileUploadOptions:{
    tempFileDir:"../"
  }
});

```
### Middlewares
VegamJs has middleware support .  app.use() method help to create middleware in vegamJs.
```ts

import Vegam from "vegamjs";
import cors from "cors"

const app = new Vegam();

app.use((ctx,next)=>{
  console.log("it is middleware",ctx.req);
  next()
})

```