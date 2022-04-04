const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  files: {
    listenFiles: (callback) => ipcRenderer.invoke('files:listen'),
    newFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    getByTime: (time) => ipcRenderer.invoke('files:getbytime', time),
    timeButtons: (photo) => ipcRenderer.invoke('files:timeButtons'),
  },
  print: (photo, photoName) =>
    ipcRenderer.invoke('printing', (photo, photoName)),
});
