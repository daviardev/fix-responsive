export class NumberFormatter {
  constructor (simbol = '', separador = '.', sepDecimal = ',') {
    this.simbol = simbol
    this.separador = separador
    this.sepDecimal = sepDecimal
  }

  formatear (num) {
    num += ''
    const [splitLeft, splitRight] = num.split('.')
    const formattedLeft = splitLeft.replace(/(\d)(?=(\d{3})+$)/g, '$1' + this.separador)
    const formattedRight = splitRight ? this.sepDecimal + splitRight : ''

    return this.simbol + formattedLeft + formattedRight
  }
}
