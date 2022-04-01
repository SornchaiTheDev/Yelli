const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  files: {
    listenFiles: (callback) => ipcRenderer.invoke('files:listen'),
    newFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    getByTime: (time, callback) => ipcRenderer.invoke('files:getbytime', time),
    getFirstFile: () => ipcRenderer.invoke('files:firstFile'),
  },
});
