"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCDBPosFixado = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var csv = __importStar(require("fast-csv"));
var math_utils_1 = require("./math.utils");
var date_utils_1 = require("./date.utils");
var cdiPrices = [];
fs.createReadStream(path.resolve(__dirname, 'CDI_Prices.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', function (error) { return console.error(error); })
    .on('data', function (_a) {
    var dtDate = _a.dtDate, dLastTradePrice = _a.dLastTradePrice;
    var _b = dtDate.split('/'), dtDateDay = _b[0], dtDateMoth = _b[1], dtDateYear = _b[2];
    cdiPrices.unshift({
        dtDate: new Date(Number(dtDateYear), Number(dtDateMoth) - 1, // Adjust for month
        Number(dtDateDay)),
        dLastTradePrice: Number(dLastTradePrice)
    });
})
    .on('end', function () {
    cdiPrices.sort(function (a, b) { return a.dtDate > b.dtDate ? 1 : -1; });
});
function calculateCDBPosFixado(_a) {
    var investmentDate = _a.investmentDate, cdbRate = _a.cdbRate, currentDate = _a.currentDate;
    // Poderia usar um .map para fazer TUDO, porem gastará processamento atoa
    // caso a currentDate seja menor que a ultima data do CSV
    var initialIndex = cdiPrices.findIndex(function (cdiData) {
        return (cdiData.dtDate >= investmentDate);
    });
    var cdiResponse = [];
    var cdiCumulator = 1;
    for (var i = initialIndex; i < cdiPrices.length; i++) {
        if (cdiPrices[i].dtDate >= currentDate)
            break;
        var TCDIk = math_utils_1.calculateTCDIk(cdiPrices[i].dLastTradePrice);
        cdiCumulator = math_utils_1.calculateTCDIacc(cdiCumulator, TCDIk, cdbRate);
        var date = date_utils_1.formatDateResponse(cdiPrices[i].dtDate);
        cdiResponse.push({
            date: date,
            unitPrice: math_utils_1.roundFloor(cdiCumulator * 1000, 2)
        });
    }
    return cdiResponse;
}
exports.calculateCDBPosFixado = calculateCDBPosFixado;
