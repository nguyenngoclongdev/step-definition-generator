import { AstBuilder, GherkinClassicTokenMatcher, Parser, compile } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';
import { readFileSync } from 'fs';
import * as vscode from 'vscode';
import { TextEditor } from 'vscode';
import { CycucumConfiguration } from '../interfaces/Config.interface';
import { Pickle, PickleArg, PickleStep } from '../interfaces/Pickle.interface';

export class FeatureProcessor {
    private readonly uri: vscode.Uri;
    private readonly config: CycucumConfiguration;
    constructor(uri: vscode.Uri, config: CycucumConfiguration) {
        this.uri = uri;
        this.config = config;
    }

    private getActiveTextEditor = (): TextEditor => {
        return vscode.window.activeTextEditor as TextEditor;
    };

    private getFeatureContent = (): string => {
        // If user select from explorer context, get file content from explorer context
        const featureFileFromExplorer = this.uri?.fsPath;
        if (featureFileFromExplorer) {
            return readFileSync(featureFileFromExplorer, 'utf8');
        }

        // If user not selected text editor
        const activeTextEditor = this.getActiveTextEditor();
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

    private enhancePickleStep = (pickleStep: PickleStep) => {
        const varRegex: RegExp = /".*?"/g;
        var matches = pickleStep.text.match(varRegex);
        if (matches && matches.length) {
            // Generate new argument
            let args: PickleArg[] = [];
            for (let i = 1; i <= matches.length; i++) {
                // const arg = matches[i].trim().slice(1, -1);
                args.push({
                    name: `arg${i}`,
                    type: 'string',
                });
            }
            pickleStep.args = args;

            // Generate new text
            pickleStep.text = pickleStep.text.replace(varRegex, `{string}`);
        }
    };

    parseFeatureContent = (): readonly Pickle[] => {
        // Get content from selected text or file is in active
        const content = this.getFeatureContent();

        // Parse content
        const uuidFn = IdGenerator.uuid();
        const builder = new AstBuilder(uuidFn);
        const matcher = new GherkinClassicTokenMatcher(); // or Gherkin.GherkinInMarkdownTokenMatcher()

        const gherkinParser = new Parser(builder, matcher);
        gherkinParser.stopAtFirstError = false;
        const gherkinDocument = gherkinParser.parse(content);
        const pickles = compile(gherkinDocument, this.uri.fsPath, uuidFn) as Pickle[];

        // Analytics the argument
        pickles.forEach((pickle) => pickle.steps?.forEach((pickleStep) => this.enhancePickleStep(pickleStep)));
        return pickles;
    };
}
