import * as vscode from 'vscode';
import { generateStepDefinitionsToClipboard } from './commands/generateStepDefinitionsToClipboard';
import { generateStepDefinitionsToFile } from './commands/generateStepDefinitionsToFile';

export function activate(context: vscode.ExtensionContext) {
    // Generate step definitions to clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.generateStepDefinitionsToClipboard', async (uri: vscode.Uri) => {
            await generateStepDefinitionsToClipboard(uri);
        })
    );

    // Generate step definitions to file
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.generateStepDefinitionsToFile', async (uri: vscode.Uri) => {
            await generateStepDefinitionsToFile(uri);
        })
    );
}

export function deactivate() {
    vscode.window.showInformationMessage('[Cypress Cucumber Step Definition Generator] goodbye!');
}
