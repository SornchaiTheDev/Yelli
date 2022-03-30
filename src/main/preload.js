const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  tmp: {
    listenThumbnail: (callBack) =>
      ipcRenderer.on('thumbnail-tmp:create-success', callBack),
  },
  files: {
    listenFiles: (callback) => ipcRenderer.invoke('files:listen'),
  },
});
