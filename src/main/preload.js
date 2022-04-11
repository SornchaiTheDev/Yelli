const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  initialize: () => ipcRenderer.invoke('initialize'),
  upload: (photo) => ipcRenderer.invoke('uploading', photo),
  getPrinters: () => ipcRenderer.invoke('getPrinters'),
  print: (file) => ipcRenderer.invoke('printing', file),
  files: {
    onPhotosDirChange: (callBack) =>
      ipcRenderer.on('initialize-watcher', callBack),
    unsubscribePhotosDirChange: () =>
      ipcRenderer.removeAllListeners('initialize-watcher'),
    listenFiles: (callBack) => ipcRenderer.on('files:new', callBack),
    unListenFiles: () => ipcRenderer.removeAllListeners('files:new'),
    getByTime: (time) => ipcRenderer.invoke('files:getbytime', time),
    timeButtons: (photo) => ipcRenderer.invoke('files:timeButtons'),
    choose: (type) => ipcRenderer.invoke('files:choose', type),
  },
  setting: {
    set: (field) => ipcRenderer.invoke('setting:set', field),
    get: (key) => ipcRenderer.invoke('setting:get', key),
  },
  stickers: {
    import: (stickers) => ipcRenderer.invoke('sticker:import', stickers),
    importDir: (dir) => ipcRenderer.invoke('sticker:importDir', dir),
    get: () => ipcRenderer.invoke('sticker:get'),
    remove: (sticker) => ipcRenderer.invoke('sticker:remove', sticker),
  },
  banner: {
    import: (bannerSrc) => ipcRenderer.invoke('banner:import', bannerSrc),
    get: () => ipcRenderer.invoke('banner:get'),
    remove: (bannerSrc) => ipcRenderer.invoke('banner:remove', bannerSrc),
  },
});
