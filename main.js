const path = require("path");

const { app, BrowserWindow, Menu } = require("electron");
const ENV = "dev";
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1200,
    minWidth: 800, // minimum width of the window
    minHeight: 600, // minimum height of the window
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // and load the index.html of the app.
  if (ENV === "dev") {
    //for dev
    mainWindow.loadURL("http://localhost:3000/");
  } else if (ENV === "prod" || ENV === "production") {
    //for prod
    //win.loadFile('build/index.html')

    const url = require("url").format({
      protocol: "file",
      slashes: true,
      pathname: require("path").join(__dirname, "build/index.html"),
    });
    mainWindow.loadURL(url);
  } else {
    throw new Error("wrong env");
  }
  Menu.setApplicationMenu(null);
  mainWindow.setMinimumSize(1000, 300);
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.commandLine.appendSwitch("enable-features", "WebSpeechAPI");
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
