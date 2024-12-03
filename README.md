# NoteDocs

NoteDocs is a desktop notes application developed using the following technologies:

- **React**
- **Electron**
- **TypeScript**
- **Tiptap**
- **TailwindCSS**

Currently, the app is designed for Windows, as testing on macOS was not possible during development.

## Features

- **Rich Text Editing**: Supports pasting images directly into the editor and automatically links URLs when pasted.
- **Text Input Rules**: Automatically converts specific text patterns into symbols or formatted text. Supported rules include:
  - `--` → `—` (em dash)
  - `...` → `…` (ellipsis)
  - `"` → `“` or `”` (smart double quotes)
  - `'` → `‘` or `’` (smart single quotes)
  - `<-` → `←` (left arrow)
  - `->` → `→` (right arrow)
  - `(c)` → `©` (copyright sign)
  - `(r)` → `®` (registered trademark)
  - `(tm)` → `™` (trademark sign)
  - `1/2` → `½` (one half)
  - `1/4` → `¼` (one quarter)
  - `3/4` → `¾` (three quarters)
  - `+/-` → `±` (plus/minus sign)
  - `!=` → `≠` (not equal sign)
  - `<<` → `«` (left-pointing double angle quotation mark)
  - `>>` → `»` (right-pointing double angle quotation mark)
  - `2*3` or `2x3` → `2×3` (multiplication sign)
  - `^2` → `²` (superscript two)
  - `^3` → `³` (superscript three)

## Keyboard Shortcuts

### Navigation and File Management
- **Save File**: `Ctrl + S`
- **Open File**: `Ctrl + O`
- **Open New Tab**: `Ctrl + T`
- **Close Current Tab**: `Ctrl + W`
- **Next Tab**: `Ctrl + Tab`
- **Previous Tab**: `Ctrl + Shift + Tab`
- **Go to Specific Tab**: `Ctrl + [1-9]`
- **Show Shortcuts Panel**: `Ctrl + K`

### Essentials
- **Copy**: `Ctrl + C`
- **Cut**: `Ctrl + X`
- **Paste**: `Ctrl + V`
- **Paste Without Formatting**: `Ctrl + Shift + V`
- **Undo**: `Ctrl + Z`
- **Redo**: `Ctrl + Y`

### Text Formatting
- **Bold**: `Ctrl + B`
- **Italic**: `Ctrl + I`
- **Underline**: `Ctrl + U`
- **Strikethrough**: `Ctrl + Shift + S`
- **Highlight**: `Ctrl + Shift + H`
- **Code**: `Ctrl + E`

### Paragraph Formatting
- **Normal Text Style**: `Ctrl + Alt + 0`
- **Heading 1**: `Ctrl + Alt + 1`
- **Heading 2**: `Ctrl + Alt + 2`
- **Heading 3**: `Ctrl + Alt + 3`
- **Heading 4**: `Ctrl + Alt + 4`
- **Heading 5**: `Ctrl + Alt + 5`
- **Heading 6**: `Ctrl + Alt + 6`
- **Ordered List**: `Ctrl + Shift + 7`
- **Bulleted List**: `Ctrl + Shift + 8`
- **Task List**: `Ctrl + Shift + 9`
- **Quote**: `Ctrl + Shift + B`
- **Align Left**: `Ctrl + Shift + L`
- **Align Center**: `Ctrl + Shift + E`
- **Align Right**: `Ctrl + Shift + R`
- **Justify**: `Ctrl + Shift + J`
- **Code Block**: `Ctrl + Alt + C`
- **Subscript**: `Ctrl + ,`
- **Superscript**: `Ctrl + .`

### Text Selection
- **Select All**: `Ctrl + A`
- **Extend Selection Left**: `Shift + ←`
- **Extend Selection Right**: `Shift + →`
- **Extend Selection Up**: `Shift + ↑`
- **Extend Selection Down**: `Shift + ↓`

## How to Run

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development environment with `npm run dev`.
4. Build the application for production using `npm run build`.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.