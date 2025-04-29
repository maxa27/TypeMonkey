const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('WindowAPI', {
  closeWin: () => ipcRenderer.send('window-close'),
  minimizeWin: () => ipcRenderer.send('window-minimize'),
});

contextBridge.exposeInMainWorld('api', {
  call: (method, args = []) => ipcRenderer.invoke('api-call', { method, args }),
});