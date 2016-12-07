"use strict";
const OptionsParser = require('./OptionsParser');
var opts = OptionsParser.fromArgv(process.argv.slice(2));
console.log("ENCODER:", opts.encoderType);
console.log("INPUT:  ", opts.input);
console.log("OUTPUT: ", opts.encoder.encode(opts.input));
//# sourceMappingURL=index.js.map