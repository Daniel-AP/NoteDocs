import { useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import TextAlign from "@tiptap/extension-text-align"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import Typography from "@tiptap/extension-typography"
import Link from "@tiptap/extension-link"
import CharacterCount from "@tiptap/extension-character-count"
import { CustomText } from "../extensions/CustomText"
import { CustomImage } from "../extensions/CustomImage"
import { useAppStore } from "../stores/appStore"
import { useEditorStore } from "../stores/editorStore"
import { EditorState } from "@tiptap/pm/state"

const content = ""

export const extensions = [
    StarterKit.configure({
        text: false,
    }),
    CustomText,
    Underline,
    Highlight,
    TaskList,
    TaskItem,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Subscript,
    Superscript,
    Link,
    Typography,
    CharacterCount,
    CustomImage
]

export const Editor = () => {

    const {
        selectedTab,
        lastSavedContent,
        unsavedChanges,
        tabData,
        addUnsavedChanges,
        delUnsavedChanges,
        setContentTab,
        setCursorPosTab
    } = useAppStore()

    const setEditor = useEditorStore(s => s.setEditor)
    const setCharCount = useEditorStore(s => s.setCharCount)
    const setWordCount = useEditorStore(s => s.setWordCount)

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
              spellcheck: "false"
            }
        },
    })

    const handleContentUpdate = () => {

        if(!editor) return

        const content = editor.getJSON()
        const lastSaved = lastSavedContent[selectedTab]

        const stringyfiedContent = JSON.stringify(content)
        const stringyfiedLastSaved = JSON.stringify(lastSaved)

        setContentTab(selectedTab, content)
        setCharCount(editor.storage.characterCount.characters())
        setWordCount(editor.storage.characterCount.words())

        if(stringyfiedLastSaved !== stringyfiedContent && !unsavedChanges.has(selectedTab)) addUnsavedChanges()
        if(stringyfiedLastSaved === stringyfiedContent) delUnsavedChanges(selectedTab)
        if(editor.isEmpty) delUnsavedChanges(selectedTab)

    }

    const handleSelectionUpdate = () => {

        if(!editor) return

        setCursorPosTab(selectedTab, editor.state.selection.anchor)

    }

    useEffect(() => {

        if(!editor) return

        editor.commands.setContent(tabData[selectedTab].content)

        const newEditorState = EditorState.create({
            doc: editor.state.doc,
            plugins: editor.state.plugins,
            schema: editor.state.schema
        })

        editor.view.updateState(newEditorState)
        editor.commands.focus(tabData[selectedTab].cursorPos)

        setCharCount(editor.storage.characterCount.characters())
        setWordCount(editor.storage.characterCount.words())

    }, [selectedTab, tabData.length])

    useEffect(() => {

        if(!editor) return

        editor.on("update", handleContentUpdate)
        editor.on("selectionUpdate", handleSelectionUpdate)

        return () => editor.removeAllListeners()

    }, [selectedTab, unsavedChanges, lastSavedContent])

    useEffect(() => {

        setEditor(editor)

    }, [editor])

    return <EditorContent className="w-full" editor={editor} />

}