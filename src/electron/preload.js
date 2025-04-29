const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('WindowAPI', {
  closeWin: () => ipcRenderer.send('window-close'),
  minimizeWin: () => ipcRenderer.send('window-minimize'),
});

