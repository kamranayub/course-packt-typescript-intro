import { IEncoder } from './IEncoder';
import { encoders } from './encoders';

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
        if (typeof args.encoding === 'undefined') {
            throw new Error(`Please pass a valid encoder option: ${Object.keys(encoders).join(', ')}`);
        }

        this.decode = args.decode;
        this.encoding = args.encoding;
        this.encoder = encoders[this.encoding];
    }
}