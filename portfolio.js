window.onload=function(){
  let contenedor=document.getElementById('contenedor_carga')
  contenedor.style.visibility='hidden'
  contenedor.style.opacity='0'
  const botonH = document.getElementById('boton-home')
  botonH.style.visibility = 'hidden'
  botonH.style.opacity = '0'
}
let letra=0
const letraPorLetra=()=>{
  const nombreHUno = document.querySelector('.letra-por-letra')
  let presentacion = 'Hola, mi nombre es Fernando.'
  if(letra<presentacion.length){
    nombreHUno.innerHTML += presentacion.charAt(letra)
    letra++
    setTimeout(letraPorLetra,80)
  }
}
letraPorLetra()
/* TOOLTIP FUNCTION */
function muestraTooltip(e) {
  let tools = document.querySelectorAll('.tools')
  tools.forEach(tooltip => {
    tooltip.style.left = e.clientX + 15 + 'px'
    tooltip.style.top = e.clientY + 25 + 'px'
  })
}
const saberMasSobreMi=()=>{
  const botonSaber = document.getElementById('boton-saber')
  botonSaber.addEventListener('click', () => {
    //div contenedor para esconderlo
    const divContenedor = document.getElementById('contenedor')
    divContenedor.setAttribute('hidden','hidden')
    //crea nuevo div
    const divNuevoContenedor=document.createElement('DIV')
    divNuevoContenedor.setAttribute('class','nuevo-contenedor')
    divNuevoContenedor.setAttribute('id','nuevo-contenedor')
    //Elementos H2 y P que estarán al lado izquierdo del nuevo contenedor + append de los elementos en el divNuevoContenedor
    const saberHDos=document.createElement('H2')
    saberHDos.setAttribute('id','hSaber')
    saberHDos.innerHTML = 'Conoce más sobre mí'
    divNuevoContenedor.appendChild(saberHDos)
    const saberP = document.createElement('P')
    saberP.setAttribute('id','pSaber')
    saberP.innerHTML = 'Soy una persona tranquila con gustos sencillos pero apasionado sobre ellos aunque me disgustan los excesos. A continuación, 4 de mis cosas favoritas.'
    divNuevoContenedor.appendChild(saberP)
    //contenedor de cartas
    const contieneCartas = document.createElement('div')
    contieneCartas.setAttribute('id','contieneCartas')
    //div para cada carta
    const contenedorCartaUno=document.createElement('div')
    const contenedorCartaDos=document.createElement('div')
    const contenedorCartaTres=document.createElement('div')
    const contenedorCartaCuatro=document.createElement('div')
    contenedorCartaUno.setAttribute('class','card')
    contenedorCartaUno.setAttribute('id','carta-imagen-uno')
    contenedorCartaDos.setAttribute('class','card')
    contenedorCartaDos.setAttribute('id','carta-imagen-dos')
    contenedorCartaTres.setAttribute('class','card')
    contenedorCartaTres.setAttribute('id','carta-imagen-tres') 
    contenedorCartaCuatro.setAttribute('class','card')
    contenedorCartaCuatro.setAttribute('id','carta-imagen-cuatro')
    //Elementos img
    const imagenUno=document.createElement('img')
    const imagenDos=document.createElement('img')
    const imagenTres=document.createElement('img')
    const imagenCuatro=document.createElement('img')
    imagenUno.setAttribute('src','imagenes/chrono-trigger.png')
    imagenUno.setAttribute('id','imagen1')
    imagenUno.setAttribute('class','imagenMuestra')
    imagenDos.setAttribute('src','imagenes/silencio-de-los-inocentes.png')
    imagenDos.setAttribute('id','imagen2')
    imagenDos.setAttribute('class','imagenMuestra')
    imagenTres.setAttribute('src','imagenes/siddhartha.png')
    imagenTres.setAttribute('id','imagen3')
    imagenTres.setAttribute('class','imagenMuestra')
    imagenCuatro.setAttribute('src','imagenes/flan.png')
    imagenCuatro.setAttribute('id','imagen4')
    imagenCuatro.setAttribute('class','imagenMuestra')
    // TOOLTIP
    const tool1 = document.createElement('div')
    const tool2 = document.createElement('div')
    const tool3 = document.createElement('div')
    const tool4 = document.createElement('div')
    tool1.setAttribute('class','tools')
    tool2.setAttribute('class','tools')
    tool3.setAttribute('class','tools')
    tool4.setAttribute('class','tools')
    tool1.setAttribute('id','tooltip1')
    tool2.setAttribute('id','tooltip2')
    tool3.setAttribute('id','tooltip3')
    tool4.setAttribute('id','tooltip4')
    tool1.appendChild(imagenUno)
    tool2.appendChild(imagenDos)
    tool3.appendChild(imagenTres)
    tool4.appendChild(imagenCuatro)
    contenedorCartaUno.appendChild(tool1)
    contenedorCartaDos.appendChild(tool2)
    contenedorCartaTres.appendChild(tool3)
    contenedorCartaCuatro.appendChild(tool4)
    contenedorCartaUno.addEventListener('mousemove',muestraTooltip)
    contenedorCartaDos.addEventListener('mousemove',muestraTooltip)
    contenedorCartaTres.addEventListener('mousemove',muestraTooltip)
    contenedorCartaCuatro.addEventListener('mousemove',muestraTooltip)
    //divs img-contenedores
    const textoDivUno=document.createElement('div')
    const textoDivDos=document.createElement('div')
    const textoDivTres=document.createElement('div')
    const textoDivCuatro=document.createElement('div')
    textoDivDos.setAttribute('class','texto-contenedor')
    textoDivUno.setAttribute('class','texto-contenedor')
    textoDivTres.setAttribute('class','texto-contenedor')
    textoDivCuatro.setAttribute('class','texto-contenedor')
    //Elementos H4 + appends al texto-contenedor 
    const hElementoUno=document.createElement('h4')
    hElementoUno.setAttribute('id','hCuatroCartaUno')
    hElementoUno.innerHTML='Chrono Trigger'
    textoDivUno.appendChild(hElementoUno)
    const hElementoDos=document.createElement('h4')
    hElementoDos.setAttribute('id','hCuatroCartaDos')
    hElementoDos.innerHTML='El Silencio de los Inocentes'
    textoDivDos.appendChild(hElementoDos)
    const hElementoTres=document.createElement('h4')
    hElementoTres.setAttribute('id','hCuatroCartaTres')
    hElementoTres.innerHTML='Siddhartha'
    textoDivTres.appendChild(hElementoTres)
    const hElementoCuatro=document.createElement('h4')
    hElementoCuatro.setAttribute('id','hCuatroCartaCuatro')
    hElementoCuatro.innerHTML='Flan'
    textoDivCuatro.appendChild(hElementoCuatro)
    // Elementos P
    const pTextoImgUno=document.createElement('p')
    pTextoImgUno.setAttribute('id','pCartaUno')
    pTextoImgUno.innerHTML='En lo personal, el mejor videojuego de la historia.'
    textoDivUno.appendChild(pTextoImgUno)
    const pTextoImgDos = document.createElement('p')
    pTextoImgDos.setAttribute('id','pCartaDos')
    pTextoImgDos.innerHTML='Suspenso constante y adictivo, casi palpable.'
    textoDivDos.appendChild(pTextoImgDos)
    const pTextoImgTres=document.createElement('p')
    pTextoImgTres.setAttribute('id','pCartaTres')
    pTextoImgTres.innerHTML='Todo ser vivo posee una joya mágica pero no son todos conscientes de ello.'
    textoDivTres.appendChild(pTextoImgTres)
    const pTextoImgCuatro=document.createElement('p')
    pTextoImgCuatro.setAttribute('id','pCartaCuatro')
    pTextoImgCuatro.innerHTML='Delicia de postre, mi favorito por sobre todos.'
    textoDivCuatro.appendChild(pTextoImgCuatro)
    //Append de los elementos H4 y P en su respectiva carta 
    contenedorCartaUno.appendChild(textoDivUno)
    contenedorCartaDos.appendChild(textoDivDos)
    contenedorCartaTres.appendChild(textoDivTres)
    contenedorCartaCuatro.appendChild(textoDivCuatro)
    //Append del div de cada carta al nuevo contenedor
    contieneCartas.appendChild(contenedorCartaUno)
    contieneCartas.appendChild(contenedorCartaDos)
    contieneCartas.appendChild(contenedorCartaTres)
    contieneCartas.appendChild(contenedorCartaCuatro)
    divNuevoContenedor.appendChild(contieneCartas)
    //Div contenedor del botón regresar
    const botonRegresar=document.createElement('button')
    botonRegresar.setAttribute('type','button')
    botonRegresar.setAttribute('id','regresar-saber')
    botonRegresar.setAttribute('class','regresar-saber')
    //span para agregar el icono y texto
    const iconoTexto=document.createElement('span')
    const iconoSpan=document.createElement('i')
    iconoSpan.setAttribute('class','bi bi-arrow-return-left')
    const textoSpan=document.createTextNode(' Cerrar')
    iconoTexto.appendChild(iconoSpan)
    iconoTexto.appendChild(textoSpan)
    //texto del boton regresar
    botonRegresar.appendChild(iconoTexto);
    //div que contiene al boton regresar
    const divBotonRegresar=document.createElement('div')
    divBotonRegresar.setAttribute('class','div-regresar')
    divBotonRegresar.setAttribute('id','div-regresar')
    divBotonRegresar.appendChild(botonRegresar)
    //append div con boton regresar en nuevo-contenedor
    divNuevoContenedor.appendChild(divBotonRegresar)
    botonRegresar.addEventListener('click', ()=> {
      let hidden = divContenedor.getAttribute('hidden')
      if(hidden){
        divNuevoContenedor.remove()
        divContenedor.removeAttribute('hidden')
      }
    });
    const seccionSobreMi=document.getElementById('sobre-mi')
    seccionSobreMi.appendChild(divNuevoContenedor)
  });
}
saberMasSobreMi()
const clickImgPrincipal = () => {
  const imgDesarrollador = document.getElementById('hero-banano-desarrollador')
  imgDesarrollador.addEventListener('click', () => {
    const divHeroPrincipal = document.getElementById('hero-principal')
    if ( document.querySelector('.nueva-imagen') ) {
      document.querySelector('.nueva-imagen').remove()
    } else {
      const imgCalamardo = document.createElement('img')
      imgCalamardo.setAttribute('id','calamardo')
      imgCalamardo.setAttribute('class','nueva-imagen')
      imgCalamardo.setAttribute('src','imagenes/calamardini-nobg.png')
      imgCalamardo.setAttribute('alt','Un perro blanco llamado Calamardo')
      divHeroPrincipal.appendChild(imgCalamardo)
    }
  });
}
clickImgPrincipal()
const aparece = () => {
  const aparicion = document.getElementById('aparicion-dos')
  aparicion.innerHTML = 'Haz click en mi foto para una sorpresita.'
  aparicion.animate(
    [{opacity: '0'},{opacity: '1'},{opacity: '0'}],
    {
      duration: 10000,
      iterations: Infinity
    })
  const desaparece = () => {aparicion.style.visibility='hidden'}
  setTimeout(desaparece, 10000)
}
aparece()
const botonHome = () => {
  const botonH = document.getElementById('boton-home')
  const navigator = document.getElementById('navigator')

  window.addEventListener('scroll', () => {
    const posicion = navigator.getBoundingClientRect()
    if ( posicion.top >= 0 && posicion.bottom <= window.innerHeight ) {
      botonH.style.visibility = 'hidden'
      botonH.style.opacity = '0'
    } 
    else {
      botonH.style.visibility = 'visible'
      botonH.style.opacity = '1'
    }
  })
}
botonHome()
const proyectos = [
  imgUno = {
    id: 1,
    nombre: 'Agenda',
    urlImg: 'imagenes/primer-proyecto.png',
    altImg: 'Agenda.',
    descripcion: 'Este es el primer proyecto que cree con el poco conocimiento que tenía sobre el DOM, utiliza el localStorage para almacenar información de los contactos.'
  },
  imgDos = {
    id: 2,
    nombre: 'Lista de tareas',
    urlImg: 'imagenes/segundo-proyecto.png',
    altImg: 'Lista de tareas.',
    descripcion: 'Mi segundo proyecto, una "lista de tareas por hacer" o "ToDo List" que utiliza localStorage para el almacenamiento; puede crear, modificar o eliminar las tareas deseadas.'
  },
  imgTres = {
    id: 3,
    nombre: 'Bonanza',
    urlImg: 'imagenes/tercer-proyecto.png',
    altImg: 'Página web de venta de artículos.',
    descripcion: 'Página web de venta de artículos (toda la información de estos artículos proviene de fakestoreapi.com) contiene bolsa (carrito de compras), log-in y registro. Toda la información de usuario se registra en localStorage o sessionStorage, dependiendo del log-in que desee el usuario, el registro hace un log-in que se mantiene a pesar del cierre de la página (aun sigo mejorándola).'
  }
]
const carruselPropio = () => {
  const carrusel = document.getElementById('carrusel')
  for ( let o = 0; o<proyectos.length; o++) {
    const objeto = document.createElement('div')
    if ( o == 0 ) {
      objeto.setAttribute('class', 'objeto contenedor_columna activo')
    } else {
      objeto.setAttribute('class', 'objeto contenedor_columna')
    }

    const imagen = document.createElement('img')
    imagen.setAttribute('src',`${proyectos[o]['urlImg']}`)
    imagen.setAttribute('class','imagenCarrusel')
    imagen.setAttribute('alt',`${proyectos[o]['altImg']}`)

    const nombre = document.createElement('h2')
    nombre.setAttribute('class','titulo_producto')
    nombre.innerText = `${proyectos[o]['nombre']}`

    const descripcion = document.createElement('p')
    descripcion.setAttribute('class','descripcionProyecto')
    descripcion.innerText = `${proyectos[o]['descripcion']}`

    const divTxtContenido = document.createElement('div')
    divTxtContenido.setAttribute('class','contenedor_texto contenedor_columna')

    objeto.append(imagen)

    divTxtContenido.append(nombre)
    divTxtContenido.append(descripcion)

    objeto.append(divTxtContenido)

    let activo = objeto.className.match('activo') ? true : false
    if ( activo ) {
      carrusel.append(objeto)
    } else {
      objeto.setAttribute('hidden','true')
      carrusel.append(objeto)
    }
  }

  const botones = document.getElementById('botones')
  let indice = 0
  const elementos = carrusel.children
  const previo = document.createElement('button')
  previo.setAttribute('id','previo')
  previo.innerText = 'Previo'
  const siguiente = document.createElement('button')
  siguiente.setAttribute('id','siguiente')
  siguiente.innerText = 'Siguiente'
  botones.append(previo)
  botones.append(siguiente)

  previo.addEventListener('click',()=>{
    elementos[indice].classList.remove('activo')
    elementos[indice].setAttribute('hidden','true')
    if ( indice == 0 ) {
      indice = 3
    }
    indice--
    elementos[indice].classList.add('activo')
    elementos[indice].removeAttribute('hidden')
    return indice
  })
  siguiente.addEventListener('click',()=>{
    elementos[indice].classList.remove('activo')
    elementos[indice].setAttribute('hidden','true')
    indice++
    if ( indice == 3 ){
      indice = 0
    }
    elementos[indice].classList.add('activo')
    elementos[indice].removeAttribute('hidden')
    return indice
  })
  setInterval(function(){siguiente.click()},5000)
}
carruselPropio()