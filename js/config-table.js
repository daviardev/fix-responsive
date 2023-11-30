export const dataTableConfig = {
  language: {
    lengthMenu: 'Mostrar _MENU_ registros por página',
    zeroRecords: 'Ningún dato ha sido encontrado',
    info: 'Mostrando de _START_ a _END_ de un total de _TOTAL_ registros',
    infoEmpty: 'No se encontró ningún registro',
    infoFiltered: '(filtrados desde _MAX_ registros totales)',
    search: 'Buscar',
    loadingRecords: 'Cargando registros',
    paginate: {
      first: 'Primero',
      last: 'Último',
      next: 'Siguiente',
      previous: 'Anterior'
    }
  },
  dom: 'B<"clear">lfrtip',
  stateSave: true,
  responsive: true,
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
