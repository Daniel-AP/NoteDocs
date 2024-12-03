import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from 'electron'
import fs from "fs"
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { AppState, Note } from '../src/types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let hasQuit = false
let webContentsLoaded = false
let pendingPaths: string[] = []

const userDataPath = app.getPath("userData")
const appStatePath = path.join(userDataPath, "appState.json")

const isSingleInstance = app.requestSingleInstanceLock()

if(!isSingleInstance) {

  app.quit()

} else {

  app.on("second-instance", async(_, commandLine) => {

    if(!win) return

    const paths = commandLine.slice(2)

    if(!webContentsLoaded) pendingPaths.push(...paths)
    else win.webContents.send("open-ext-notes", paths)

    if(win.isMinimized()) win.restore()
    win.focus()

  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
      win = null
    }
  })

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.whenReady().then(() => {

    createWindow()

    ipcMain.handle("quit-app", () => {
      if(win) win.close()
    })

    ipcMain.handle("save-note", async(_, data: Note) => {

      if(!win) return

      if(!data.path) {

        const { canceled, filePath } = await dialog.showSaveDialog(win, {
          defaultPath: path.join(app.getPath("documents"), data.name),
          filters: [{ name: "Note Documents", extensions: ["ndoc"] }]
        })

        if(canceled) return {
          path: "",
          name: ""
        }

        data.path = filePath

      }

      try {

        fs.writeFileSync(data.path, JSON.stringify(data.content), "utf8")

        return {
          path: data.path,
          name: path.parse(data.path).name
        }

      } catch (err) {

        return {
          path: "",
          name: ""
        }
        
      }

    })

    ipcMain.handle("open-notes", (_, paths) => openNotes(paths))

    ipcMain.handle("save-app-state", (_, data: AppState) => {

      try {

        fs.writeFileSync(appStatePath, JSON.stringify(data))

      } catch (error) {
        
      }

      win = null
      app.quit()

    })

  })
  
}

async function openNotes(paths?: string[]) {

  if(!win) return []
  
  let filePaths = paths

  if(!filePaths) {
    
    const { filePaths:openPaths } = await dialog.showOpenDialog(win, {
      defaultPath: app.getPath("documents"),
      filters: [{ name: "Note Documents", extensions: ["ndoc"] }],
      properties: ["openFile", "multiSelections"]
    })

    filePaths = openPaths

  }

  const notes: Note[] = []

  filePaths.forEach(filePath => {

    if (path.extname(filePath) === ".ndoc") {

      try {

        const content = JSON.parse(fs.readFileSync(filePath, "utf8"))
        const name = path.parse(filePath).name

        notes[notes.length] = {
          name,
          content,
          path: filePath
        }

      } catch (error) {

      }
    }
    
  })

  return notes

}

async function createWindow() {
  
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    minWidth: 450,
    minHeight: 150,
    width: 600,
    height: 600,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: '#eff6ff',
      symbolColor: 'black',
      height: 32
  },
  })

  let paths = process.argv.slice(1)

  win.on("close", (event) => {

    if(hasQuit) return

    event.preventDefault()
    hasQuit = true

    win?.webContents.send("before-quit")

  })

  win.webContents.on('did-finish-load', async() => {

      webContentsLoaded = true
      paths = paths.concat(pendingPaths)
      pendingPaths = []

      let appState: AppState = {
        selectedTab: 0,
        tabs: []
      }
  
      if(fs.existsSync(appStatePath)) {
  
        appState = JSON.parse(fs.readFileSync(appStatePath, "utf-8"))
  
      }
  
      const alreadyLoadedPaths = new Set(appState.tabs.map(t => t.path))
      const filteredPaths = paths.filter(p => !alreadyLoadedPaths.has(p))
  
      if(filteredPaths.length) {
  
        const notes = await openNotes(filteredPaths)
  
        notes.forEach((note, i) => {
          appState.tabs.push({
            title: note.name,
            content: note.content,
            cursorPos: 1,
            path: filteredPaths[i],
            lastSaved: note.content,
            hasUnsavedChanges: false
          })
        })
  
        appState.selectedTab = appState.tabs.length-1
  
      }
  
      win?.webContents.send("state-loaded", appState)

  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  Menu.setApplicationMenu(null)

}