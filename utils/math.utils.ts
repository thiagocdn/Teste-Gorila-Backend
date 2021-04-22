export function round(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(number*factor) / factor
}

export function roundFloor(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.floor(number*factor) / factor
}

export function calculateTCDIk(CDIk: number) {
  return round(Math.pow((CDIk/100)+1,(1/252))-1, 8)
}

export function calculateTCDIacc(accumalted: number, TCDIk: number, cdbRate: number) {
  return round(accumalted*(1+TCDIk*cdbRate/100),16)
}

