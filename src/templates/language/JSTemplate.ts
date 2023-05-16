import { PickleArg, StepCodeInfo } from '../../interfaces/Pickle.interface';
import { LanguageTemplate } from '../../interfaces/Template.interface';
import { toArgument } from '../../utils/toArgument';

export class JSTemplate implements LanguageTemplate {
    getImportCode = (library: string) => `var { Given, When, Then } = require('${library}');`;

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
    getStepCode = (stepInfo: StepCodeInfo, text: string, args?: PickleArg[]) => `
${stepInfo.method}(\`${text}\`, (${toArgument(args, false)}) => {
    // ${stepInfo.description}
});
`;

    // UNKNOW
    getUnknownStep = (text: string, args?: PickleArg[]) => `
// IMPORTANT:
// Cycucum unable to generate the following step into source code:
// Unknown(\`${text}\`, (${toArgument(args, false)}) => {});
`;
};