import * as vscode from 'vscode';
import { generateStepDefinitionToClipboard } from './commands/generateStepDefinitionToClipboard';
import { generateStepDefinitionToFile } from './commands/generateStepDefinitionToFile';

export const SUPPORTED_FEATURE_FILE = ["feature", "features"];

export interface ExtensionConfiguration extends vscode.WorkspaceConfiguration {
    runner?: string;
    language?: string;
}

export function activate(context: vscode.ExtensionContext) {
    // Get configuration for extensions
    const config = vscode.workspace.getConfiguration('step-definition-generator') as ExtensionConfiguration;

    // Generate step definition to clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand('step-definition-generator.generateStepDefinitionToClipboard', async (uri: vscode.Uri) => {
            await generateStepDefinitionToClipboard(uri, config);
        })
    );

    // Generate step definition to file
    context.subscriptions.push(
        vscode.commands.registerCommand('step-definition-generator.generateStepDefinitionToFile', async (uri: vscode.Uri) => {
            await generateStepDefinitionToFile(uri, config);
        })
    );
}

export function deactivate() {
    vscode.window.showInformationMessage('[Cucumber Step Definition Generator] Goodbye.');
}
