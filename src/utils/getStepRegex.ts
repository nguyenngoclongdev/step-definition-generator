import { PickleArg, PickleStepType } from '../interfaces/Pickle.interface';
import { LanguageTemplate } from '../interfaces/Template.interface';
import { CYPRESS_CUCUMBER_PREPROCESSOR, getStepInfo } from '../utils/getStepInfo';

export const getStepRegex = (type: PickleStepType | undefined, text: string): RegExp | undefined => {
    if (!type || type === PickleStepType.UNKNOWN) {
        return undefined;
    }

    // Match text
    // - Given(`I execute before step`, ()
    // - Given('I execute before step', ()
    // - Given("I execute before step", ()
    const stepInfo = getStepInfo(type);
    return new RegExp(stepInfo.method + '\\x28[`\x27"]' + text + '[`\x27"], \x28.*?\x29');
};