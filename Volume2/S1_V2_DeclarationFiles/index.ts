import { IEncoder } from './IEncoder';
import { base64encode } from './base64encoder';

// store available encoders
var encoders = {
    base64: base64encode
};

// use base64 by default
var encoder = encoders.base64;

var input = "Hello World 🐶";
var output = "SGVsbG8gV29ybGQg8J+Qtg==";

console.log("INPUT: ", input);
console.log("OUTPUT:", encoder(input));
console.log("EXPECT:", output);