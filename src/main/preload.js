const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getFiles: (dir) => ipcRenderer.send('files:get', dir),
  listenFiles: (channel, func) =>
    ipcRenderer.once(channel, (event, arg) => func(arg)),
});
