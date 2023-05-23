import { GherkinCodeParse } from '@nguyenngoclongdev/gherkin';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureFilePath, getLanguage, getLanguageExt, getRunner, showErrorMessageWithDetail } from '../utils';
import path = require('path');

const showTextDocument = (stepDefinitionFilePath: string): void => {
    const existingDoc = vscode.workspace.textDocuments.find(doc => doc.uri.fsPath === stepDefinitionFilePath);
    if (existingDoc) {
        const visibleEditor = vscode.window.visibleTextEditors.find(editor => editor.document === existingDoc);
        if (visibleEditor) {
            vscode.window.showTextDocument(visibleEditor.document, visibleEditor.viewColumn, false);
        } else {
            vscode.window.showTextDocument(existingDoc, { preserveFocus: false });
        }
    } else {
        const stepDefinitionFileUri = vscode.Uri.file(stepDefinitionFilePath);
        vscode.window.showTextDocument(stepDefinitionFileUri, { preserveFocus: false });
    }
};

export const generateStepDefinitionToFile = async (uri: vscode.Uri, config: ExtensionConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature file path
        const featureFilePath = getFeatureFilePath(uri);
        if (!featureFilePath) {
            vscode.window.showWarningMessage('Open .feature or .features file before running the command!');
            return;
        }

        // Get step definition file path
        const featureFileExt = path.parse(featureFilePath).ext;
        const stepDefinitionFileExt = getLanguageExt(language);
        const stepDefinitionFilePath = featureFilePath.slice(0, -featureFileExt.length).concat(stepDefinitionFileExt);

        // Get feature content
        const featureFileContent = readFileSync(featureFilePath, 'utf8');

        // Generate code
        let stepDefinitionOutput = "";
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const isRegenerateStepDefinition = fs.existsSync(stepDefinitionFilePath);
        if (isRegenerateStepDefinition) {
            const stepDefinitionFileContent = fs.readFileSync(stepDefinitionFilePath, 'utf-8');
            stepDefinitionOutput = gherkinCodeParse.parse(featureFileContent, stepDefinitionFileContent);
        } else {
            stepDefinitionOutput = gherkinCodeParse.parse(featureFileContent);
        }

        // Check the output content
        const isEmptyStepDefinitionOutput = stepDefinitionOutput.trim() === '';
        if (isEmptyStepDefinitionOutput) {
            vscode.window.showInformationMessage('No changes detected in the content of the feature file!');
            return;
        }

        // Write output to file
        const dirPath = path.dirname(stepDefinitionFilePath);
        fs.mkdir(dirPath, () => {
            if (isRegenerateStepDefinition) {
                fs.appendFileSync(stepDefinitionFilePath, stepDefinitionOutput);
            } else {
                fs.writeFileSync(stepDefinitionFilePath, stepDefinitionOutput);
            }
        });

        // Auto open file after generate step definition
        showTextDocument(stepDefinitionFilePath);

        // Show message
        vscode.window.showInformationMessage('Step definitions generated successfully!', 'View Output Path')
            .then((selection) => {
                if (selection === 'View Output Path') {
                    vscode.window.showInformationMessage(stepDefinitionFilePath, { modal: true });
                }
            });
    } catch (error) {
        showErrorMessageWithDetail('Failed to generate step definitions!', error);
    }
};
