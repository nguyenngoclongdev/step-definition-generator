import * as vscode from 'vscode';
import { generateStepDefinitionsToClipboard } from './commands/generateStepDefinitionsToClipboard';
import { generateStepDefinitionsToFile } from './commands/generateStepDefinitionsToFile';

export interface CycucumConfiguration extends vscode.WorkspaceConfiguration {
    runner?: string;
    language?: string;
}

export function activate(context: vscode.ExtensionContext) {
    // Get configuration for extensions
    const config = vscode.workspace.getConfiguration('cycucum') as CycucumConfiguration;

    // Generate step definitions to clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.generateStepDefinitionsToClipboard', async (uri: vscode.Uri) => {
            await generateStepDefinitionsToClipboard(uri, config);
        })
    );

    // Generate step definitions to file
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.generateStepDefinitionsToFile', async (uri: vscode.Uri) => {
            await generateStepDefinitionsToFile(uri, config);
        })
    );
}

export function deactivate() {
    vscode.window.showInformationMessage('[Cucumber Step Definition Generator] goodbye!');
}
