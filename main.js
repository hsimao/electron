// Modules
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      // 開啟 offscreen 模式
      offscreen: true,
    },
    backgroundColor: '#2c92f9',
  })

  // Load index.html into the new BrowserWindow
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://google.com')

  let i = 1
  // 印出載入 google.com 網頁時的每偵畫面
  mainWindow.webContents.on('paint', (e, dirty, image) => {
    let screenshot = image.toPNG()
    fs.writeFile(app.getPath('desktop') + `/screenshot_${i}.png`, screenshot, console.log)
    i++
  })

  mainWindow.webContents.on('did-finish-load', e => {
    console.log(mainWindow.getTitle())

    mainWindow.close()
    mainWindow = null
  })

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools()

  // Listen for window being closed
  // mainWindow.on('closed', () => {
  //   mainWindow = null
  // })
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
