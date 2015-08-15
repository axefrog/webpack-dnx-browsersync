# Webpack DNX BrowserSync Plugin

This is a plugin for webpack to integrate webpack and DNX with browserSync. Typically if developing an ASP.NET 5 website without Visual Studio, you need to run `dnx . web` or `dnx . kestrel` to host the website locally for development. If you want to run webpack in watch mode, and browserSync as well, you'll end up with three separate processes you have to manage manually.

This plugin starts browserSync if you're running webpack in watch mode, reloading browserSync when webpack recompiles. It also starts the DNX process in --watch mode and monitors it, restarting it when it exits (as it is designed to do in watch mode) and telling browserSync to reload when that happens.

## Installation

```text
npm install webpack-dnx-browsersync
```

You may also need to install browserSync separately (as it's referenced as a peer dependency). See the [BrowserSync website](http://www.browsersync.io/) for instructions. Hint: `npm install browsersync`.

## Usage

In your `webpack.config.js` file:

```js
var DnxBrowserSyncPlugin = require('webpack-dnx-browsersync');

module.exports = {
  ...

  plugins: [
    new DnxBrowserSyncPlugin(options);
  ]
};
```

The `options` argument is optional. The default values are applied if not specified, and are as follows:

```js
{
  dnx: {
    command: 'web' // the dnx command to run in your project.json file
  },
  browserSync: {
    host: 'localhost',
    port: 3000, // requests to our browserSync server will be at localhost:3000
    proxy: 'localhost:5000' // proxy browserSync requests to our dnx-based web server
  }
}
```

Change the `browserSync.proxy` value if your dnx command runs on a different port.