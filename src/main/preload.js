const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  initialize: (callBack) => ipcRenderer.on('init:success', callBack),
  files: {
    listenFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    unListenFiles: () => ipcRenderer.removeAllListeners('files:new'),
    getByTime: (time) => ipcRenderer.invoke('files:getbytime', time),
    timeButtons: (photo) => ipcRenderer.invoke('files:timeButtons'),
  },
  upload: (photo) => ipcRenderer.invoke('uploading', photo),
  print: (file) => ipcRenderer.invoke('printing', file),
});
