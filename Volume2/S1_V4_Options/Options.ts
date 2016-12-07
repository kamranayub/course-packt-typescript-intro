import { IEncoder } from './IEncoder';
import { encoders } from './encoders';

/**
 * Parsed properties from process args
 */
export interface ProcessArgs {
    encoder: string;
} 

export class Options {
    readonly encoder: IEncoder;
    readonly encoderType: string;

    constructor(public readonly input: string, args: ProcessArgs) {
        if (typeof args.encoder === 'undefined') {
            throw new Error(`Please pass a valid encoder option: ${Object.keys(encoders).join(', ')}`);
        }

        this.encoderType = args.encoder;
        this.encoder = encoders[this.encoderType];        
    }
}