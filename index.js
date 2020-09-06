const { app, BrowserWindow } = require('electron');

function createWindows() {
  let splashScreen = new BrowserWindow(
    {
      width: 400,
      height: 400,
      resizable: false,
      movable: false,
      frame: false
    }
  );

  splashScreen.loadFile("./src/splashScreen.html");

  let mainWindow = new BrowserWindow({
    width: 800,
    height: 750,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile("./src/main.html");

  mainWindow.once('ready-to-show', () => {

    // timeout ensures that the window is loaded properly
    // since bootstrap takes longer to load for some reason
    setTimeout(() => {
      splashScreen.close();
      mainWindow.show();
    }, 3000);
  })

  mainWindow.on('closed', () => {
    app.quit();
  })


  splashScreen.on('closed', () => {
    splashScreen = null;
  });
}

app.on('ready', () => {
  createWindows();
});

