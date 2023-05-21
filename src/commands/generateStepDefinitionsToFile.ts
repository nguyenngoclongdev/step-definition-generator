import * as fs from 'fs';
import * as vscode from 'vscode';
import path = require('path');
import { GherkinCodeParse } from '@nguyenngoclongdev/cycucum-gherkin';
import { getFeatureContent, getLanguage, getRunner } from '../utils';
import { CycucumConfiguration } from '../extension';

const overrideFile = (stepDefinitionFilePath: string, content: string): void => {
    const dirPath = path.dirname(stepDefinitionFilePath);
    fs.mkdir(dirPath, () => {
        fs.writeFileSync(stepDefinitionFilePath, content);
    });
};

const appendFile = (stepDefinitionFilePath: string, content: string): void => {
    const dirPath = path.dirname(stepDefinitionFilePath);
    fs.mkdir(dirPath, () => {
        fs.appendFileSync(stepDefinitionFilePath, content);
    });
};

const getStepDefinitionPath = (uri: vscode.Uri): string => {
    const featureExt = '.feature';
    const stepDefinitionExt = '.ts';
    const fileNamePath = uri?.fsPath;
    if (fileNamePath?.endsWith(featureExt)) {
        return fileNamePath.slice(0, -featureExt.length).concat(stepDefinitionExt);
    }
    return '';
};

export const generateStepDefinitionsToFile = async (uri: vscode.Uri, config: CycucumConfiguration): Promise<void> => {
    try {
        const runner = getRunner(config.runner);
        const language = getLanguage(config.language);

        // Get feature content
        const featureContent = getFeatureContent(uri);

        // Generate code and write to file
        const gherkinCodeParse = new GherkinCodeParse(runner, language);
        const stepDefinitionFilePath = getStepDefinitionPath(uri);
        if (fs.existsSync(stepDefinitionFilePath)) {
            const stepDefinitionFileContent = fs.readFileSync(stepDefinitionFilePath, 'utf-8');
            const output = gherkinCodeParse.parse(featureContent, stepDefinitionFileContent);
            appendFile(stepDefinitionFilePath, output);
        } else {
            const output = gherkinCodeParse.parse(featureContent);
            overrideFile(stepDefinitionFilePath, output);
        }
        vscode.window.showInformationMessage('Generate step definitions successful!', stepDefinitionFilePath);
    } catch (error) {
        const errorMessage = (error as Error)?.message;
        vscode.window.showErrorMessage('Generate step definitions failed!', errorMessage);
    }
};
