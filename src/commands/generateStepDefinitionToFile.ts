import { GherkinCodeParse, GherkinOption, defaultGherkinOption } from '@nguyenngoclongdev/gherkin';
import { fs } from '@vscode-utility/fs-browserify';
import { posix } from 'path';
import { Uri, window, workspace } from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureFilePath, getLanguage, getLanguageExt, getRunner, showErrorMessageWithDetail } from '../utils/utils';

const showTextDocument = (stepDefinitionFilePath: string): void => {
    const existingDoc = workspace.textDocuments.find((doc) => doc.uri.fsPath === stepDefinitionFilePath);
    if (existingDoc) {
        const visibleEditor = window.visibleTextEditors.find((editor) => editor.document === existingDoc);
        if (visibleEditor) {
            window.showTextDocument(visibleEditor.document, visibleEditor.viewColumn, false);
        } else {
            window.showTextDocument(existingDoc, { preserveFocus: false });
        }
    } else {
        const stepDefinitionFileUri = Uri.file(stepDefinitionFilePath);
        window.showTextDocument(stepDefinitionFileUri, { preserveFocus: false });
    }
};

export const generateStepDefinitionToFileAsync = async (uri: Uri, config: ExtensionConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature file path
        const featureFilePath = getFeatureFilePath(uri);
        if (!featureFilePath) {
            window.showWarningMessage('Open .feature or .features file before running the command!');
            return;
        }

        // Get step definition file path
        const featureFileExt = posix.extname(featureFilePath);
        const stepDefinitionFileExt = getLanguageExt(language);
        const stepDefinitionFilePath = featureFilePath.slice(0, -featureFileExt.length).concat(stepDefinitionFileExt);

        // Get feature content
        const featureFileContent = await fs.readFileAsync(featureFilePath);
        if (!featureFileContent) {
            window.showWarningMessage('The feature file is empty!');
            return;
        }

        // Init gherkin option
        const gherkinOptions: GherkinOption = {
            ...defaultGherkinOption,
            ...{ arrow: config.arrow, async: config.async }
        };

        // Generate code
        let stepDefinitionOutput = '';
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const isRegenerateStepDefinition = await fs.existAsync(stepDefinitionFilePath);
        if (isRegenerateStepDefinition) {
            gherkinOptions.previous = await fs.readFileAsync(stepDefinitionFilePath);
            stepDefinitionOutput = gherkinCodeParse.parse(featureFileContent, gherkinOptions);
        } else {
            stepDefinitionOutput = gherkinCodeParse.parse(featureFileContent, gherkinOptions);
        }

        // Check the output content
        const isEmptyStepDefinitionOutput = stepDefinitionOutput.trim() === '';
        if (isEmptyStepDefinitionOutput) {
            window.showInformationMessage('No changes detected in the content of the feature file!');
            return;
        }

        // Write output to file
        const dirPath = posix.dirname(stepDefinitionFilePath);
        await fs.createDirectoryAsync(dirPath);
        if (isRegenerateStepDefinition) {
            await fs.appendFileAsync(stepDefinitionFilePath, stepDefinitionOutput);
        } else {
            await fs.writeFileAsync(stepDefinitionFilePath, stepDefinitionOutput);
        }

        // Auto open file after generate step definition
        showTextDocument(stepDefinitionFilePath);

        // Show message
        window
            .showInformationMessage('Step definitions generated successfully!', 'View Output Path')
            .then((selection) => {
                if (selection === 'View Output Path') {
                    window.showInformationMessage(stepDefinitionFilePath, { modal: true });
                }
            });
    } catch (error) {
        showErrorMessageWithDetail('Failed to generate step definitions!', error);
    }
};
