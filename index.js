var browserSync = require('browser-sync');
var child_process = require('child_process');

function DnxBrowserSyncPlugin(options) {
  this.options = options || {};
  this.isWebpackWatching = false;
  this.isBrowserSyncRunning = false;
  if(!this.options.dnx) this.options.dnx = {};
  if(!this.options.dnx.command) this.options.dnx.command = 'web';
  if(!this.options.browserSync) this.options.browserSync = {};
  if(!this.options.host) this.options.browserSync.host = 'localhost';
  if(!this.options.port) this.options.browserSync.port = 3000;
  if(!this.options.proxy) this.options.browserSync.proxy = 'localhost:5000';
}

DnxBrowserSyncPlugin.prototype.apply = function(compiler) {
  var self = this;

  function startDnx() {
    child = child_process.spawn("dnx", ['.', '--watch', self.options.dnx.command], {
        stdio: 'inherit'
    });
    child.on('exit', startDnx);
    if(self.isBrowserSyncRunning) {
      setTimeout(function() {
        browserSync.reload();
      }, 500);
    }
  }
  
  compiler.plugin('watch-run', function (watching, callback) {
    startDnx();
    self.isWebpackWatching = true;
    callback(null, null);
  });

  compiler.plugin('done', function() {
    if(self.isWebpackWatching) {
      if(self.isBrowserSyncRunning) {
        browserSync.reload();
      }
      else {
        if(self.options.browserSync) {
          browserSync(self.options.browserSync);
          self.isBrowserSyncRunning = true;
        }
      }
    }
  });
}

module.exports = DnxBrowserSyncPlugin;