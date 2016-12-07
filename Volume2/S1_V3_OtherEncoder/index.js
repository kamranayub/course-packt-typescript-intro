"use strict";
const base64encoder_1 = require('./base64encoder');
const urlencoder_1 = require('./urlencoder');
// store available encoders
var encoders = {
    base64: base64encoder_1.base64encoder,
    url: urlencoder_1.urlencoder
};
var input = "Hello World 🐶";
var b64Output = "SGVsbG8gV29ybGQ=";
var urlOutput = "Hello%20World";
console.log("INPUT: ", input);
console.log("base64 OUTPUT:", encoders.base64.encode(input));
console.log("base64 EXPECT:", b64Output);
console.log("url OUTPUT:", encoders.url.encode(input));
console.log("url EXPECT:", urlOutput);
//# sourceMappingURL=index.js.map