// Modules
const electron = require('electron')
const { app, BrowserWindow } = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 監聽電源： 在系統復原時發出
  // 電腦進入睡眠狀態後，在喚醒時將會觸發
  electron.powerMonitor.on('resume', e => {
    // 如果喚醒時當下應用程式視窗是被關閉的，就重新打開
    // 這邊的「關閉」是視窗，不是關閉應用程式
    if (!mainWindow) createWindow()
  })

  // 電腦進入睡眠狀態後，在喚醒時將會觸發
  electron.powerMonitor.on('suspend', e => {
    console.log('Saving some data')
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 關閉應用程式事件監聽
app.on('before-quit', e => {
  console.log('before-quit')
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
