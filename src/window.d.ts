import { AppState, Note } from "./types";

declare global {
  interface Window {
      appBridge: {
        quitApp: () => Promise<void>;
        saveNote: (data: Note) => Promise<{ path: string, name: string }>;
        openNotes: (paths?: string[]) => Promise<Note[]>;
        saveAppState: (data: AppState) => Promise<void>;
  
        onBeforeQuit: (callback: () => void) => Electron.IpcRenderer;
        onAppStateLoaded: (callback: (data: AppState) => void) => Electron.IpcRenderer;
        onOpenExtNotes: (callback: (paths: string[]) => void) => Electron.IpcRenderer;
      }
  }
}