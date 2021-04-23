
// Função para formatar uma data no padrão yyyy-mm-dd
export function formatDateResponse(date: Date) {
  const day = ("0" + date.getDate()).slice(-2)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

