const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

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

  splashScreen.loadURL(url.format({
    pathname: path.join(__dirname, '/src/splashScreen.html'),
    protocol: 'file:',
    slashes: true
  }));

  let mainWindow = new BrowserWindow({
    title: "Biblio",
    width: 800,
    height: 750,
    resizable: false,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // mainWindow.loadFile("./src/main.html");
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/src/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.once('ready-to-show', () => {

    // timeout ensures that the window is loaded properly
    // since bootstrap takes longer to load for some reason
    setTimeout(() => {
      splashScreen.close();
      mainWindow.show();
    }, 3000);
  })

  mainWindow.on('closed', () => {
    quitApp();
  })


  splashScreen.on('closed', () => {
    splashScreen = null;
  });

  ipcMain.on('reset_form', () => {
    mainWindow.reload();
  });

  ipcMain.on('save_result', (e, args) => {



    let toWrite = `
    Saved on: ${Date()}
    --------------------
    Reference Style: ${args['rStyle']}
    Reference Source: ${args['rMaterial']}
    In Text Citetation: ${args['inCite']}
    Bibliography Entry: ${args['bib']}
    `

    saveFile(toWrite);
  });

  ipcMain.on('close_window', () => {
    mainWindow.close();
  });

  ipcMain.on("minimize_window", () => {
    mainWindow.minimize();

  })

  ipcMain.on('open_dev_tools', () => {
    console.log('opeaning dev tools');
    mainWindow.webContents.openDevTools();
  });

}

const saveFile = async (toWrite) => {
  const { dialog } = require('electron');
  const fs = require('fs');

  const savePath = await dialog.showSaveDialog(null);
  let filePath = await savePath['filePath'];
  await console.log(savePath);

  await console.log(toWrite);
  await fs.writeFile(filePath, toWrite, (err) => {
    if (err) {
      console.log(err)
    }
  })

}

function quitApp() {
  app.quit();
}

app.on('ready', () => {
  createWindows();
});
