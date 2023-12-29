import { FormatDate, NumberFormatter, dataTableConfig } from './js/config-table'

let dataTableIsInitialized = false // 👈 revisa que la tabla esté inicializada, si no lo está, no dibuja nada

// ------------
let dtAhorros
let dtDeudas
// 👆 variable que ayuda a initializar o destruir la tabla en caso que la tabla no se haya inicializado
// ------------

// 👇 iniciar datatable, si no es iniciada, se destruyen las tablas de ahorros y deudas
const InitDataTable = async () => {
  if (dataTableIsInitialized) {
    dtAhorros.destroy()
    dtDeudas.destroy()
  }

  await ListUsers() // 👈 llamar las tablas

  // -------------------------------------------------------------
  dtAhorros = $('#tablaAhorros').DataTable(dataTableConfig) // 👈 selector de la tabla ahorros y pasando las opciones del datatable
  dtDeudas = $('#tablaDeudas').DataTable(dataTableConfig) // 👈 selector de la tabla deudas y pasando las opciones del datatable
  // -------------------------------------------------------------

  // 👇 resolviendo bug, tablas no se hacían completamente responsive
  $('button[data-bs-toggle="tab"]').on('shown.bs.tab', () => {
    $.fn.dataTable.tables({
      visible: true,
      api: true
    })
      .responsive.recalc()
      .columns.adjust()
  })

  dataTableIsInitialized = true // 👈 cuando el datatable inicia, su estado cambia a verdadero
}

// --------------------------------------------------------
const bodyTable = document.getElementById('tbody-ahorros') // 👈 selecciona el id del cuerpo de la tabla de ahorros
const bodyDeudas = document.getElementById('tbody-deudas') // 👈 selecciona el id del cuerpo de la tabla de deudas
// --------------------------------------------------------

// --------------------------------------------------------
const names = document.querySelectorAll('#names') // 👈 selecciona el id de la información del nombre
const cedNumber = document.querySelectorAll('#ced') // 👈 selecciona el id de la información del número de cédula
// --------------------------------------------------------

// --------------------------------------------------------
const cardAhorros = document.querySelectorAll('#cardAhorros') // 👈 selecciona el id del cuerpo de la tarjeta de ahorros
const cardDeudas = document.querySelectorAll('#cardDeudas') // 👈 selecciona el id del cuerpo de la tarjeta de deudas
// --------------------------------------------------------

// ------------------------
const userData = { // ❌ datos de prueba, no funcionan en una API local creada por mi
  ced: 9999,
  tkn: 'esta es una prueba'
}
// ------------------------

const PlaceholderLoading = () => {
  const loading = document.querySelectorAll('.placeholder')

  const spinner = document.querySelectorAll('.spinner-border')

  loading.forEach(load => {
    load.classList.remove('placeholder')
  })

  spinner.forEach(load => {
    load.classList.remove('spinner-border')
    load.classList.add('d-none')
  })
}

// 👇 función que se encarga de listar la información que está dentro de la tabla de ahorros y deudas
const ListUsers = async () => {
  try {
    // 👇 dentro de la respuesta se busca la URL de la api para que de esa manera mandar los datos
    const response = await axios.get('http://localhost:3000/VerDetalle', {
      data: userData
    })
    const data = response.data[0].data // ❌ se filtra los primeros datos de la primera posición, Error

    // Crear una instancia de la clase NumberFormatter
    const FormatNumber = new NumberFormatter('$', '.', ',')

    let contentAhorro = ''
    let contentDeuda = ''

    if (data.ahorros && data.ahorros.length > 0) {
      data.ahorros.forEach((ahorro, index) => {
        // Utilizar la instancia para formatear el número
        const valorFormateado = FormatNumber.formatear(ahorro.valor)
        const dateFormatter = FormatDate(ahorro.periodo)

        if (ahorro.afectaci === 'C') {
          ahorro.afectaci = 'Crédito'
        } else if (ahorro.afectaci === 'D') {
          ahorro.afectaci = 'Débito'
        }

        contentAhorro += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${dateFormatter}</td>
          <td>${ahorro.descripcion}</td>
          <td>${valorFormateado}</td>
          <td>${ahorro.afectaci}</td>
        </tr>
        `
      })
    }

    if (data.deudas && data.deudas.length > 0) {
      data.deudas.forEach((deuda, index) => {
        const valorFormateado = FormatNumber.formatear(deuda.valor)
        const dateFormatter = FormatDate(deuda.periodo)

        if (deuda.afectaci === 'C') {
          deuda.afectaci = 'Crédito'
        } else if (deuda.afectaci === 'D') {
          deuda.afectaci = 'Débito'
        }

        contentDeuda += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${dateFormatter}</td>
          <td>${deuda.descripcion}</td>
          <td>${valorFormateado}</td>
          <td>${deuda.afectaci}</td>
        </tr>
        `
      })
    }

    bodyTable.innerHTML = contentAhorro
    bodyDeudas.innerHTML = contentDeuda
  } catch (err) {
    console.error(err)
  }
}

const RenderDataUser = async () => {
  try {
    const res = await axios.get('http://localhost:3000/VerEstado', {
      data: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.data[0].data

    const numberFormatter = new NumberFormatter('$', '.', ',')

    const formatNumberAhorros = numberFormatter.formatear(data.ahorros)
    const formatNumberDeudas = numberFormatter.formatear(data.deudas)

    cardAhorros.forEach(e => {
      e.innerHTML = formatNumberAhorros
    })

    cardDeudas.forEach(e => {
      e.innerHTML = formatNumberDeudas
    })
  } catch (err) {
    console.error(err)
  }
}

// 👇 usar esta manera no es correcta ni funcional ❌
const RenderPersonalInfo = async () => {
  try {
    const res = await axios.get('http://localhost:3000/Login', {
      data: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.data[0].data

    names.forEach(element => {
      element.innerHTML = `${data.nombre}`
    })

    cedNumber.forEach(element => {
      element.innerHTML = `${data.cedula}`
    })
  } catch (err) {
    console.error(err)
  }
}

RenderDataUser()
RenderPersonalInfo()
PlaceholderLoading()

window.addEventListener('load', async () => {
  await InitDataTable()
})
