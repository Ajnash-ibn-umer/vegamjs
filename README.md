# Vegam
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<div align="center">

  ![Screenshot 2024-04-26 at 10 33 35 AM](https://github.com/Ajnash-ibn-umer/vegamjs/assets/93277108/ebc35ec7-c8e3-48e5-ad8b-17ff7669d121)

</div>

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
$ npx create-vegam-app
```

## Examples


```ts
import  { Vegam,Context } from "vegamjs";


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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ajnash-ibn-umer"><img src="https://avatars.githubusercontent.com/u/62911231?v=4?s=100" width="100px;" alt="Ajnash_ibn_umer"/><br /><sub><b>Ajnash_ibn_umer</b></sub></a><br /><a href="https://github.com/Ajnash-ibn-umer/vegamjs/commits?author=Ajnash-ibn-umer" title="Code">💻</a> <a href="https://github.com/Ajnash-ibn-umer/vegamjs/commits?author=Ajnash-ibn-umer" title="Documentation">📖</a> <a href="#data-Ajnash-ibn-umer" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://shyamjith.in/"><img src="https://avatars.githubusercontent.com/u/93277108?v=4?s=100" width="100px;" alt="Shyamjith"/><br /><sub><b>Shyamjith</b></sub></a><br /><a href="https://github.com/Ajnash-ibn-umer/vegamjs/commits?author=shyamexe" title="Code">💻</a> <a href="https://github.com/Ajnash-ibn-umer/vegamjs/commits?author=shyamexe" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!