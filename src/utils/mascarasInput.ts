export function mascaraMoedaEPorcentagem(entrada: string) {
  let valorNumerico = entrada.replace(/[^0-9]/g, '')
  valorNumerico = valorNumerico.padStart(4, '0')
  const valorFormatado = valorNumerico.replace(/(\d+)(\d{2})$/, '$1,$2')
  if (valorFormatado.length > 5 && valorFormatado.startsWith('0'))
    return valorFormatado.substring(1)
  return valorFormatado
}

export function mascaraData(entrada: string) {
  let valorNumerico = entrada.replace(/\D/g, '') // Remove tudo que não for número

  // Limita a entrada a 8 caracteres numéricos (ddMMyyyy)
  if (valorNumerico.length > 8) {
    valorNumerico = valorNumerico.substring(0, 8)
  }

  // Aplica as máscaras em sequência
  if (valorNumerico.length > 4) {
    valorNumerico = valorNumerico.replace(/^(\d{2})(\d{2})(\d+)/, '$1/$2/$3') // Formata dd/mm/yyyy
  } else if (valorNumerico.length > 2) {
    valorNumerico = valorNumerico.replace(/^(\d{2})(\d+)/, '$1/$2') // Formata dd/mm
  }

  return valorNumerico
}

export function mascaraNumero(entrada: string) {
  return entrada.replace(/\D/g, '')
}

export const mascaraCep = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{1,3})?$/, '$1-$2')
    .replace(/-$/, '')
}
