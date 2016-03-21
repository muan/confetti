var menubar = require('menubar')
var ipc = require('electron').ipcMain

var mb = menubar({
  transparent: true,
  width: 100,
  hasShadow: false,
  height: 100,
  tooltip: 'Who\'s awesome?!'
})

mb.on('ready', function () {
  var size = require('electron').screen.getPrimaryDisplay().workAreaSize
  mb.setOption('width', size.width)
  mb.setOption('height', size.height)
})

mb.on('show', function () {
  mb.window.webContents.send('start-countdown')
})

mb.on('after-create-window', function () {
  mb.window.webContents.on('did-finish-load', function () {
    mb.window.webContents.send('start-countdown')
  })
})

mb.on('hide', function () {
  mb.window.webContents.send('stop-countdown')
})

// when receive the abort message, close the app
ipc.on('abort', function () {
  mb.hideWindow()
})
