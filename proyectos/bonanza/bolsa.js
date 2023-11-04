const almacenamientoBolsa = localStorage
const registroDeUsuarios = almacenamientoBolsa.getItem('registroUsuarios') ? JSON.parse(almacenamientoBolsa.getItem('registroUsuarios')) : false;
const iDDeUsuario = almacenamientoBolsa.getItem('inicioSesion') ? JSON.parse(almacenamientoBolsa.getItem('inicioSesion')) : false;
const muestraContenido = document.getElementById('contenido_de_bolsa')
const articulosAñadidos = registroDeUsuarios ? registroDeUsuarios[iDDeUsuario]['iniciaSesion']['bolsa']['articulos'] : false;
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
          const hTitulo = document.createElement('h2')
          hTitulo.textContent = `${data[i]['title']}`
          const hPrecio = document.createElement('h3')
          hPrecio.textContent = `$${data[i]['price']}`
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
  const iniciadaSesion = registroDeUsuarios ? registroDeUsuarios[iDDeUsuario]['iniciaSesion']['hizoLogin'] : false;
  if ( iniciadaSesion ) {
    recuperaInfoBolsa()
  } else {
    const noSesion = document.createElement('p')
    noSesion.setAttribute('class','noSesionP')
    noSesion.textContent = 'No iniciaste sesión.'
    muestraContenido.appendChild(noSesion)
    const noBananaToday = document.createElement('img')
    noBananaToday.setAttribute('class','nobanana')
    noBananaToday.setAttribute('src','./noBananaToday.jpg')
    noBananaToday.setAttribute('alt','No iniciaste sesión')
    muestraContenido.appendChild(noBananaToday)
  }
}
usuarioEnLogin()
