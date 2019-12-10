module.exports = function imageBox(string) {
    if (typeof string !== "string") throw new TypeError("ImageBox wants a string!");
    return string;
};