
// Funcao de arredondamento padrao com definição de número de casas decimais.
export function round(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(number*factor) / factor
}

// Funcao de truncamento com definição de número de casas decimais.
export function roundFloor(number: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces)
  return Math.floor(number*factor) / factor
}

// Funcao de cálculo da Taxa CDI diária conforme valor anualizado.
export function calculateTCDIk(CDIk: number) {
  return round(Math.pow((CDIk/100)+1,(1/252))-1, 8)
}

// Funcao de do TCDI acumulado
export function calculateTCDIacc(accumulated: number, TCDIk: number, cdbRate: number) {
  return round(accumulated*(1+TCDIk*cdbRate/100),16)
}

