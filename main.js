// Modules
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    x: 100,
    y: 100,
    webPreferences: { nodeIntegration: true },
    backgroundColor: '#2c92f9',
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools()

  const wc = mainWindow.webContents

  // mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')
  // // 安全登入方法, 在主進程環境登入
  // wc.on('login', (e, request, authInfo, callback) => {
  //   console.log('Logging in: ')
  //   console.log('authInfo', authInfo)
  //   console.log('request', request)
  //   callback('user', 'passwd')
  // })

  // wc.on('did-navigate', (e, url, statusCode, message) => {
  //   console.log(`Navigated to: ${url}, with response code: ${statusCode}`)
  //   console.log('message: ', message)
  // })

  // 當開啟新視窗時觸發, 並取得網址
  wc.on('new-window', (e, url) => {
    e.preventDefault()
    console.log(`Creating  new window for: ${url}`)
  })

  // 監聽瀏覽器 input 事件
  wc.on('before-input-event', (e, input) => {
    console.log(`${input.key} : ${input.type}`)
  })

  // 所有 content 都已載入完畢(包含載入完成 image 圖片檔案)
  wc.on('did-finish-load', () => {
    console.log('Content fully loaded')
  })

  // dom 結構都已經好了, 但圖片等相關資源不一定已經載入
  wc.on('dom-ready', () => {
    console.log('DOM Ready ')
  })

  // 監聽影片播放
  wc.on('media-started-playing', () => {
    console.log('Video Started')
  })

  // 監聽影片暫停
  wc.on('media-paused', () => {
    console.log('Video Paused')
  })

  // 監聽滑鼠右鍵
  wc.on('context-menu', (e, params) => {
    // 當下座標
    console.log(`Context menu opened on: ${params.mediaType} at x:${params.x} y:${params.y}`)
    // 當前選擇文字
    console.log(`User selected text: ${params.selectionText}`)
    // 判斷當前選擇是否可複製
    console.log(`Selection can be copy ${params.editFlags.canCopy}`)

    // 使用 javascript 語法, alert 彈出當前所選文字
    wc.executeJavaScript(`alert("${params.selectionText}")`)
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
