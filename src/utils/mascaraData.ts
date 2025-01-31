export function mascaraDataV(valor: string): string {
  // Remove todos os caracteres não numéricos
  let valorLimpo = valor.replace(/\D/g, '')

  // Limita o número de caracteres para 8 (formato ddmmaaaa)
  if (valorLimpo.length > 8) {
    valorLimpo = valorLimpo.substring(0, 8)
  }

  // Aplica a máscara no formato dd/mm/aaaa
  if (valorLimpo.length <= 2) {
    valorLimpo = valorLimpo.replace(/(\d{2})/, '$1')
  } else if (valorLimpo.length <= 4) {
    valorLimpo = valorLimpo.replace(/(\d{2})(\d{2})/, '$1/$2')
  } else {
    valorLimpo = valorLimpo.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
  }

  return valorLimpo
}
