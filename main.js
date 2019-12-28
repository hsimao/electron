// Modules
const { app, BrowserWindow, globalShortcut } = require('electron')

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

  // 監聽鍵盤 G 按鈕點擊
  globalShortcut.register('P', () => {
    console.log('您點擊了 P')
  })

  // 監聽組合鍵盤 Connand + G 或 Control + G 按鈕點擊事件
  globalShortcut.register('CommandOrControl + M', () => {
    console.log('您點擊了 Command or Control + M')
  })

  // 監聽組合鍵盤 Shift + J 按鈕點擊事件
  globalShortcut.register('Shift + J', () => {
    console.log('您點擊了  Shift + J')

    // 將 P 監聽取消
    globalShortcut.unregister('P')
  })

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
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
