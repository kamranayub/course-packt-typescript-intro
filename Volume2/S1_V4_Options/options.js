"use strict";
const encoders_1 = require('./encoders');
class Options {
    constructor(input, args) {
        this.input = input;
        if (typeof args.encoder === 'undefined') {
            throw new Error(`Please pass a valid encoder option: ${Object.keys(encoders_1.encoders).join(', ')}`);
        }
        this.encoderType = args.encoder;
        this.encoder = encoders_1.encoders[this.encoderType];
    }
}
exports.Options = Options;
//# sourceMappingURL=Options.js.map