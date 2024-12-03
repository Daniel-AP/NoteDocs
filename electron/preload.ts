import { ipcRenderer, contextBridge } from 'electron'
import { AppState, Note } from '../src/types'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('appBridge', {
  quitApp: () => ipcRenderer.invoke("quit-app"),
  saveNote: (data: Note) => ipcRenderer.invoke("save-note", data),
  openNotes: (paths?: string[]) => ipcRenderer.invoke("open-notes", paths),
  saveAppState: (data: AppState) => ipcRenderer.invoke("save-app-state", data),

  onBeforeQuit: (callback: () => void) => ipcRenderer.on("before-quit", callback),
  onAppStateLoaded: (callback: (data: AppState) => void) => ipcRenderer.on("state-loaded", (_, data) => callback(data)),
  onOpenExtNotes: (callback: (paths: string[]) => void) => ipcRenderer.on("open-ext-notes", (_, data) => callback(data))
})