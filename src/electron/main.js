import { app, BrowserWindow, ipcMain, Tray, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as db from '../backend/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;

function createWindow() {
  win = new BrowserWindow({
    title: "TypeMonkey",
    width: 1200,
    height: 700,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, "..", "..", "public", "monkey.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL("http://localhost:5173");
}

app.setName('TypeMonkey');

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("window-close", () => {
  if (win) win.close()
});

ipcMain.on("window-minimize", () => {
  if (win) win.minimize();
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
