const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const child_process = require("child_process");

contextBridge.exposeInMainWorld("myAPI", {
  readFileSync: fs.readFileSync,
  spawn: child_process.spawn,
});
