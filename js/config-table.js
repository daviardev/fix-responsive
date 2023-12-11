export const dataTableConfig = {
  language: {
    zeroRecords: 'Ningún dato ha sido encontrado',
    infoEmpty: 'No se encontró ningún registro',
    info: 'Mostrando de _START_ a _END_ de un total de _TOTAL_ registros',
    search: '<i style="margin: 6px;" class="fa-solid fa-magnifying-glass"></i>',
    loadingRecords: 'Cargando registros'
  },
  dom: 'B<"clear">lfrtip',
  responsive: true,
  stateSave: false,
  scrollY: 280,
  scrollCollapse: true,
  bPaginate: false,
  bInfo: true,
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
