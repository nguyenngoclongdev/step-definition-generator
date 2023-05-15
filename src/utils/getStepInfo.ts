import { PickleStepType, StepCodeInfo, StepCodeMethod } from '../interfaces/Pickle.interface';

export const CYPRESS_CUCUMBER_PREPROCESSOR = '@badeball/cypress-cucumber-preprocessor';

export const getStepInfo = (type: PickleStepType): StepCodeInfo => {
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