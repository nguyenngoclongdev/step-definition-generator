import { GherkinCodeParse } from '@nguyenngoclongdev/gherkin';
import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureFilePath, getLanguage, getRunner, showErrorMessageWithDetail } from '../utils';

export const generateStepDefinitionToClipboard = async (uri: vscode.Uri, config: ExtensionConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature file path
        const featureFilePath = getFeatureFilePath(uri);
        if (!featureFilePath) {
            vscode.window.showWarningMessage('Open .feature or .features file before running the command!');
            return;
        }

        // Get feature content
        const featureFileContent = readFileSync(featureFilePath, 'utf8');

        // Generate code
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const output = gherkinCodeParse.parse(featureFileContent);

        // Write to clipboard
        const clipboard = vscode.env.clipboard;
        await clipboard.writeText(output);
        vscode.window.showInformationMessage('Step definitions have been copied to the clipboard!');
    } catch (error) {
        showErrorMessageWithDetail('Failed to generate step definitions!', error);
    }
};
