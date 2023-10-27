const almacenamientoBolsa = localStorage
/*
const caja = document.getElementById('caja')
caja.addEventListener('pointermove',(posicion)=>{
  let x = parseInt(posicion.clientX / window.innerWidth * 100)
  let y = parseInt(posicion.clientY / window.innerHeight * 100)
  caja.style.setProperty('--mouse-x', x + '%')
  caja.style.setProperty('--mouse-y', y + '%')
})
*/
const registroDeUsuarios = JSON.parse(almacenamientoBolsa.getItem('registroUsuarios'))
const iDDeUsuario = JSON.parse(almacenamientoBolsa.getItem('inicioSesion'))

const muestraContenido = document.getElementById('contenido_de_bolsa')

const articulosAñadidos = registroDeUsuarios[iDDeUsuario]['iniciaSesion']['bolsa']['articulos']
const recuperaInfoBolsa = () => {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      console.log(articulosAñadidos)

      for (let i=0; i<data.length; i++) {
        for ( let j=0; j<articulosAñadidos.length; j++) {
          if ( data[i]['id'] == articulosAñadidos[j] ) {
            const divContenido = document.createElement('div')
            divContenido.setAttribute('class','contenidoBolsa contenedor_auto')
            const divContTexto = document.createElement('div')
            divContTexto.setAttribute('class','textoBolsa contenedor_columna')
            
            //información de los artículos
            const hTitulo = document.createElement('h2')
            hTitulo.textContent = `${data[i]['title']}`
            const hPrecio = document.createElement('h3')
            hPrecio.textContent = `$${data[i]['price']}`
            //const pDescripcion = document.createElement('p')
            //pDescripcion.textContent = `${data[i]['description']}`
            const hCategoria = document.createElement('h4')
            hCategoria.textContent = `${data[i]['category']}`
            const imagenArticulo = document.createElement('img')
            imagenArticulo.setAttribute('src',`${data[i]['image']}`)
            const valor = document.createElement('span')
            valor.textContent = `${data[i]['rating']['rate']}`
            const iStar = document.createElement('i')
            iStar.setAttribute('class','bi bi-star-half')
            const miniDiv = document.createElement('div')
            miniDiv.setAttribute('class','icono_estrella')
            miniDiv.append(iStar)
            miniDiv.append(valor)
            //const existencia = document.createElement('p')
            //existencia.textContent = `${data[i]['rating']['count']}`

            divContenido.append(imagenArticulo)
            divContTexto.append(hTitulo)
            divContTexto.append(hCategoria)
            //divContTexto.append(pDescripcion)
            divContTexto.append(hPrecio)
            divContTexto.append(miniDiv)
            divContenido.append(divContTexto)
            muestraContenido.append(divContenido)
          } else {
            continue
          }
        }
      }
    })
    .catch(error => console.log(error))
}

const usuarioEnLogin = () => {
  if ( registroDeUsuarios[iDDeUsuario]['iniciaSesion']['hizoLogin'] == true ) {
    recuperaInfoBolsa()
  } else {
    const noSesion = document.createElement('p')
    noSesion.setAttribute('class','noSesionP')
    noSesion.textContent = 'No iniciaste sesión.'
    const noBananaToday = document.createElement('img')
    noBananaToday.setAttribute('class','nobanana')
    noBananaToday.setAttribute('src','noBananaToday.jpg')
    muestraContenido.appendChild(noSesion)
    muestraContenido.appendChild(noBananaToday)
  }
}
usuarioEnLogin()