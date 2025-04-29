const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  call: (method, args = []) => ipcRenderer.invoke('api-call', { method, args }),
});


