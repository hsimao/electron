// Modules
const { app, BrowserWindow, Tray, Menu } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, tray

let trayMenu = Menu.buildFromTemplate([{ label: 'Item 1' }, { label: '退出', role: 'quit' }])

// 創建托盤
function createTray() {
  tray = new Tray('trayTemplate@2x.png')
  // hover 在托盤圖示上會顯示的訊息
  tray.setToolTip('Tray detail')

  // 監聽托盤事件, 當設置了托盤 menu 之後, 這裡的監聽事件將被覆蓋失效
  tray.on('click', e => {
    // 如果點擊托盤當下有按著 shift 鍵盤, 將關閉應用程式
    if (e.shiftKey) {
      app.quit()
    } else {
      // 判斷當前應用程式是否顯示, 依據狀態顯示或關閉程式畫面
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })

  // 設置托盤 menu
  tray.setContextMenu(trayMenu)
}

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  createTray()

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
