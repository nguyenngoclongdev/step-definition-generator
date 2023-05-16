import { CycucumConfiguration } from '../interfaces/Config.interface';
import { PickleArg, PickleStepType } from '../interfaces/Pickle.interface';
import { LanguageTemplate } from '../interfaces/Template.interface';
import { getImportLibrary } from '../utils/getImportLibrary';
import { getStepInfo } from '../utils/getStepInfo';
import { JSTemplate } from './language/JSTemplate';
import { TSTemplate } from './language/TSTemplate';

export class StepTemplate {
    private readonly config: CycucumConfiguration;
    private readonly template: LanguageTemplate;
    constructor(config: CycucumConfiguration) {
        this.config = config;
        this.template = config.language === 'javascript' ? new JSTemplate() : new TSTemplate();
    }

    getImport = () => {
        const importLibrary = getImportLibrary(this.config);
        return this.template.getImportCode(importLibrary);
    };

    getStep = (type: PickleStepType | undefined, text: string, args?: PickleArg[]): string => {
        if (!type || type === PickleStepType.UNKNOWN) {
            return this.template.getUnknownStep(text, args);
        }

        const stepInfo = getStepInfo(type);
        return this.template.getStepCode(stepInfo, text, args);
    };
}
