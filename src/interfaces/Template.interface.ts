import { PickleArg, StepCodeInfo } from './Pickle.interface';

export interface LanguageTemplate {
    getImportCode: (library: string) => string;
    getStepCode: (stepInfo: StepCodeInfo, text: string, args?: PickleArg[]) => string;
    getUnknownStep: (text: string, args?: PickleArg[]) => string;
}
