// Modules
const { app, BrowserWindow, session } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // 另外新增一個 session 儲存空間, 只存在記憶體, 重啟資料就會消失
  let customSes = session.fromPartition('part1')

  // 另外新增一個 session 儲存空間, 永久儲存
  let customSesForever = session.fromPartition('persist:part1')

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  secWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: 200,
    y: 200,
    webPreferences: {
      nodeIntegration: true,
      // session: customSesForever, // 使用自訂 session
      partition: 'persist:part1', // 或直接指定要取得哪個 session
    },
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()
  secWindow.webContents.openDevTools()

  let ses = mainWindow.webContents.session
  let ses2 = secWindow.webContents.session
  let defaultSes = session.defaultSession

  console.log('ses', ses.getUserAgent())
  console.log('ses2', ses2)
  console.log('session', session)
  console.log('defaultSes', defaultSes)
  console.log(Object.is(ses, defaultSes))

  // 清除 mainWindow session
  ses.clearStorageData()

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  secWindow.on('closed', () => {
    secWindow = null
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
