// Modules
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9'
  })

  secondaryWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
    // 將 secondaryWindow 綁定 mainWindow, 當 mainWindow 移動時或關閉、也會連動 secondaryWindow
    parent: mainWindow,
    modal: true, // 將自己固定在 mainWindow 視窗內
    show: false
  })

  // 3 秒後顯示 子視窗, 再過 3 秒後銷毀子視窗
  setTimeout(() => {
    secondaryWindow.show()
    setTimeout(() => {
      // secondaryWindow.hide() // 隱藏, 之後再顯示
      // 直接將整個 secondaryWindow 關閉銷毀
      secondaryWindow.close()
      secondaryWindow = null
    }, 3000)
  },3000)

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondaryWindow.loadFile('secondary.html')


  // 監聽視窗
  // mainWindow.on('ready-to-show', mainWindow.show)

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  secondaryWindow.on('closed', () => {
    secondaryWindow = null
  })
}

// Electron `app` is ready
app.on('ready', () => {
  console.log('is Ready')

  // 取得 desktop 路徑
  console.log(app.getPath('desktop'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  // 當前應用程式路徑
  console.log(app.getPath('userData'))

  createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 關閉應用程式事件監聽
app.on('before-quit', e => {
  console.log('before-quit')
})

// 應用程式 blur
app.on('browser-window-blur', e => {
  console.log('App 取消焦點')
})

// 應用程式 focus
app.on('browser-window-focus', e => {
  console.log('App focus')
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
