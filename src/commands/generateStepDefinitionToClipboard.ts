import { GherkinCodeParse } from '@nguyenngoclongdev/gherkin';
import { Uri, env, window } from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureFilePath, getLanguage, getRunner, showErrorMessageWithDetail } from '../utils/utils';
import { wfs } from '../utils/wfs';

export const generateStepDefinitionToClipboardAsync = async (uri: Uri, config: ExtensionConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature file path
        const featureFilePath = getFeatureFilePath(uri);
        if (!featureFilePath) {
            window.showWarningMessage('Open .feature or .features file before running the command!');
            return;
        }

        // Get feature content
        const featureFileContent = await wfs.readFileAsync(featureFilePath);

        // Generate code
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const output = gherkinCodeParse.parse(featureFileContent);

        // Write to clipboard
        const clipboard = env.clipboard;
        await clipboard.writeText(output);
        window.showInformationMessage('Step definitions have been copied to the clipboard!');
    } catch (error) {
        showErrorMessageWithDetail('Failed to generate step definitions!', error);
    }
};
