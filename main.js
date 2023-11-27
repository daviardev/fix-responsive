import axios from 'axios' // 👈 hacer las consultas que contengan un body

import { dataTableConfig } from './js/config-table' // 👈 configuración del datatable

let dataTableIsInitialized = false // 👈 check table is initialized
let dtAhorros
let dtDeudas

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

// 👇 función que se encarga de listar la información que está dentro de la tabla de ahorros y deudas
const ListUsers = async () => {
  try {
    // 👇 dentro de la respuesta se busca la URL de la api para que de esa manera mandar los datos
    const response = await axios.get('http://localhost:3000/VerDetalle', {
      data: userData
    })
    const data = response.data[0].data // ❌ se filtra los primeros datos de la primera posición, Error
    let contentAhorro = ''
    let contentDeuda = ''

    if (data.ahorros && data.ahorros.length > 0) {
      data.ahorros.forEach((ahorro, index) => {
        contentAhorro += `
        <tr>
          <td>${index + 1}</td>
          <td>${ahorro.periodo}</td>
          <td>${ahorro.descripcion}</td>
          <td>${ahorro.valor}</td>
          <td>${ahorro.afectaci}</td>
          </tr>
          `
      })
    }

    if (data.deudas && data.deudas.length > 0) {
      data.deudas.forEach((deuda, index) => {
        contentDeuda += `
        <tr>
          <td>${index + 1}</td>
          <td>${deuda.periodo}</td>
          <td>${deuda.descripcion}</td>
          <td>${deuda.valor}</td>
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

    cardAhorros.forEach(e => {
      e.innerHTML = `
        $${data.ahorros}
      `
    })
    cardDeudas.forEach(e => {
      e.innerHTML = `
      $${data.deudas}
    `
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

window.addEventListener('load', async () => {
  await InitDataTable()
})
