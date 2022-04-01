const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  files: {
    firstFile: () => ipcRenderer.invoke('file:first'),
    listenFiles: (callback) => ipcRenderer.invoke('files:listen'),
    newFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    getByTime: (time, callback) => ipcRenderer.invoke('files:getbytime', time),
  },
});
