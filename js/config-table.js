export const dataTableConfig = {
  language: {
    zeroRecords: 'Ningún dato ha sido encontrado',
    infoEmpty: 'No se encontró ningún registro',
    searchPlaceholder: 'Filtrar datos',
    search: '<i style="margin: 6px;" class="fa-solid fa-magnifying-glass"></i>',
    loadingRecords: 'Cargando registros'
  },
  dom: 'B<"clear">lfrtip',
  responsive: true,
  stateSave: false,
  info: false,
  scrollY: 280,
  scrollCollapse: true,
  bPaginate: false,
  bInfo: true,
  buttons: {
    buttons: [
      {
        extend: 'excel',
        text: '<i class="fa-solid fa-table text-success"></i>',
        className: 'btn mx-1 rounded green-color border border-0',
        attr: {
          title: 'Descargar datos a Excel',
          id: 'Excel'
        }
      },
      {
        extend: 'pdf',
        text: '<i class="fa-solid fa-file-pdf text-danger"></i>',
        className: 'btn mx-1 rounded bg-danger-subtle border border-0',
        attr: {
          title: 'Descargar datos a PDF',
          id: 'PDF'
        }
      },
      {
        extend: 'print',
        text: '<i class="fa-solid fa-print text-secondary"></i>',
        className: 'btn mx-1 rounded bg-body-secondary border border-0',
        attr: {
          title: 'Imprimir datos',
          id: 'Imprimir'
        }
      }
    ]
  }
}

export const FormatDate = date => {
  const dateString = date.toString()

  const year = dateString.substring(0, 4)
  const month = dateString.substring(4)

  const formatedDate = `${year}-${month}`

  return formatedDate
}

export class NumberFormatter {
  constructor (simbol = '', separador = '.', sepDecimal = ',') {
    this.simbol = simbol
    this.separador = separador
    this.sepDecimal = sepDecimal
  }

  formatear (num) {
    num = num.toString().replace(/[,.]/g, '')

    const [splitLeft, splitRight] = num.split('.')
    const formattedLeft = splitLeft.replace(/(\d)(?=(\d{3})+$)/g, '$1' + this.separador)
    const formattedRight = splitRight ? this.sepDecimal + splitRight : ''

    return this.simbol + formattedLeft + formattedRight
  }
}
