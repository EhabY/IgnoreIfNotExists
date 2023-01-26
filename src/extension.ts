// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ignoreifnotexists" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ignoreifnotexists.helloWorld', async () => {
		const folderUri = vscode.Uri.file("C:\\Users\\Ehab\\Desktop\\Workspace\\VSCode\\myFolder");
		const fileUri = vscode.Uri.joinPath(folderUri, "file.txt");
		const wse = new vscode.WorkspaceEdit();
		wse.deleteFile(folderUri, { recursive: true, ignoreIfNotExists: true });
		wse.deleteFile(fileUri, { recursive: true, ignoreIfNotExists: true });
		/**
		* More addition to `wse` will be ignored because it will fail on the second operation.
		*/
		const otherFile = vscode.Uri.file("C:\\Users\\Ehab\\Desktop\\Workspace\\VSCode\\OtherFile.txt");
		wse.insert(otherFile, new vscode.Position(0, 0), "Hello there!");
		const success = await vscode.workspace.applyEdit(wse);
		console.log(success);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
