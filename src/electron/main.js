import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import * as db from '../backend/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 💥 Универсальный вызов:
ipcMain.handle('api-call', async (_event, { method, args }) => {
  try {
    if (!db[method] || typeof db[method] !== 'function') {
      return {
        success: false,
        status: 404,
        error: `Метод '${method}' не найден`,
        data: null,
      };
    }

    const result = await db[method](...args);
    return {
      success: true,
      status: result?.status ?? 200,
      data: result?.data ?? result,
      error: null,
    };
  } catch (err) {
    console.error(`Ошибка в ${method}:`, err);
    return {
      success: false,
      status: 500,
      error: err.message || 'Неизвестная ошибка',
      data: null,
    };
  }
});
