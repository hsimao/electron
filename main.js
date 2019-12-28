// Modules
const { app, BrowserWindow, dialog } = require('electron')

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

  // 當內容載入完畢後開啟選擇檔案視窗
  mainWindow.webContents.on('did-finish-load', () => {
    // 開啟選擇檔案視窗
    // dialog.showOpenDialog(
    //   mainWindow,
    //   {
    //     buttonLabel: '選擇檔案',
    //     // 開啟選擇檔案視窗的預設目標路徑, 以下為桌面
    //     defaultPath: app.getPath('desktop'),
    //     // 選擇設置
    //     // mutiSelections: 允許允許選擇多個路徑
    //     // createDirectory: 允許從對話框創建新目錄
    //     // openFile: 允許選擇文件
    //     // openDirectory: 允許選擇目錄
    //     properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory'],
    //   },
    //   filepaths => {
    //     console.log(filepaths)
    //   }
    // )

    // dialog.showSaveDialog({}, filename => {
    //   console.log('filename', filename)
    // })

    // 文字選擇彈窗
    const answers = ['Yes', 'No', 'Maybe']
    dialog.showMessageBox(
      {
        title: 'Message Box',
        message: 'Please select an option',
        detail: 'Message details.',
        buttons: answers,
      },
      res => {
        console.log(`你選擇了: ${answers[res]}`)
      }
    )
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
