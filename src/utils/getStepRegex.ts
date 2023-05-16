import { PickleStepType } from '../interfaces/Pickle.interface';
import { getStepInfo } from '../utils/getStepInfo';

export const getStepRegex = (type: PickleStepType | undefined, text: string): RegExp | undefined => {
    if (!type || type === PickleStepType.UNKNOWN) {
        return undefined;
    }

    // Match text
    // - Given(`I execute before step`, ()
    // - Given('I execute before step', ()
    // - Given("I execute before step", ()
    // - Given(
    //    "I execute before step", ()
    const stepInfo = getStepInfo(type);
    const nl = '(|[ ]+)(|\n)(|[ ]+)'; // space and new line
    return new RegExp(stepInfo.method + '\\x28' + nl + '[`\x27"]' + text + '[`\x27"],' + nl + '\x28.*?\x29');
};