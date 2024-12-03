import { JSONContent } from "@tiptap/react"

export type Note = {
  name: string;
  content: JSONContent;
  path: string;
}

export type AppState = {
  selectedTab: number;
  tabs: Array<{
    title: string;
    content: JSONContent;
    cursorPos: number;
    path: string;
    lastSaved: JSONContent;
    hasUnsavedChanges: boolean;
  }>
}