import * as vscode from 'vscode';
import { Pickle } from '../interfaces/Pickle.interface';
import { IMPORT_STEP, getStep } from './StepTemplate';

export default class StepDefinition {
    private readonly uri: vscode.Uri;
    constructor(uri: vscode.Uri) {
        this.uri = uri;
    }

    generate = async (pickles: readonly Pickle[], includeImport: boolean = true): Promise<string> => {
        const output: string[] = includeImport ? [IMPORT_STEP] : [`\n`];
        pickles?.forEach((pickle) => {
            pickle.steps?.forEach((pickleStep) => {
                const { type, text, args } = pickleStep;
                const step = getStep(type, text, args);
                if (!output.includes(step)) {
                    output.push(step);
                }
            });
        });
        return output.join('');
    };
}
