import { handleIncomeData } from "./cdb.routes";

describe('Check income data tests', () => {
  it('Should be able to return the proper cdbRate when set correctly', () => {
    const {
      cdbRate,
    } = handleIncomeData({
      investmentDate: '2016-04-22',
      currentDate: '2017-07-17',
      cdbRate: 105.5
    });
    expect(cdbRate).toBe(105.5)
  });

  it('Should be able to return the year, month and day for invesmentData when set correctly', () => {
    const {
      investmentDateDay,
      investmentDateMonth,
      investmentDateYear
    } = handleIncomeData({
      investmentDate: '2016-04-22',
      currentDate: '2017-07-17',
      cdbRate: 105.5
    });
    expect(investmentDateDay).toBe('22');
    expect(investmentDateMonth).toBe('04');
    expect(investmentDateYear).toBe('2016');
  });

  it('Should be able to return the year, month and day for currentDate when set correctly', () => {
    const {
      currentDateDay,
      currentDateMonth,
      currentDateYear
    } = handleIncomeData({
      investmentDate: '2016-04-22',
      currentDate: '2017-07-17',
      cdbRate: 105.5
    });
    expect(currentDateDay).toBe('17');
    expect(currentDateMonth).toBe('07');
    expect(currentDateYear).toBe('2017');
  });

  it('Should be able to return the (checkInvestmentDate and checkCurrentDate) == true when everything is set correctly', () => {
    const {
      checkInvestmentDate,
      checkCurrentDate
    } = handleIncomeData({
      investmentDate: '2016-04-22',
      currentDate: '2017-07-17',
      cdbRate: 105.5
    });
    expect(checkInvestmentDate).toBe(true);
    expect(checkCurrentDate).toBe(true);
  });

  it('Should be able to return the checkInvestmentDate == false when investmentDate is set incorrectly', () => {
    const {
      checkInvestmentDate
    } = handleIncomeData({
      investmentDate: '2016-04-aa',
      currentDate: '2017-07-17',
      cdbRate: 105.5
    });
    expect(checkInvestmentDate).toBe(false);
  });

  it('Should be able to return the checkCurrentDate == false when investmentDate is set incorrectly', () => {
    const {
      checkCurrentDate
    } = handleIncomeData({
      investmentDate: '2016-04-22',
      currentDate: '2017-07-bb',
      cdbRate: 105.5
    });
    expect(checkCurrentDate).toBe(false);
  });
})