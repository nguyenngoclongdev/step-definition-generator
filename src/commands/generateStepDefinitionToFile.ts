import { GherkinCodeParse } from '@nguyenngoclongdev/gherkin';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { ExtensionConfiguration } from '../extension';
import { getFeatureFilePath, getLanguage, getLanguageExt, getRunner } from '../utils';
import path = require('path');

const overrideFile = (stepDefinitionFilePath: string, content: string): void => {
    if (!content.trim()) {
        return;
    }

    const dirPath = path.dirname(stepDefinitionFilePath);
    fs.mkdir(dirPath, () => {
        fs.writeFileSync(stepDefinitionFilePath, content);
    });
};

const appendFile = (stepDefinitionFilePath: string, content: string): void => {
    if (!content.trim()) {
        return;
    }

    const dirPath = path.dirname(stepDefinitionFilePath);
    fs.mkdir(dirPath, () => {
        fs.appendFileSync(stepDefinitionFilePath, content);
    });
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

        // Generate code and write to file
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        if (fs.existsSync(stepDefinitionFilePath)) {
            const stepDefinitionFileContent = fs.readFileSync(stepDefinitionFilePath, 'utf-8');
            const output = gherkinCodeParse.parse(featureFileContent, stepDefinitionFileContent);
            appendFile(stepDefinitionFilePath, output);
        } else {
            const output = gherkinCodeParse.parse(featureFileContent);
            overrideFile(stepDefinitionFilePath, output);
        }
        vscode.window.showInformationMessage('Step definitions generated successfully!', stepDefinitionFilePath);
    } catch (error) {
        const errorMessage = (error as Error)?.message;
        vscode.window.showErrorMessage('Failed to generate step definitions!', errorMessage);
    }
};
