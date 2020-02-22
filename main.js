const { app, BrowserWindow } = require('electron')
require('electron-reload')(__dirname);

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Visual P5JS Graph',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('main.html')
}

app.whenReady().then(createWindow)
