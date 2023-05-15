import { PickleArg } from '../interfaces/Pickle.interface';

const toCamelCase = (input: string): string => {
    return input
        .replace(/[^a-zA-Z0-9 ]/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, '');
};

export const toArgument = (args: PickleArg[] | undefined, withType: boolean = true) => {
    if (!args || args.length <= 0) {
        return '';
    }

    return args?.map(({ name, type }) => {
        if (!withType) {
            return `${toCamelCase(name)}`;
        }
        return `${toCamelCase(name)}: ${type}`;
    }).join(', ');
};
