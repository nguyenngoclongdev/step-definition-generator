import { SupportedLanguage, SupportedRunner } from "@nguyenngoclongdev/gherkin";
import * as vscode from 'vscode';
import { TextEditor } from 'vscode';
import { SUPPORTED_FEATURE_FILE } from "./extension";

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

export const getLanguageExt = (language: SupportedLanguage): string => {
    switch (language?.toLowerCase()) {
        case SupportedLanguage.javascript:
            return '.js';
        case SupportedLanguage.typescript:
            return '.ts';
        default:
            return '.ts';
    }
};

const getActiveTextEditor = (): TextEditor => {
    return vscode.window.activeTextEditor as TextEditor;
};

export const getFeatureFilePath = (uri: vscode.Uri): string | undefined => {
    // If user select from explorer context, get file content from explorer context
    const featureFileFromExplorer = uri?.fsPath;
    if (featureFileFromExplorer) {
        return featureFileFromExplorer;
    }

    // If user not selected text editor
    const activeTextEditor = getActiveTextEditor();
    if (!activeTextEditor) {
        return undefined;
    }

    // If text editor not a feature file
    const featureFilePath = activeTextEditor.document.fileName;
    const fileIsNotSupport = !featureFilePath || !SUPPORTED_FEATURE_FILE.some(ext => featureFilePath.endsWith(ext));
    if (fileIsNotSupport) {
        return undefined;
    }
    return featureFilePath;
};