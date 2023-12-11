export const dataTableConfig = {
  language: {
    zeroRecords: 'Ningún dato ha sido encontrado',
    infoEmpty: 'No se encontró ningún registro',
    search: 'Buscar',
    loadingRecords: 'Cargando registros'
  },
  dom: 'B<"clear">lfrtip',
  responsive: true,
  stateSave: false,
  scrollY: 300,
  scrollCollapse: true,
  bPaginate: false,
  bInfo: false,
  buttons: {
    buttons: [
      {
        extend: 'excel',
        text: '<i class="fa-solid fa-table" style="color: #ffffff;"></i>',
        className: 'btn btn-success mx-1 rounded',
        attr: {
          title: 'Descargar datos a Excel',
          id: 'Excel'
        }
      },
      {
        extend: 'pdf',
        text: '<i class="fa-solid fa-file-pdf" style="color: #ffffff;"></i>',
        className: 'btn btn-danger mx-1 rounded',
        attr: {
          title: 'Descargar datos a PDF',
          id: 'PDF'
        }
      },
      {
        extend: 'print',
        text: '<i class="fa-solid fa-print" style="color: #ffffff;"></i>',
        className: 'btn mx-1 rounded',
        attr: {
          title: 'Imprimir datos',
          id: 'Imprimir'
        }
      }
    ]
  }
}
