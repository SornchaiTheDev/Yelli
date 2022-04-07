const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  initialize: () => ipcRenderer.invoke('initialize'),
  upload: (photo) => ipcRenderer.invoke('uploading', photo),
  getPrinters: () => ipcRenderer.invoke('getPrinters'),
  print: (file) => ipcRenderer.invoke('printing', file),
  files: {
    onPhotosDirChange: (callBack) =>
      ipcRenderer.on('initialize-watcher', callBack),
    listenFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    unListenFiles: () => ipcRenderer.removeAllListeners('files:new'),
    getByTime: (time) => ipcRenderer.invoke('files:getbytime', time),
    timeButtons: (photo) => ipcRenderer.invoke('files:timeButtons'),
    choose: () => ipcRenderer.invoke('files:choose'),
  },
  setting: {
    set: (field) => ipcRenderer.invoke('setting:set', field),
    get: (key) => ipcRenderer.invoke('setting:get', key),
  },
});
