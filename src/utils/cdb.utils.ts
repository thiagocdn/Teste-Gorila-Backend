import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { calculateTCDIacc, calculateTCDIk, round, roundFloor } from './math.utils';
import { formatDateResponse } from './date.utils';

interface calculateCdbDTO {
  investmentDate: Date;
  cdbRate: number;
  currentDate: Date;
}

interface CSVFileDTO {
  dtDate: Date;
  dLastTradePrice: number;
}

interface CSVFileDTORaw {
  dtDate: string;
  dLastTradePrice: string;
}

let cdiPrices: CSVFileDTO[] = [];
fs.createReadStream(path.resolve(__dirname, '..', 'public', 'CDI_Prices.csv'))
.pipe(csv.parse({ headers: true }))
.on('error', error => console.error(error))
.on('data', ({dtDate, dLastTradePrice}: CSVFileDTORaw) => {
  const [dtDateDay, dtDateMoth, dtDateYear] = dtDate.split('/');
  cdiPrices.unshift({
    dtDate: new Date(
      Number(dtDateYear),
      Number(dtDateMoth) - 1, // Adjust for month
      Number(dtDateDay)
    ),
    dLastTradePrice: Number(dLastTradePrice)})
})
.on('end', () => {
  cdiPrices.sort((a, b) => a.dtDate > b.dtDate ? 1 : -1 )
})

export function calculateCDBPosFixado({
    investmentDate,
    cdbRate,
    currentDate
  }: calculateCdbDTO) {
    

    // Poderia usar um .map para fazer TUDO, porem gastará processamento atoa
    // caso a currentDate seja menor que a ultima data do CSV
    const initialIndex = cdiPrices.findIndex((cdiData) => {
      return (cdiData.dtDate >= investmentDate);
    });
    
    let cdiResponse = [];
    let cdiCumulator = 1;
    for (let i = initialIndex; i < cdiPrices.length; i++) {
      if(cdiPrices[i].dtDate >= currentDate) break;
      const TCDIk = calculateTCDIk(cdiPrices[i].dLastTradePrice);
      cdiCumulator = calculateTCDIacc(cdiCumulator, TCDIk, cdbRate);
      const date = formatDateResponse(cdiPrices[i].dtDate);
      cdiResponse.push({
        date,
        unitPrice: roundFloor(cdiCumulator * 1000,2)
      });
    }
    return cdiResponse;
}
