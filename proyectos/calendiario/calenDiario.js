function pageLoader() {
  let contenedor=document.getElementById('contenedor_carga')
  contenedor.style.visibility='hidden'
  contenedor.style.opacity='0'
}
setTimeout(pageLoader, 500)
const calendario = document.getElementById('calendario')
const almacenamiento = window.localStorage
let fecha = new Date()
const fechaElegida = document.getElementById('fecha')
const app_calendario = document.getElementById('app_calendario')
const divCarga = document.getElementById('carga')
let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const treintaYUno = ['Enero','Marzo','Mayo',,'Julio','Agosto',,'Octubre','Diciembre']
const treinta = ['Abril','Junio','Septiembre','Noviembre']
const mesEspecial = ['Febrero']
window.onload=function(){
  let dia = String(fecha.getDate()).padStart(2,'0')
  let mes = String(fecha.getMonth()+1).padStart(2,'0')
  let año = String(fecha.getFullYear())
  calendario.value = `${año}-${mes}-${dia}`
  asignaFecha()
  generaRecuadros()
  rastreaDia()
}
const asignaFecha = () => {
  let fecha = new Date(`${calendario.value}T00:00`).toLocaleDateString('default',{dateStyle:'long'})
  let diaSemana = new Date(`${calendario.value}T00:00`).toLocaleDateString('default',{weekday:'long'})
  let fechaInput = calendario.value
  const fragmentoDia = parseInt(fechaInput.slice(8,10))
  const fragmentoMes = parseInt(fechaInput.slice(5,7))
  const fragmentoAño = parseInt(fechaInput.slice(0,4))
  fechaElegida.innerHTML = `${diaSemana} ${fecha}`
  divCarga.innerHTML = `Hoy es ${diaSemana} ${fecha}`
  let diaMesAño = {
    'dia': fragmentoDia,
    'mes': fragmentoMes, 
    'año': fragmentoAño
  }
  return diaMesAño
}
calendario.onchange = function () {
  asignaFecha()
  generaRecuadros()
  rastreaDiaSeleccionado()
}
const generaRecuadros = () => {
  let calendarioValue = document.getElementById('calendario').value
  let mesExtraido = calendarioValue.slice(5,7).padStart(2,'0')
  let anioExtraido = calendarioValue.slice(0,4)
  let diaMesAño = asignaFecha()
  let numDeDias = Number
  const cuantosDias = () => {
    if ( treintaYUno.includes(meses[diaMesAño['mes']-1]) ) {
      numDeDias = 31
      return numDeDias
    } else if ( treinta.includes(meses[diaMesAño['mes']-1]) ) {
      numDeDias = 30
      return numDeDias
    } else if ( mesEspecial.includes(meses[diaMesAño['mes']-1]) ) {
      numDeDias = 28
      return numDeDias
    }
    return numDeDias
  }
  let dias = cuantosDias()
  const divsDias = (dias) => {
    const seccionRecuadrosDias = document.createElement('section')
    seccionRecuadrosDias.setAttribute('class','seccion_calendario contenedor_auto')
    let fechaReal
    let mesDelAnio
    let diaDeLaSemana
    for ( let i = 1; i<dias+1; i++ ){
      const divDia = document.createElement('div')
      if ( i < 10 ) {
        divDia.setAttribute('id',`Dia-0${i}`)
      } else {
        divDia.setAttribute('id',`Dia-${i}`)
      }
      divDia.setAttribute('class','contenedor_dia contenedor_columna')
      const titulo = document.createElement('p')
      titulo.setAttribute('id',`titulo ${i} ${mesDelAnio} ${anioExtraido}`)
      titulo.setAttribute('class','titulo_dia')
      if ( i < 10 ) {
        fechaReal = String(`${anioExtraido}-${mesExtraido}-0${i}`)
      } else {
        fechaReal = String(`${anioExtraido}-${mesExtraido}-${i}`)
      }
      diaDeLaSemana = new Date(`${fechaReal}T00:00`).toLocaleDateString('default',{weekday:'long'})
      mesDelAnio = new Date(`${fechaReal}T00:00`).toLocaleDateString('default',{month:'long'})
      titulo.innerText = `${diaDeLaSemana} ${i} ${mesDelAnio}`
      let info = JSON.parse(almacenamiento.getItem('calendario'))
      let fechaId = titulo.id.slice(7).toLowerCase()
      if ( info ) {
        for ( let k=0; k<info.length; k++ ) {
          let fechaAlmacenada = info[k]['fecha']
          if( fechaId == fechaAlmacenada.toLowerCase() ){
            divDia.style.backgroundColor = '#34b9d4'
          } else {
            continue
          }
        }
      } else {
        let info = []
        almacenamiento.setItem('calendario',JSON.stringify(info))
      }
      divDia.append(titulo)
      const expandir = document.createElement('button')
      expandir.setAttribute('class','expandir')
      const iconoExpandir = document.createElement('i')
      iconoExpandir.setAttribute('class','bi bi-arrows-angle-expand')
      expandir.append(iconoExpandir)
      expandir.addEventListener('click',()=>{
        iconoExpandir.setAttribute('class','bi bi-arrows-angle-contract')
        if (document.getElementById(`${i} ${mesDelAnio} ${anioExtraido}`)){
          divDia.classList.remove('activo')
          divDia.classList.remove('abierto')
          divDia.removeChild(divDia.childNodes[2])
          iconoExpandir.setAttribute('class','bi bi-arrows-angle-expand')
        } else {
          const contenido = document.createElement('div')
          contenido.setAttribute('class','contenido contenedor_columna')
          divDia.classList.add('abierto')
          const textArea = document.createElement('textarea')
          textArea.setAttribute('id',`${i} ${mesDelAnio} ${anioExtraido}`)
          textArea.setAttribute('class','textArea')
          if ( info ) {
            for ( let q=0; q<info.length; q++ ) {
              if ( textArea.id == info[q]['fecha']) {
                textArea.value = info[q]['nota']
              }
            }
          } else {
            textArea.value = ''
          }
          textArea.onclick = function(){
            textArea.style.animation = 'focusExpandir 1s ease-in-out forwards'
          }
          textArea.click()
          const guardaCambios = document.createElement('button')
          guardaCambios.setAttribute('class','guardaCambios contenedor_auto')
          const pGuardar = document.createElement('p')
          pGuardar.innerText = 'Guardar'
          const iconoGuardar = document.createElement('i')
          iconoGuardar.setAttribute('class','bi bi-save')
          guardaCambios.append(pGuardar)
          guardaCambios.append(iconoGuardar)
          guardaCambios.addEventListener('click',()=>{
            if ( almacenamiento.getItem('calendario')) {
              const informacion = document.getElementById(`${i} ${mesDelAnio} ${diaMesAño['año']}`).value
              let info = JSON.parse(almacenamiento.getItem('calendario'))
              nota = {
                'id': info.length,
                'fecha': `${i} ${mesDelAnio} ${diaMesAño['año']}`,
                'nota': `${informacion}`
              }
              info.push(nota)
              almacenamiento.setItem('calendario',JSON.stringify(info))
            } else {
              const informacion = document.getElementById(`${i} ${mesDelAnio} ${diaMesAño['año']}`).value
              let info = []
              let nota = {
                'id': info.length,
                'fecha': `${i} ${mesDelAnio} ${diaMesAño['año']}`,
                'nota': `${informacion}`
              }
              info.push(nota)
              almacenamiento.setItem('calendario',JSON.stringify(info))
            }
            window.location.reload()
          })          
          contenido.append(textArea)
          contenido.append(guardaCambios)
          divDia.append(contenido)
        }
      })
      divDia.append(expandir)
      seccionRecuadrosDias.append(divDia)
    }
    app_calendario.append(seccionRecuadrosDias)
  }
  if ( !app_calendario.hasChildNodes() ) {
    divsDias(dias)
  } else {
    app_calendario.removeChild(app_calendario.childNodes[0])
    divsDias(dias)
  }
}
const rastreaDia = () => {
  let dia = String(fecha.getDate()).padStart(2,'0')
  let diaBuscado
  if ( diaBuscado < 10){
    diaBuscado = document.getElementById(`Dia-0${dia}`)
  } else {
    diaBuscado = document.getElementById(`Dia-${dia}`)
  }
  diaBuscado.classList.add('activo')
  let x = diaBuscado.offsetLeft
  let y = diaBuscado.offsetTop
  setTimeout(() => {
    window.scrollTo(x,y)
  }, 900);
  diaBuscado.childNodes[1].click()
}
const rastreaDiaSeleccionado = () => {
  let diaSeleccionado = parseInt(document.getElementById('calendario').value.slice(8))
  let diaBuscado
  if ( diaSeleccionado < 10 ) {
    diaBuscado = document.getElementById(`Dia-0${diaSeleccionado}`)
  } else {
    diaBuscado = document.getElementById(`Dia-${diaSeleccionado}`)
  }
  diaBuscado.classList.add('activo')
  diaBuscado.childNodes[1].click()
  let x = diaBuscado.offsetLeft
  let y = diaBuscado.offsetTop - 50
  window.scrollTo(x,y)
}