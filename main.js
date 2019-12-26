// Modules
const { app, BrowserWindow, session } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  let ses = session.defaultSession

  // 取得 session 內的 cookie 資料, 第一個參數空物件表示要取得所有資料
  // ses.cookies.get({}, (err, cookies) => {
  //   console.log('cookies', cookies)
  // })

  // 將取得 cookies 封裝成 function
  const getCookies = name => {
    const target = name ? { name: name } : {}
    ses.cookies.get(target, (err, cookies) => {
      console.log('cookies', cookies)
    })
  }

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // 載入 github 頁面
  // main

  // 刪除 cookie
  ses.cookies.remove('https://github.com/hsimao/', 'cookie1', err => {
    getCookies('cookie1')
  })
  // 設置 cookie 到瀏覽器上
  let cookie = { name: 'cookie1', value: 'electron', url: 'https://github.com/hsimao/', expirationDate: 1613852855 }

  // 新增完後印出 cookie
  // ses.cookies.set(cookie, err => {
  //   console.log('cookie1 set')
  //   getCookies()
  // })

  // 等頁面載入完後抓取頁面 cookies
  // mainWindow.webContents.on('did-finish-load', e => {
  //   getCookies()
  // })

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
