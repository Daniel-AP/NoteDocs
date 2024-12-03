import Image from "@tiptap/extension-image";

export const CustomImage = Image.extend({
    selectable: true,
    draggable: true,
}).configure({ allowBase64: true })