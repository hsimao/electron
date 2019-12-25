// Modules
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  secWindow = new BrowserWindow({
    width: 700,
    height: 600,
    resizable: false, // 禁止縮放
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  secWindow.on('closed', () => {
    // 當關閉 secWindow 時將 mainWindow 視窗放到最大
    mainWindow.maximize()
    // secWindow = null
  })

  // 監聽 focus
  mainWindow.on('focus', () => {
    console.log('mainWindow focus')
  })
  secWindow.on('focus', () => {
    console.log('secWindow focus')
  })

  // 取得 mainWindow id
  console.log('mainWindow ID:', mainWindow.id)

  // 取得指定 window id 資料
  console.log(BrowserWindow.fromId(mainWindow.id))

  // 取得所有 window 資料
  console.log(BrowserWindow.getAllWindows())
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
