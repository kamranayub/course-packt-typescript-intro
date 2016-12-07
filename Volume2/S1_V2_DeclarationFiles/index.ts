import { base64encode } from './base64encoder';

// store available encoders
var encoders = {
    base64: base64encode
};

var input = "Hello World 🐶";
var output = "SGVsbG8gV29ybGQg8J+Qtg==";

console.log("INPUT: ", input);
console.log("OUTPUT:", encoders.base64(input));
console.log("EXPECT:", output);