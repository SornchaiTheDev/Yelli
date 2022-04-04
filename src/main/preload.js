const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  files: {
    listenFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    unListenFiles: () => ipcRenderer.removeAllListeners('files:new'),
    getByTime: (time) => ipcRenderer.invoke('files:getbytime', time),
    timeButtons: (photo) => ipcRenderer.invoke('files:timeButtons'),
  },
  print: (photo, photoName) =>
    ipcRenderer.invoke('printing', (photo, photoName)),
});
