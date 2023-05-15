import * as vscode from 'vscode';
import { Pickle } from '../interfaces/Pickle.interface';
import { CycucumConfiguration } from '../interfaces/Config.interface';
import { StepTemplate } from '../templates/StepTemplate';

export default class StepDefinition {
    private readonly uri: vscode.Uri;
    private readonly config: CycucumConfiguration;
    constructor(uri: vscode.Uri, config: CycucumConfiguration) {
        this.uri = uri;
        this.config = config;
    }

    generate = async (pickles: readonly Pickle[], includeImport: boolean = true): Promise<string> => {
        const stepTemplate = new StepTemplate(this.config.language);
        const output: string[] = includeImport ? [stepTemplate.getImport()] : [`\n`];
        pickles?.forEach((pickle) => {
            pickle.steps?.forEach((pickleStep) => {
                const { type, text, args } = pickleStep;
                const step = stepTemplate.getStep(type, text, args);
                if (!output.includes(step)) {
                    output.push(step);
                }
            });
        });
        return output.join('');
    };
}
