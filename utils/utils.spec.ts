import { calculateCDBPosFixado } from "./cdb.utils";
import { formatDateResponse } from "./date.utils";
import { calculateTCDIacc, calculateTCDIk, round, roundFloor } from "./math.utils";

jest.mock('./file.utils', () => ({
  cdiPrices: [
    {
      dtDate: new Date(2016, 4, 13),
      dLastTradePrice: 14.13,
    },
    {
      dtDate: new Date(2016, 4, 16),
      dLastTradePrice: 14.13,
    },
    {
      dtDate: new Date(2016, 4, 17),
      dLastTradePrice: 14.13,
    },
    {
      dtDate: new Date(2016, 4, 18),
      dLastTradePrice: 14.13,
    },
    {
      dtDate: new Date(2016, 4, 19),
      dLastTradePrice: 14.13,
    },
    {
      dtDate: new Date(2016, 4, 20),
      dLastTradePrice: 14.13,
    },
    {
      dtDate: new Date(2016, 4, 21),
      dLastTradePrice: 14.13,
    },
  ]})
);
describe('CDB Calculation Test', () => {
  it('Should be able to return the evolution array for a given data in CDB Investment', () => {
    const calculatedCDB = calculateCDBPosFixado({
      cdbRate: 105.5,
      investmentDate: new Date(2016, 4, 15),
      currentDate: new Date(2016, 4, 20),
    })
    
    expect(calculatedCDB).toEqual([
      {
        "date": "2016-05-16",
        "unitPrice": 1000.55
      },
      {
        "date": "2016-05-17",
        "unitPrice": 1001.1
      },
      {
        "date": "2016-05-18",
        "unitPrice": 1001.66
      },
      {
        "date": "2016-05-19",
        "unitPrice": 1002.21
      }
    ])
  });
});

describe('Date utils tests', () => {
  it('Should be able to return a date in the format yyyy-mm-dd', () => {
    expect(formatDateResponse(new Date(2020,9,25))).toBe('2020-10-25')
  });
});

describe('Math utils tests', () => {
  it('Should be able to round a number to 2 decimal places in a ceil situation', () => {
    expect(round(432.34567, 2)).toBe(432.35);
  });
  
  it('Should be able to round a number to 8 decimal places in a floor situation', () => {
    expect(round(432.3454321325, 8)).toBe(432.34543213);
  });
  
  it('Should be able to round floor a number with 2 decimal places in a floor situation', () => {
    expect(roundFloor(432.3454321, 5)).toBe(432.34543);
  });
  
  it('Should be able to round floor a number with 3 decimal places in a ceil situation', () => {
    expect(roundFloor(432.34567, 3)).toBe(432.345);
  });
  
  it('Should be able to to calculate the TCDIk with 8 decimal places given a CDIk', () => {
    expect(calculateTCDIk(13.8)).toBe(0.00051312);
  });
  
  it('Should be able to to calculate the TCDI accumulated with 16 decimal places given an accumulated number, an TCDIk a CDB rate', () => {
    expect(calculateTCDIacc(1, 0.00051312, 105)).toBe(1.000538776);
  });

});
