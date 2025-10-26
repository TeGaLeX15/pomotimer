import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 1024, // начальный размер, потом растянется на весь экран
    height: 768,
    frame: false,      // убираем стандартный заголовок и рамку
    fullscreen: false,  // сразу на весь экран
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  const dev = process.env.NODE_ENV === 'development'
  if (dev) {
    const url = 'http://localhost:5173'
    console.log('Loading dev URL:', url)
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    const indexHtml = path.join(__dirname, '../dist/index.html')
    console.log('Loading production file:', indexHtml)
    win.loadFile(indexHtml)
  }

  // IPC для управления окном
    ipcMain.on('window-close', () => win.close());
    ipcMain.on('window-minimize', () => win.minimize());
    ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
    });
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
