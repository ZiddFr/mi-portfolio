function pageLoader() {
  let contenedor=document.getElementById('contenedor_carga')
  contenedor.style.visibility='hidden'
  contenedor.style.opacity='0'
}
setTimeout(pageLoader, 1000)
const almacenamiento = window.localStorage
let fecha = new Date()
const calendario = document.getElementById('calendario')
const fechaElegida = document.getElementById('fecha')
const app = document.getElementById('app')
const divCarga = document.getElementById('carga')
let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const treintaYUno = ['Enero','Marzo','Mayo',,'Julio','Agosto',,'Octubre','Diciembre']
const treinta = ['Abril','Junio','Septiembre','Noviembre']
const mesEspecial = ['Febrero']
const diasDeSemana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
const asignaFecha = () => {
  let diaSemana = fecha.getDay()
  let fechaInput = calendario.value
  const fragmentoDia = parseInt(fechaInput.slice(8,10))
  const fragmentoMes = parseInt(fechaInput.slice(5,7))
  const fragmentoAño = parseInt(fechaInput.slice(0,4))
  fechaElegida.innerHTML = `Día: ${diasDeSemana[diaSemana]} ${fragmentoDia} de ${meses[fragmentoMes-1]} del año ${fragmentoAño}`
  divCarga.innerHTML = `Hoy es ${diasDeSemana[diaSemana]} ${fragmentoDia} de ${meses[fragmentoMes-1]} del año ${fragmentoAño}`
  let diaMesAño = {
    'dia': fragmentoDia,
    'mes': fragmentoMes, 
    'año': fragmentoAño
  }
  return diaMesAño
}
window.onload=function(){
  let dia = String(fecha.getDate()).padStart(2,'0')
  let mes = String(fecha.getMonth()+1).padStart(2,'0')
  let año = String(fecha.getFullYear())
  calendario.value = `${año}-${mes}-${dia}`
  asignaFecha()
  generaRecuadros()
  rastreaDia()
}
calendario.onchange = function () {
  asignaFecha()
  generaRecuadros()
  rastreaDiaSeleccionado()
}
const generaRecuadros = () => {
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
    let diaActual = fecha.getDate()
    const seccionRecuadrosDias = document.createElement('section')
    seccionRecuadrosDias.setAttribute('id',`${meses[diaMesAño['mes']-1]} `)
    seccionRecuadrosDias.setAttribute('class','seccion_calendario contenedor_auto')
    for ( let i = 0; i<dias; i++ ){
      const divDia = document.createElement('div')
      if ( i < 10 ) {
        divDia.setAttribute('id',`Dia-0${i+1}`)
      } else {
        divDia.setAttribute('id',`Dia-${i+1}`)
      }
      divDia.setAttribute('class','contenedor_dia contenedor_columna')
      const titulo = document.createElement('p')
      if ( i+1 == diaActual ){
        titulo.innerText = `${diasDeSemana[fecha.getDay()]} ${i+1} ${meses[diaMesAño['mes']-1]}`
      } else {
        titulo.innerText = `${i+1} ${meses[diaMesAño['mes']-1]}`
      }
      let info = JSON.parse(almacenamiento.getItem('calendario'))
      if ( info != null ) {
        for ( let k=0; k<info.length; k++ ) {
          let fechaAlmacenada = info[k]['fecha'].slice(0,info[k]['fecha'].lastIndexOf('_')).replace('_',' ')
          if( titulo.textContent == fechaAlmacenada ){
            titulo.style.color = 'white'
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
        if (document.getElementById(`${i+1}_${meses[diaMesAño['mes']-1]}_${diaMesAño['año']}`)){
          divDia.classList.remove('activo')
          divDia.removeChild(divDia.childNodes[2])
          iconoExpandir.setAttribute('class','bi bi-arrows-angle-expand')
        } else {
          const contenido = document.createElement('div')
          contenido.setAttribute('class','contenido contenedor_columna')
          const textArea = document.createElement('textarea')
          textArea.setAttribute('id',`${i+1}_${meses[diaMesAño['mes']-1]}_${diaMesAño['año']}`)
          textArea.setAttribute('class','textArea')
          if ( info ) {
            for ( let i=0; i<info.length; i++ ) {
              if ( textArea.id == info[i]['fecha']) {
                textArea.value = info[i]['nota']
              }
            }
          } else {
            textArea.value = ''
          }
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
              const informacion = document.getElementById(`${i+1}_${meses[diaMesAño['mes']-1]}_${diaMesAño['año']}`).value
              let info = JSON.parse(almacenamiento.getItem('calendario'))
              nota = {
                'id': info.length,
                'fecha': `${i+1}_${meses[diaMesAño['mes']-1]}_${diaMesAño['año']}`,
                'nota': `${informacion}`
              }
              info.push(nota)
              almacenamiento.setItem('calendario',JSON.stringify(info))
            } else {
              const informacion = document.getElementById(`${i+1}_${meses[diaMesAño['mes']-1]}_${diaMesAño['año']}`).value
              let info = []
              let nota = {
                'id': info.length,
                'fecha': `${i+1}_${meses[diaMesAño['mes']-1]}_${diaMesAño['año']}`,
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
    app.append(seccionRecuadrosDias)
  }
  if ( !app.hasChildNodes() ) {
    divsDias(dias)
  } else {
    app.removeChild(app.childNodes[4])
    divsDias(dias)
  }
}
const rastreaDia = () => {
  let dia = String(fecha.getDate()).padStart(2,'0')
  const diaBuscado = document.getElementById(`Dia-${dia}`)
  diaBuscado.classList.add('activo')

  setTimeout(() => {
    let x = diaBuscado.offsetLeft
    let y = diaBuscado.offsetTop
    window.scrollBy(x,y)
  }, 750);
  diaBuscado.childNodes[1].click()
}
const rastreaDiaSeleccionado = () => {
  let fechaSeleccionada = document.getElementById('calendario').value.slice(8)
  const diaBuscado = document.getElementById(`Dia-${fechaSeleccionada}`)
  diaBuscado.classList.add('activo')
  diaBuscado.childNodes[1].click()
  let x = diaBuscado.offsetLeft
  let y = diaBuscado.offsetTop
  window.scrollBy(x,y)
}
