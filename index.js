const { app, BrowserWindow } = require('electron');

function createWindows() {
  // let splashScreen = new BrowserWindow(
  //   {
  //     width: 400,
  //     height: 400,
  //     resizable: false,
  //     movable: false,
  //     frame: false
  //   }
  // );

  let mainWindow = new BrowserWindow({
    width: 700,
    height: 750,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile("./main.html");

  mainWindow.on('closed', () => {
    app.quit();
  })

  // splashScreen.loadFile("./splashScreen.html");

  // splashScreen.on('closed', () => {
  //   app.quit()
  // });
}

app.on('ready', () => {
  createWindows();
});

