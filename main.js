// Modules
const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const mainMenus = require('./mainMenus')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// 設置選單 menu 方法一
// const mainMenu = new Menu()

// let menuItem1 = new MenuItem({
//   label: 'Mars',
//   submenu: [
//     {
//       label: 'Item1',
//       submenu: [
//         {
//           label: 'Item1-1',
//           submenu: [
//             {
//               label: 'Item1-1-1',
//             },
//           ],
//         },
//         {
//           label: 'Item1-2',
//         },
//       ],
//     },
//     { label: 'Item2' },
//     { label: 'Item3' },
//     { label: 'Item4' },
//   ],
// })

// mainMenu.append(menuItem1)

// 設置選單方法二：使用 buildFromTemplate
const mainMenu = Menu.buildFromTemplate(mainMenus)

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

  // 註冊選單
  Menu.setApplicationMenu(mainMenu)

  // 監聽右鍵事件
  mainWindow.webContents.on('context-menu', e => {
    // 後在鼠標位置顯示 menu
    mainMenu.popup()
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
