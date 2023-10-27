//localstorage fungirá como servidor provicional
const almacenamientoLogin = localStorage
const almacenamientoPorSesion = sessionStorage
/*
document.onmousemove = function(event){
  var x = event.offsetX;
  var y = event.offsetY;    
  document.body.style.backgroundPositionX = -x + "px";
  document.body.style.backgroundPositionY = -y + "px";        
}*/


const alCargarPagina = () => {
  const pulsado = JSON.parse(almacenamientoLogin.getItem('inicio-registro')) //corresponde al almacenamiento del bonanza.js que tiene por clave 'inicio-registro'
  if ( pulsado != null && pulsado['clickIniciaSesion'] == true) {
    window.onload = function(){
      ventanaLogin.style.width = '100%'
      ventanaRegistro.style.width = '0%'
    }
    pulsado['clickIniciaSesion'] = false
    almacenamientoLogin.setItem('inicio-registro', JSON.stringify(pulsado))
  } else if ( pulsado!= null && pulsado['clickRegistrarse'] == true ) {
    window.onload = function(){
      ventanaRegistro.style.width = '100%'
      ventanaLogin.style.width = '0%'
    }
    pulsado['clickRegistrarse'] = false
    almacenamientoLogin.setItem('inicio-registro', JSON.stringify(pulsado))
  } else if (pulsado == null) {
    window.onload = function(){
      ventanaLogin.style.width = '100%'
      ventanaRegistro.style.width = '0%'
    }
  } else { 
    window.onload = function(){
      ventanaLogin.style.width = '100%'
      ventanaRegistro.style.width = '0%'
    }
  }
}
alCargarPagina()

const encriptar = (contraseña)=> {
  let aux = ''
  for ( let i = 0; i<contraseña.length; i++ ) {
    aux = aux.concat(contraseña.charCodeAt(i))
  }
  aux = parseInt(aux)
  return aux
}
const binario = (num)=> {
  let base = []
  let n = 0;
  let resu = 2**n
  let arreglo = []
  while ( resu < num ) {
    resu = 2**n
    base.push(resu)
    n++
  }
  let i = base.length
  let convertido = ''
  for ( i; i > 0; i-- ) {
    if ( num >= base[i-1] ) {
      arreglo.push(1)
      num = num - base[i-1]
      //console.log(num)
    } else {
      arreglo.push(0)
      base.pop()
    }
  }
  for ( let j = 1; j <arreglo.length;j++) {
    convertido = convertido.concat(arreglo[j])
  }
  return convertido
}

// pestañas inicio sesion y registro
const ventanaLogin = document.getElementById('inicio_de_sesion')
const ventanaRegistro = document.getElementById('registro_usuario')
const formulario = document.getElementById('formulario')

const divBotones = document.createElement('div')
divBotones.setAttribute('id','botones')
divBotones.setAttribute('class','contenedor_auto')

const botonSesion = document.getElementById('boton_sesion')
botonSesion.textContent = 'Iniciar sesión'
botonSesion.addEventListener('click',()=> {
  if ( ventanaLogin.style.width == '100%' ) {
    ventanaLogin.style.width = '0%'
    ventanaRegistro.style.width = '100%'
  } else if ( ventanaLogin.style.width == '0%' ) {
    ventanaRegistro.style.width = '0%'
    ventanaLogin.style.width = '100%'
  }
})

const botonRegistro = document.getElementById('boton_registro')
botonRegistro.textContent = 'Registro'
botonRegistro.addEventListener('click',()=>{
  if ( ventanaRegistro.style.width == '0%' ) {
    ventanaRegistro.style.width = '100%'
    ventanaLogin.style.width = '0%'
  } else if (ventanaRegistro.style.width == '100%') {
    ventanaLogin.style.width = '100%'
    ventanaRegistro.style.width = '0%'
  }
})

//console.log(registroUsuarios['usuario']['id'])
const botonRegistrar = document.getElementById('boton_de_registro')
botonRegistrar.addEventListener('click',()=>{
  let nombre = document.getElementById('nombre_usuario').value
  let mail = document.getElementById('usuario_email').value
  let contraseña = document.getElementById('usuario_contraseña').value

  /* encripta contraseña */

  let bina = encriptar(contraseña)
  let encriptado = binario(bina)
  /*  */

  if ( almacenamientoLogin.getItem('registroUsuarios') ) {
    let usuarios = JSON.parse(almacenamientoLogin.getItem('registroUsuarios'))
    let usuario = {//quitar let en caso de error y agregar 'let usuario' por fuera del if
      id: usuarios.length,
      'nombreUsuario': `${nombre}`,
      'emailUsuario': `${mail}`,
      'contraseñaUsuario': `${encriptado}`,
      'iniciaSesion': {
        'hizoLogin': true,
        'checked': true,
        'unaOcasion': false,
        'bolsa': {
          'articulos':[]
        },
        'contExtra': 'aquiUnaFuncion()'
      }
    }
    usuarios.push(usuario)
    let iD = []
    iD.push(usuario.id)
    almacenamientoLogin.setItem('registroUsuarios',JSON.stringify(usuarios))
    almacenamientoLogin.setItem('inicioSesion',JSON.stringify(iD))
  } else {
    let usuarios = []
    let usuario = {
      id: usuarios.length,
      'nombreUsuario': `${nombre}`,
      'emailUsuario': `${mail}`,
      'contraseñaUsuario': `${encriptado}`,
      'iniciaSesion': {
        'hizoLogin': true,
        'checked': true,
        'unaOcasion': false,
        'bolsa': {
          'articulos': []
        },
        'contExtra': 'aquiUnaFuncion()'
      }
    }
    let iD = [] 
    iD.push(usuario.id)
    usuarios.push(usuario)
    almacenamientoLogin.setItem('registroUsuarios',JSON.stringify(usuarios))
    almacenamientoLogin.setItem('inicioSesion',JSON.stringify(iD))
  }
  window.location.href = 'bonanza.html'
})

const registroUsuarios = JSON.parse(almacenamientoLogin.getItem('registroUsuarios'))
const iD_Usuario = JSON.parse(almacenamiento.getItem('inicioSesion'))

const botonIniciarSesion = document.getElementById('botonIniciaSesion')
botonIniciarSesion.addEventListener('click',()=>{
  const nombreUsuario = document.getElementById('nombreUsuario').value
  const contraseñaUsuario = document.getElementById('contraseñaUsuario').value

  let aBinario = encriptar(contraseñaUsuario)
  let aEncriptar = binario(aBinario)

  if ( nombreUsuario == registroUsuarios[iD_Usuario]['nombreUsuario'] && aEncriptar == registroUsuarios[iD_Usuario]['contraseñaUsuario'] ) {
    registroUsuarios[iD_Usuario]['iniciaSesion']['hizoLogin'] = true
    if ( document.getElementById('mantenerSesion').checked == true) {
      registroUsuarios[iD_Usuario]['iniciaSesion']['checked'] = true
    } else {
      registroUsuarios[iD_Usuario]['iniciaSesion']['unaOcasion'] = true
    }
    almacenamientoLogin.setItem('registroUsuarios',JSON.stringify(registroUsuarios))
  } 
  // hacer else if para determinar si existe el usuario y si existe, si la contraseña es correcta o no, hacerlo con ciclo for para que revise toda la información en busca del usuario

})

// este es el icono para añadir un articulo a la bolsa, solo aparecerá dentro del artículo de muestra     'bi bi-bag-plus'

// al hacer click en el item de añadir a la bolsa, la bolsa original cambiará brevemente a este icono
// solo aparecerá cuando se encuentre en la pagina principal o en la página de los artículos              'bi bi-bag-heart'

// al hacer click en el item de añadir, este cambiará a una bolsa con palomita
// aparecerá en la página principal y también en la página donde se mostrarán los artículos               'bi bi-bag-check'

// este es el icono que eliminará el artículo del carrito
// aparecerá en todos lados                                                                               'bi bi-bag-dash'