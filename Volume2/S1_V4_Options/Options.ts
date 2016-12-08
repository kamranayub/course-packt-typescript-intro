import { IEncoder } from './IEncoder';
import { encoders } from './encoders';

function throwIfUndefined(value: any, message: string) {
    if (typeof value === 'undefined') {
        throw new Error(message);
    }
}

const encodingChoices = Object.keys(encoders).join(', ');

/**
 * Parsed properties from process args
 */
export interface ProcessArgs {
    readonly encoding: string;
    readonly decode: boolean;
} 

export class Options implements ProcessArgs {
    readonly encoder: IEncoder;
    readonly encoding: string;
    readonly decode: boolean;

    constructor(public readonly input: string, args: ProcessArgs) {
        throwIfUndefined(input, `Please pass an input string to encode`);
        throwIfUndefined(args.encoding, `Please pass a valid encoder option: ${encodingChoices}`);
        throwIfUndefined(args.decode, `Please pass a valid decode option: true or false`);

        this.decode = args.decode;
        this.encoding = args.encoding;
        this.encoder = encoders[this.encoding];
    }
}