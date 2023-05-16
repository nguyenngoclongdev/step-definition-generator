import * as fs from 'fs';
import * as vscode from 'vscode';
import { CycucumConfiguration } from '../interfaces/Config.interface';
import { FeatureProcessor } from '../services/FeatureProcessor';
import StepDefinitions from '../services/StepDefinition';
import { getStepRegex } from '../utils/getStepRegex';
import path = require('path');
import { getImportLibrary } from '../utils/getImportLibrary';

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
        // Parse feature content
        const featureProcessor = new FeatureProcessor(uri, config);
        const content = featureProcessor.parseFeatureContent();

        // Generate code and write to file
        const stepDefinitions = new StepDefinitions(uri, config);
        const stepDefinitionFilePath = getStepDefinitionPath(uri);
        if (fs.existsSync(stepDefinitionFilePath)) {
            // Remove duplicates
            const stepDefinitionFileContent = fs.readFileSync(stepDefinitionFilePath, 'utf-8').trim();
            if (stepDefinitionFileContent) {
                content.map((pickle) => {
                    pickle.steps = pickle.steps.filter((pickleStep) => {
                        const { text, type } = pickleStep;
                        const stepRegex = getStepRegex(type, text);
                        return !stepRegex?.test(stepDefinitionFileContent);
                    });
                });
            }

            const importLibrary = getImportLibrary(config);
            const isIncludeImport = !stepDefinitionFileContent.includes(importLibrary);
            const output = await stepDefinitions.generate(content, isIncludeImport);
            appendFile(stepDefinitionFilePath, output);
        } else {
            const output = await stepDefinitions.generate(content);
            overrideFile(stepDefinitionFilePath, output);
        }
        vscode.window.showInformationMessage('Generate step definitions successful!', stepDefinitionFilePath);
    } catch (error) {
        const errorMessage = (error as Error)?.message;
        vscode.window.showErrorMessage('Generate step definitions failed!', errorMessage);
    }
};
