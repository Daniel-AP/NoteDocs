import { Editor } from "@tiptap/react"
import { create } from "zustand"

type Store = {
    editor: Editor | null
    charCount: number
    wordCount: number
    setEditor: (editor: Editor | null) => void
    setCharCount: (count: number) => void
    setWordCount: (count: number) => void
}

export const useEditorStore = create<Store>()((set) => ({
    editor: null,
    charCount: 0,
    wordCount: 0,
    setEditor: (editor) => set(() => ({ editor })),
    setCharCount: (count) => set(() => ({ charCount: count })),
    setWordCount: (count) => set(() => ({ wordCount: count }))
}))