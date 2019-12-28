module.exports = [
  {
    label: 'yooyo',
    submenu: [{ label: 'Item 1' }, { label: 'Item 2', submenu: [{ label: 'Sub Item 1' }] }, { label: 'Item 3' }],
  },
  {
    label: 'Actions',
    submenu: [
      {
        label: '開發者工具',
        // role: 可使用已經定義好的快捷功能
        // toggleDevTools => 切換開發者工具
        // 更多 role 列表 https://electronjs.org/docs/api/menu-item#roles
        role: 'toggleDevTools',
      },
      {
        label: '全螢幕切換',
        role: 'togglefullscreen',
      },
      {
        label: 'Action 2',
        // 禁止點選
        enabled: false,
      },
      {
        label: 'Action 3',
        // 點擊觸發事件
        click: () => {
          console.log('click Action3 ')
        },
        // 快捷鍵觸發, 非全域監聽, 必須要在應用程式焦點狀態時才可觸發
        accelerator: 'Shift+P',
      },
      {
        label: '退出',
        role: 'quit',
      },
    ],
  },
  {
    label: '自訂編輯',
    submenu: [
      { label: '上一步', role: 'undo' },
      { label: '下一步', role: 'redo' },
      { label: '複製', role: 'copy' },
      { label: '貼上', role: 'paste' },
    ],
  },
  // 使用預設的編輯功能
  {
    label: 'default 編輯',
    role: 'editMenu',
  },
]
