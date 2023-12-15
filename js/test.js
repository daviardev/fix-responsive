// -----------------------------
const ced = 17953454 // 📄 número de documentos
const pwd = '1826' // 🔐 contraseña del usuario
const tkn = 'esta es una prueba' // 🪙 token de sesión
// -----------------------------

// 👇 función que muestra el estado del usuario, total de ahorros y deudas
const Estado = async (ced, tkn) => {
  try {
    await axios.get('http://186.116.15.57:82/core/fontrade/VerEstado', {
      data: {
        ced,
        tkn
      }
    })
      .then(res => {
        const ahorros = res.data.data.ahorros
        const deudas = res.data.data.deudas

        console.log(`Mis ahorros: ${ahorros}`)
        console.log(`Mis deudas: ${deudas}`)
      })
  } catch (error) {
    console.error('Error al hacer la petición:', error)
  }
}

// 👇 función que se encarga de iniciar sesión del usuario
const Login = async (usr, pwd = '', tkn = '') => {
  await axios.get('http://186.116.15.57:82/core/fontrade/Login', {
    data: {
      usr,
      pwd,
      tkn
    }
  })
    .then(res => {
      const names = res.data.data.nombre
      const cedula = res.data.data.cedula

      console.log(`
      Nombres ${names}
      # documento ${cedula}
    `)
    })
}

// 👇 función que se encarga de mostrar la tabla de detalles de los ahorros y las deudas
const Detalle = async (ced, tkn) => {
  try {
    await axios.get('http://186.116.15.57:82/core/fontrade/VerDetalle', {
      data: {
        ced,
        tkn
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // Iterar sobre cada objeto dentro de las tablas, de manera que se podrá mostrar
        const ahorros = res.data.data.ahorros
        const deudas = res.data.data.deudas
        console.log(`
                  Mis ahorros
        -------------------------------`)
        ahorros.forEach((e, index) => {
          console.log(`
            # ${index + 1}
            Periodo ${e.periodo}
            Descripción ${e.descripcion}
            Valor ${e.valor}
            Afectación ${e.afectaci}`)
        })
        console.log(`
                  Mis deudas
        -------------------------------`)
        deudas.forEach((e, index) => {
          console.log(`
            # ${index + 1}
            Periodo ${e.periodo}
            Descripción ${e.descripcion}
            Valor ${e.valor}
            Afectación ${e.afectaci}`)
        })
      })
  } catch (err) {
    console.error(err)
  }
}

Login(ced, pwd, tkn)
Detalle(ced, tkn)
Estado(ced, tkn)
