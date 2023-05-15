import * as vscode from 'vscode';
import { FeatureProcessor } from '../services/FeatureProcessor';
import StepDefinitions from '../services/StepDefinition';
import { CycucumConfiguration } from '../interfaces/Config.interface';

export const generateStepDefinitionsToClipboard = async (uri: vscode.Uri, config: CycucumConfiguration): Promise<void> => {
    // Parse feature content
    const featureProcessor = new FeatureProcessor(uri, config);
    const content = featureProcessor.parseFeatureContent();

    // Generate code
    const stepDefinitions = new StepDefinitions(uri, config);
    const output = await stepDefinitions.generate(content);

    // Write to clipboard
    const clipboard = vscode.env.clipboard;
    await clipboard.writeText(output);
    vscode.window.showInformationMessage('Step definitions copied to the clipboard!');
};
