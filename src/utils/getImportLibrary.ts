import { CycucumConfiguration } from '../interfaces/Config.interface';

export const getImportLibrary = (config: CycucumConfiguration): string => {
    return config.import || '@badeball/cypress-cucumber-preprocessor';
};