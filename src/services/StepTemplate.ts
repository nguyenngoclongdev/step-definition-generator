import { PickleArg, PickleStepType, StepCodeInfo, StepCodeMethod } from '../interfaces/Pickle.interface';
import { toArgument } from '../utils/toArgument';

export const CYPRESS_CUCUMBER_PREPROCESSOR = '@badeball/cypress-cucumber-preprocessor';

export const IMPORT_STEP = `
import { Given, When, Then } from '${CYPRESS_CUCUMBER_PREPROCESSOR}';
`;

// FEATURE
// The file should have extension .feature and each feature file should have only one feature.
// The feature keyword being with the Feature: and after that add, a space and name of the feature will be written.

// SCENARIO
// Each feature file may have multiple scenarios, and each scenario starts with Scenario: followed by scenario name.

// BACKGROUND
// Background keyword helps you to add some context to the scenario. It can contain some steps of the scenario,
// but the only difference is that it should be run before each scenario.

// - The use of Given keyword is to put the system in a familiar state before the user starts interacting with the system.
//   However, you can omit writing user interactions in Given steps if Given in the “Precondition” step.
// - When the step is to define action performed by the user.
// - The use of ‘then’ keyword is to see the outcome after the action in when step. However, you can only verify noticeable changes.
const getStepCode = (stepInfo: StepCodeInfo, text: string, args?: PickleArg[]) => `
${stepInfo.method}(\`${text}\`, (${toArgument(args)}) => {
    // ${stepInfo.description}
});
`;

// UNKNOW
const getUnknownStep = (text: string, args?: PickleArg[]) => `
// IMPORTANT:
// Cycucum unable to generate the following step into source code:
// Unknown(\`${text}\`, (${toArgument(args)}) => {});
`;

const getStepInfo = (type: PickleStepType): StepCodeInfo => {
    switch (type) {
        case PickleStepType.CONTEXT: {
            return {
                method: StepCodeMethod.GIVEN,
                description: `The use of 'Given' keyword is to put the system in a familiar state before the user starts interacting with the system.`
            };
        }
        case PickleStepType.ACTION: {
            return {
                method: StepCodeMethod.WHEN,
                description: 'When the step is to define action performed by the user.'
            };
        }
        case PickleStepType.OUTCOME: {
            return {
                method: StepCodeMethod.THEN,
                description: `The use of 'Then' keyword is to see the outcome after the action in when step.`
            };
        }
        default:
            return {
                method: StepCodeMethod.UNKNOWN
            };
    }
};

export const getStep = (type: PickleStepType | undefined, text: string, args?: PickleArg[]): string => {
    if (!type || type === PickleStepType.UNKNOWN) {
        return getUnknownStep(text, args);
    }

    const stepInfo = getStepInfo(type);
    return getStepCode(stepInfo, text, args);
};

export const getStepRegex = (type: PickleStepType | undefined, text: string): RegExp | undefined => {
    if (!type || type === PickleStepType.UNKNOWN) {
        return undefined;
    }

    // Match text
    // - Given(`I execute before step`, ()
    // - Given('I execute before step', () => {
    const stepInfo = getStepInfo(type);
    // const regex = stepInfo.method + '\050[`\047"]' + text + '[`\047"], \050.*?\051';
    return new RegExp(stepInfo.method + '\\x28[`\x27"]' + text + '[`\x27"], \x28.*?\x29');
};
