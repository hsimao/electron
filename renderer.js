// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { desktopCapturer } = require('electron')

// 取得顯示器: types: ['screen']
// 取得瀏覽器: types: ['window']
document.getElementById('screenshot-button').addEventListener('click', () => {
  desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } }, (error, sources) => {
    console.log(sources)
    // 取得當前視窗圖片, 並轉成 dataURL 並顯示在 img 上
    document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
  })
})
