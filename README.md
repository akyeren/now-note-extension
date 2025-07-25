# Now Note Extension

Quickly create timestamped markdown notes with custom titles.

## Features

- **Quick Note Creation**: Create notes with a single command or keyboard shortcut
- **Automatic Timestamping**: Files are named with current timestamp + your title
- **Configurable Directory**: Set your preferred notes directory
- **Smart Filename Generation**: Converts titles to safe filenames automatically
- **Instant Opening**: Created notes open immediately in VS Code

## Usage

1. **Command Palette**: `Ctrl+Shift+P` → "Create New Note"
2. **Keyboard Shortcut**: `Ctrl+Shift+N` (or `Cmd+Shift+N` on Mac)
3. Enter your note title when prompted
4. Note is created and opened automatically!

## Example

Input: `"My Research Notes"`
Creates: `2025-07-26_14-30_my-research-notes.md`

With content:
```markdown
# My Research Notes

```

## Configuration

- **Notes Directory**: `nowNote.notesDirectory` - Where to create notes (default: home directory)
- **File Extension**: `nowNote.fileExtension` - File extension for notes (default: "md")
- **Date Format**: `nowNote.dateFormat` - Timestamp format (default: "YYYY-MM-DD_HH-mm")

## Requirements

- VS Code 1.74.0 or higher

## Release Notes

### 0.0.1

Initial release with core note creation functionality.
