import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

interface CSVFileDTO {
  dtDate: Date;
  dLastTradePrice: number;
}

interface CSVFileDTORaw {
  dtDate: string;
  dLastTradePrice: string;
}

// Função que roda uma única vez ao iniciar o programa para ler o arquivo
// de dados do CDI e criar uma variavel iterável.
// Essa leitura única poupa processamento e melhora velocidade de resposta
// ao inves de ler o mesmo arquivo TODA vez que uma requisição é realizada.
export let cdiPrices: CSVFileDTO[] = [];
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
  // Ao final da leitura, ele ordena o array em ordem crescente de data
  cdiPrices.sort((a, b) => a.dtDate > b.dtDate ? 1 : -1 )
});
