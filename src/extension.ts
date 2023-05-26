import { ExtensionContext, Uri, WorkspaceConfiguration, commands, window, workspace } from 'vscode';
import { generateStepDefinitionToClipboardAsync } from './commands/generateStepDefinitionToClipboard';
import { generateStepDefinitionToFileAsync } from './commands/generateStepDefinitionToFile';

export const SUPPORTED_FEATURE_FILE = ["feature", "features"];

export interface ExtensionConfiguration extends WorkspaceConfiguration {
    runner?: string;
    language?: string;
}

export function activate(context: ExtensionContext) {
    // Get configuration for extensions
    const config = workspace.getConfiguration('step-definition-generator') as ExtensionConfiguration;

    // Generate step definition to clipboard
    context.subscriptions.push(
        commands.registerCommand('step-definition-generator.generateStepDefinitionToClipboard', async (uri: Uri) => {
            await generateStepDefinitionToClipboardAsync(uri, config);
        })
    );

    // Generate step definition to file
    context.subscriptions.push(
        commands.registerCommand('step-definition-generator.generateStepDefinitionToFile', async (uri: Uri) => {
            await generateStepDefinitionToFileAsync(uri, config);
        })
    );
}

export function deactivate() {
    window.showInformationMessage('[Cucumber Step Definition Generator] Goodbye.');
}
