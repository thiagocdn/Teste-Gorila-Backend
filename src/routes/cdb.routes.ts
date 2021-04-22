import { Router } from 'express';
import { calculateCDBPosFixado } from '../utils/cdb.utils';


const cdbRouter = Router();

interface cdbCalcRequestDTO {
  investmentDate: string;
  cdbRate: number;
  currentDate: string;
}


cdbRouter.post('/', async (request, response) => {
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

  if(!checkInvestmentDate) {
    return response.json({error: 'Check the date of the invesment'});
  }

  if(!checkCurrentDate) {
    return response.json({error: 'Check the end date of the invesment'});
  }
  
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
  
  return response.json(cdiResponse);
});

function handleIncomeData(data: cdbCalcRequestDTO) {
  const {
    investmentDate,
    cdbRate,
    currentDate
  } = data;
  let checkInvestmentDate = true;
  let checkCurrentDate = true;

  const [investmentDateYear, investmentDateMonth, investmentDateDay] = investmentDate.split('-');
  const [currentDateYear, currentDateMonth, currentDateDay] = currentDate.split('-');

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