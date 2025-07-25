import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as moment from 'moment';

export function activate(context: vscode.ExtensionContext) {
    console.log('Now Note extension is now active!');

    let disposable = vscode.commands.registerCommand('now-note-extension.createNote', async () => {
        try {
            // Get user input for note title
            const title = await vscode.window.showInputBox({
                prompt: 'Enter note title',
                placeHolder: 'My awesome note',
                validateInput: (value: string) => {
                    if (!value || value.trim().length === 0) {
                        return 'Please enter a title for your note';
                    }
                    return null;
                }
            });

            if (!title) {
                return; // User cancelled
            }

            // Get configuration
            const config = vscode.workspace.getConfiguration('nowNote');
            let notesDir = config.get<string>('notesDirectory') || path.join(os.homedir());
            const fileExtension = config.get<string>('fileExtension') || 'md';
            const dateFormat = config.get<string>('dateFormat') || 'YYYY-MM-DD_HH-mm';

            // Expand ~ to home directory
            if (notesDir.startsWith('~/')) {
                notesDir = path.join(os.homedir(), notesDir.slice(2));
            }

            // Generate timestamp
            const timestamp = moment().format(dateFormat);

            // Create safe filename from title
            const safeTitle = title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');

            // Create filename
            const filename = `${timestamp}_${safeTitle}.${fileExtension}`;
            const fullPath = path.join(notesDir, filename);

            // Ensure directory exists
            if (!fs.existsSync(notesDir)) {
                fs.mkdirSync(notesDir, { recursive: true });
            }

            // Create file content
            const content = `# ${title}\n\n`;

            // Write file
            fs.writeFileSync(fullPath, content, 'utf8');

            // Open the file
            const document = await vscode.workspace.openTextDocument(fullPath);
            await vscode.window.showTextDocument(document);

            // Position cursor at the end
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const position = new vscode.Position(2, 0); // Line 3, column 1
                editor.selection = new vscode.Selection(position, position);
            }

            vscode.window.showInformationMessage(`Note created: ${filename}`);

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create note: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
