import { PickleArg, PickleStepType } from '../interfaces/Pickle.interface';
import { LanguageTemplate } from '../interfaces/Template.interface';
import { CYPRESS_CUCUMBER_PREPROCESSOR, getStepInfo } from '../utils/getStepInfo';
import { JSTemplate } from './language/JSTemplate';
import { TSTemplate } from './language/TSTemplate';

export class StepTemplate {
    private readonly template: LanguageTemplate;
    constructor(language: string | undefined) {
        this.template = language === 'javascript' ? new JSTemplate() : new TSTemplate();
    }

    getImport = () => {
        return this.template.getImportCode(CYPRESS_CUCUMBER_PREPROCESSOR);
    };

    getStep = (type: PickleStepType | undefined, text: string, args?: PickleArg[]): string => {
        if (!type || type === PickleStepType.UNKNOWN) {
            return this.template.getUnknownStep(text, args);
        }

        const stepInfo = getStepInfo(type);
        return this.template.getStepCode(stepInfo, text, args);
    };
}
