"use strict";
const OptionsParser = require("../OptionsParser");
describe("Encoder", () => {
    var options;
    beforeEach(() => {
        options = OptionsParser.fromArgv([""]);
    });
    it("can be loaded", () => {
        expect(true).toBe(true);
    });
});
//# sourceMappingURL=EncoderSpec.js.map