import { Router } from 'express';
import { calculateCDBPosFixado } from '../utils/cdb.utils';


const cdbRouter = Router();

interface cdbCalcRequestDTO {
  investmentDate: string;
  cdbRate: number;
  currentDate: string;
}

// Requisição POST que fará o cálculo e retorno da evolução do investimento de CDB (*/cdb/)
cdbRouter.post('/', async (request, response) => {

  // Funcao handleIncomeData separa e valida todas as variaveis recebidas na requisicao
  const {
    checkInvestmentDate,
    checkCurrentDate,
    currentDateDay,
    currentDateMonth,
    currentDateYear,
    cdbRate,
    investmentDateDay,
    investmentDateMonth,
    investmentDateYear
  } = handleIncomeData(request.body);

  // Checagem se houve alguma variavel recebida invalida
  if(!checkInvestmentDate) {
    return response.status(400).json({error: 'Check the date of the invesment'});
  }

  if(!checkCurrentDate) {
    return response.status(400).json({error: 'Check the end date of the invesment'});
  }

  if(typeof(cdbRate) !== 'number') {
    return response.status(400).json({error: 'CDB Rate must be a number'});
  }
  
  // Funcao principal de calculo do CDB
  const cdiResponse = calculateCDBPosFixado({
    investmentDate: new Date(
      Number(investmentDateYear),
      Number(investmentDateMonth) - 1,
      Number(investmentDateDay)
    ),
    cdbRate,
    currentDate: new Date(
      Number(currentDateYear),
      Number(currentDateMonth) - 1,
      Number(currentDateDay)
    ),
  });
  
  // Tudo ok, retorna a evolucao do investimento
  return response.json(cdiResponse);
});

export function handleIncomeData(data: cdbCalcRequestDTO) {
  const {
    investmentDate,
    cdbRate,
    currentDate
  } = data;
  let checkInvestmentDate = true;
  let checkCurrentDate = true;

  // Separação das variáveis recebidas no padrão yyyy-mm-dd
  const [investmentDateYear, investmentDateMonth, investmentDateDay] = investmentDate.split('-');
  const [currentDateYear, currentDateMonth, currentDateDay] = currentDate.split('-');

  // Checagem se as datas foram recebidas corretamente
  // - Todas sao numeros
  // - Dias entre 1 e 31
  // - Meses entre 1 e 12
  if(Number(investmentDateDay) < 1 || Number(investmentDateDay) > 31 ||
  Number(investmentDateMonth) < 1 || Number(investmentDateMonth) > 12 ||
  (!Number(investmentDateYear) || !Number(investmentDateMonth) || !Number(investmentDateDay))) {
    checkInvestmentDate = false;
  }

  if(Number(currentDateDay) < 1 || Number(currentDateDay) > 31 ||
  Number(currentDateMonth) < 1 || Number(currentDateMonth) > 12 ||
  (!Number(currentDateYear) || !Number(currentDateMonth) || !Number(currentDateDay))) {
    checkCurrentDate = false;
  }

  return {
    checkInvestmentDate,
    checkCurrentDate,
    investmentDateDay,
    investmentDateMonth,
    investmentDateYear,
    cdbRate,
    currentDateDay,
    currentDateMonth,
    currentDateYear
  };
}


export default cdbRouter;