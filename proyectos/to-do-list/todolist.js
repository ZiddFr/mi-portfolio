const almacenamiento = window.localStorage;
//almacenamiento.clear();

const recuperarDeCajas = () => {
  const botonAgregar = document.getElementById('agregar');
  botonAgregar.addEventListener('click',()=>{
    const cajaTarea = document.getElementById('caja-de-tarea').value;
    const cajaNota = document.getElementById('caja-de-nota').value;
    if ( almacenamiento.getItem('tarea') ) {
      let tareas = JSON.parse(almacenamiento.getItem('tarea'))
      nuevaTarea = {
        'importante': 0,
        'tarea': `${cajaTarea}`,
        'nota': `${cajaNota}`
      }
      tareas.push(nuevaTarea)
      almacenamiento.setItem('tarea', JSON.stringify(tareas))
    } else {
      let tareas = []
      let nuevaTarea = {
        'importante': 0,
        'tarea': `${cajaTarea}`,
        'nota': `${cajaNota}`
      }
      tareas.push(nuevaTarea)
      almacenamiento.setItem('tarea', JSON.stringify(tareas))
    }
    window.location.reload()
    //let pruebaTarea = JSON.parse(almacenamiento.getItem(`tarea`));
    //document.write(pruebaTarea[0]['tarea']);
  });
};
recuperarDeCajas();

// Hacer la función con un forEach() en lugar de un ciclo

const muestraContactosPrincipal = () => {
  let tareas = JSON.parse(almacenamiento.getItem('tarea'))

  const importante = document.getElementById('importante')
  importante.innerText = 'IMPORTANTE'
  
  const areaDeMuestra = document.getElementById('muestra-tarea')
  areaDeMuestra.innerText = 'Tareas pendientes: '

  for (let i = 0; i < tareas.length; i++) {
    if ( tareas == null ) {
      continue;
    } else {
      const muestraTarea = document.createElement('DIV')
      muestraTarea.setAttribute('id', `${i}-tarea`)
      muestraTarea.setAttribute('class', `tarea contenedor`)
      
  
      const areaTextoTarea = document.createElement('textarea')
      areaTextoTarea.setAttribute('id',`${i}-area-texto-tarea`)
      areaTextoTarea.setAttribute('class','area-texto-tarea')
      areaTextoTarea.innerHTML = `${tareas[i]['tarea']}`
  
      const guardarCambios = document.createElement('button')
      guardarCambios.setAttribute('type','button')
      guardarCambios.setAttribute('id', `${i}__guardar`)
      guardarCambios.setAttribute('class','botonGuardar')
  
      const iconoGuardar = document.createElement('i')
      iconoGuardar.setAttribute('class','bi bi-plus-square')
      guardarCambios.appendChild(iconoGuardar)


      const botonMostrarNota = document.createElement('button')
      botonMostrarNota.setAttribute('type','button')
      botonMostrarNota.setAttribute('id', `${i}__nota`)
      botonMostrarNota.setAttribute('class','botonNota')
    
      const icono = document.createElement('i')
      icono.setAttribute('class','bi bi-list')
      botonMostrarNota.appendChild(icono)

      const areaTextoNota = document.createElement('textarea')
      areaTextoNota.setAttribute('id',`${i}-area-texto-nota`)
      areaTextoNota.setAttribute('class',`area-texto-nota`)
      areaTextoNota.innerHTML = `${tareas[i]['nota']}`


      botonMostrarNota.addEventListener('click', () => {
        if ( document.getElementById(`${i}-nota`) == null ) {
          const divNota = document.createElement('DIV');
          divNota.setAttribute('id', `${i}-nota`);
          divNota.setAttribute('class','divNota');
  
          // const areaTextoNota = document.createElement('textarea');
          // areaTextoNota.setAttribute('id',`${i}-area-texto-nota`);
          // areaTextoNota.setAttribute('class',`area-texto-nota`);
          // areaTextoNota.innerHTML = `${tareas[i]['nota']}`;
          divNota.appendChild(areaTextoNota);
          muestraTarea.appendChild(divNota);
          //document.getElementById(`${i}-area-texto-nota`).focus();
          areaTextoNota.selectionStart = areaTextoNota.value.length;
        } 
        else {
          document.getElementById(`${i}-nota`).remove();
        }
      })
      
      // Modifica local storage
      guardarCambios.addEventListener('click', () => {
        let iDSolicitada = JSON.parse(almacenamiento.getItem(`tarea`))

        iDSolicitada[i]['tarea'] = document.getElementById(`${i}-area-texto-tarea`).value
        almacenamiento.setItem(`tarea`, JSON.stringify(iDSolicitada))
        iDSolicitada[i]['nota'] = document.getElementById(`${i}-area-texto-nota`).value
        almacenamiento.setItem(`tarea`, JSON.stringify(iDSolicitada))

        window.location.reload()
      })

      const botonEliminaTarea = document.createElement('button')
      botonEliminaTarea.setAttribute('types', 'button')
      botonEliminaTarea.setAttribute('id', `${i}-boton-eliminar`)
      botonEliminaTarea.setAttribute('class', 'boton-eliminar')
      
      const iconoEliminar = document.createElement('i')
      iconoEliminar.setAttribute('class','bi bi-journal-x')
      botonEliminaTarea.appendChild(iconoEliminar)

      botonEliminaTarea.addEventListener('click', () => {
        const tareas = JSON.parse(almacenamiento.getItem('tarea'))
        const resto = tareas.slice(i+1)

        tareas.splice(i)
        
        const nueva = tareas.concat(resto)
        almacenamiento.setItem('tarea', JSON.stringify(nueva))
        window.location.reload()
      })

      const botones = document.createElement('div')
      botones.setAttribute('class','tresBotones')
      botones.appendChild(botonMostrarNota)
      botones.appendChild(guardarCambios)
      botones.appendChild(botonEliminaTarea)
      
      const btnImportante = document.createElement('button')
      
      
      btnImportante.addEventListener('click', ()=> {
        if ( tareas[i]['importante'] == 0 ) {
          tareas[i]['importante'] = 1
        } else if ( tareas[i]['importante'] == 1 ) {
          tareas[i]['importante'] = 0
        }
        almacenamiento.setItem('tarea',JSON.stringify(tareas))
        window.location.reload()
      })

      const caja = document.createElement('div')
      caja.setAttribute('class','caja')
      caja.appendChild(btnImportante)
      caja.appendChild(areaTextoTarea)

      const division = document.createElement('div')
      division.setAttribute('class','division contenedor')

      
      division.appendChild(caja)
      division.appendChild(botones)
      muestraTarea.appendChild(division) 
      
      if ( tareas[i]['importante'] == 0 ) {
        btnImportante.setAttribute('class','bi bi-exclamation-circle')
        areaDeMuestra.appendChild(muestraTarea)

      } else if ( tareas[i]['importante'] == 1) {
        btnImportante.setAttribute('class','bi bi-exclamation-circle-fill')
        importante.appendChild(muestraTarea)
      }
    }
  };
};
muestraContactosPrincipal();