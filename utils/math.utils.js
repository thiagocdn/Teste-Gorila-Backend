"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTCDIacc = exports.calculateTCDIk = exports.roundFloor = exports.round = void 0;
function round(number, decimalPlaces) {
    var factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}
exports.round = round;
function roundFloor(number, decimalPlaces) {
    var factor = Math.pow(10, decimalPlaces);
    return Math.floor(number * factor) / factor;
}
exports.roundFloor = roundFloor;
function calculateTCDIk(CDIk) {
    return round(Math.pow((CDIk / 100) + 1, (1 / 252)) - 1, 8);
}
exports.calculateTCDIk = calculateTCDIk;
function calculateTCDIacc(accumalted, TCDIk, cdbRate) {
    return round(accumalted * (1 + TCDIk * cdbRate / 100), 16);
}
exports.calculateTCDIacc = calculateTCDIacc;
