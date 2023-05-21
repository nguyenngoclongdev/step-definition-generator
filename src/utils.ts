import { SupportedLanguage, SupportedRunner } from "@nguyenngoclongdev/cucumber-gherkin";
import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { TextEditor } from 'vscode';

export const getRunner = (runner: string | undefined): SupportedRunner => {
    switch (runner?.toLowerCase()) {
        case SupportedRunner.cucumberjs:
            return SupportedRunner.cucumberjs;
        case SupportedRunner.cypress:
            return SupportedRunner.cypress;
        case SupportedRunner.playwright:
            return SupportedRunner.playwright;
        default:
            return SupportedRunner.cypress;
    }
};

export const getLanguage = (language: string | undefined): SupportedLanguage => {
    switch (language?.toLowerCase()) {
        case SupportedLanguage.javascript:
            return SupportedLanguage.javascript;
        case SupportedLanguage.typescript:
            return SupportedLanguage.typescript;
        default:
            return SupportedLanguage.typescript;
    }
};

const getActiveTextEditor = (): TextEditor => {
    return vscode.window.activeTextEditor as TextEditor;
};

export const getFeatureContent = (uri: vscode.Uri): string => {
    // If user select from explorer context, get file content from explorer context
    const featureFileFromExplorer = uri?.fsPath;
    if (featureFileFromExplorer) {
        return readFileSync(featureFileFromExplorer, 'utf8');
    }

    // If user not selected text editor
    const activeTextEditor = getActiveTextEditor();
    if (!activeTextEditor) {
        vscode.window.showWarningMessage('Please select text editor!');
        return '';
    }

    // If text editor not a feature file
    const featureFilePath = activeTextEditor.document.fileName;
    if (!featureFilePath?.endsWith('.feature')) {
        vscode.window.showWarningMessage('This file not supported!');
        return '';
    }

    // If user select text in the feature file, return text selected
    const selectedText = activeTextEditor.document.getText(activeTextEditor.selection);
    if (selectedText?.length > 0) {
        return selectedText;
    }

    // Othewise, return feature file content from active editor
    return readFileSync(featureFilePath, 'utf8');
};