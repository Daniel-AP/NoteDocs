import Text from "@tiptap/extension-text"

export const CustomText = Text.extend({
    addKeyboardShortcuts() {
        return {
            Tab: () => {
                return this.editor.commands.insertContent("\t")
            }
        }
    },
})