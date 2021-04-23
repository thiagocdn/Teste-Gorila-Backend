import { calculateTCDIacc, calculateTCDIk, roundFloor } from './math.utils';
import { formatDateResponse } from './date.utils';

// Função que le o arquivo CSV e inclui na variável cdiPrices.
// Pode ser subtituida por uma API, consulta ao BD, etc.
// O importante é retornar a variável conforme padrão
import { cdiPrices } from './file.utils';

interface calculateCdbDTO {
  investmentDate: Date;
  cdbRate: number;
  currentDate: Date;
}


export function calculateCDBPosFixado({
    investmentDate,
    cdbRate,
    currentDate
  }: calculateCdbDTO) {
    
    // Poderia usar um .map no array para fazer toda a lógica, porem gastará
    // processamento atoa sendo necessário percorrer o array inteiro em qualquer situação.
    // Nessa estratégia é poupado checagem do array em várias situações.
    const initialIndex = cdiPrices.findIndex((cdiData) => {
      return (cdiData.dtDate >= investmentDate);
    });
    
    let cdiResponse = [];
    let cdiCumulator = 1;

    // For para fazer o processamento dos dados e calculo da evolucao
    for (let i = initialIndex; i < cdiPrices.length; i++) {
      // Caso a data seja maior (ou igual, ja que o dia precisa terminar para
      // constar a soma no investimento) ele pára a iteração.
      if(cdiPrices[i].dtDate >= currentDate) break;

      // Calculo da Taxa do CDI diário considerando o CDI anualizado na data especifica
      const TCDIk = calculateTCDIk(cdiPrices[i].dLastTradePrice);
      // Atualização do acumulador do investimento com o valor anterior,
      // a taxa do dia calculada e o % relativa do investimento
      cdiCumulator = calculateTCDIacc(cdiCumulator, TCDIk, cdbRate);
      // Formatação da data para incluir no array de retorno
      const date = formatDateResponse(cdiPrices[i].dtDate);
      // Adição do elemento de evolução no array de retorno
      cdiResponse.push({
        date,
        unitPrice: roundFloor(cdiCumulator * 1000,2)
      });
    }
    return cdiResponse;
}
