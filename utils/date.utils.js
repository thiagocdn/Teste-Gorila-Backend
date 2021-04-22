"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateResponse = void 0;
function formatDateResponse(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
}
exports.formatDateResponse = formatDateResponse;
