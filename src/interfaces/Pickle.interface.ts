/* eslint-disable @typescript-eslint/naming-convention */
import { Pickle as OriginalPickle, PickleStep as OriginalPickleStep, PickleStepType } from '@cucumber/messages';

export interface PickleArg {
    name: string;
    type: string;
}

export interface PickleStep extends OriginalPickleStep {
    args?: PickleArg[];
}

export interface Pickle extends OriginalPickle {
    steps: readonly PickleStep[];
}

export enum StepCodeMethod {
    UNKNOWN = 'Unknown',
    GIVEN = 'Given',
    WHEN = 'When',
    THEN = 'Then'
}

export interface StepCodeInfo {
    method: StepCodeMethod;
    description?: string;
}

export { PickleStepType };
