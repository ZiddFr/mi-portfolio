const almacenamiento = localStorage

const creaUsuario = () => {
  const registrar = document.getElementById('registrar')
  registrar.addEventListener('click',()=> {
    if ( document.getElementById('nombre').value.length != 0 || document.getElementById('numTel').value.length != 0 ) {
      const nombre = document.getElementById('nombre').value
      const numero = document.getElementById('numTel').value
      const email = document.getElementById('email').value
      if (almacenamiento.getItem('Agenda')) {
        let agenda = JSON.parse(almacenamiento.getItem('Agenda'))
        nuevoContacto = {
          'favorito': 0,
          'id': `${agenda.length}`,
          'nombre': `${nombre}`,
          'numTel': `${numero}`,
          'email': `${email}`
        }
        agenda.push(nuevoContacto)
        almacenamiento.setItem('Agenda', JSON.stringify(agenda))
      } else {
        let agenda = []
        let nuevoContacto = {
          'favorito': 0,
          'id': `${agenda.length}`,
          'nombre': `${nombre}`,
          'numTel': `${numero}`,
          'email': `${email}`
        }
        agenda.push(nuevoContacto)
        almacenamiento.setItem('Agenda', JSON.stringify(agenda))
      }
      window.location.reload()
    }
  })
}
creaUsuario()

const despliegaContacto = () => {
  let agenda = JSON.parse(almacenamiento.getItem('Agenda'))


  for ( let i = 0; i<agenda.length; i ++) {
    if ( agenda == null){
      continue
    } else {
      const divBoton = document.createElement('div')
      divBoton.setAttribute('id',`${agenda[i]['id']}-${agenda[i]['nombre']}`)
      divBoton.setAttribute('class','boton')

      //let aux  = `${agenda[i]['nombre']}`.slice(0,`${agenda[i]['nombre']}`.indexOf(' ') )
      //divBoton.innerText = aux

      // boton minimizar
      const expandirMinimizar = document.createElement('button')
      expandirMinimizar.setAttribute('id',`expandirMinimizar-${agenda[i]['id']}`)
      expandirMinimizar.setAttribute('class','expandirMinimizar')
      
      const expandir = document.createElement('i')
      expandir.setAttribute('class','bi bi-plus-circle')
      expandir.style.fontWeight = 'bolder !important'
      expandirMinimizar.appendChild(expandir)
           
      const divPNombre = document.createElement('div')
      const pNombre = document.createElement('span')
      pNombre.innerText = `${agenda[i]['nombre']}` 
      
      const divNombre = document.createElement('div')
      divNombre.setAttribute('class','divNombre')
      
      divPNombre.appendChild(pNombre)
      divNombre.appendChild(expandirMinimizar)
      divNombre.appendChild(divPNombre)


      //seccion favoritos debajo del registro


      const añadeFav = () => {
        const iconoFavorito = document.createElement('i')
        iconoFavorito.setAttribute('class','bi bi-star-fill')
        divNombre.appendChild(iconoFavorito)
      }
      divBoton.appendChild(divNombre)
      const muestraContacto = document.getElementById('muestra-contactos')
      const favoritos = document.getElementById('favoritos')
      expandirMinimizar.addEventListener('click',()=>{
        if ( document.getElementById(`${agenda[i]['nombre']}-${agenda[i]['id']}`) == null ){
          expandir.className = 'bi bi-dash-circle'
          // div de informacion - textareas
          const divInfo = document.createElement('div')
          divInfo.setAttribute('id',`${agenda[i]['nombre']}-${agenda[i]['id']}`)
          divInfo.setAttribute('class','informacion')
          
          const nombreContacto = document.createElement('textarea')
          nombreContacto.setAttribute('id',`textareaNombre-${agenda[i]['id']}`)
          nombreContacto.setAttribute('readonly','true')
          nombreContacto.innerHTML = `${agenda[i]['nombre']}`
          const textoNombre = document.createElement('span')
          textoNombre.innerText = 'Nombre:'
          
          const numTelContacto = document.createElement('textarea')
          numTelContacto.setAttribute('id',`textareaNum-${agenda[i]['id']}`)
          numTelContacto.setAttribute('maxlength','10')
          numTelContacto.setAttribute('onkeyup','entradaNumerica(this)')
          //onkeyup="entradaNumerica(this)
          numTelContacto.innerHTML = `${agenda[i]['numTel']}`
          numTelContacto.setAttribute('readonly','true')
          const numTelefonico = document.createElement('span')
          numTelefonico.innerText = 'Número telefónico: '

          const emailContacto = document.createElement('textarea')
          emailContacto.innerHTML = `${agenda[i]['email']}`
          emailContacto.setAttribute('id',`textareaEmail-${agenda[i]['email']}`)
          emailContacto.setAttribute('readonly','true')
          const correo = document.createElement('span')
          correo.innerText = 'Correo electrónico: '

          divInfo.appendChild(textoNombre)
          divInfo.appendChild(nombreContacto)
          divInfo.appendChild(numTelefonico)
          divInfo.appendChild(numTelContacto)
          divInfo.appendChild(correo)
          divInfo.appendChild(emailContacto)
          divBoton.appendChild(divInfo)

          // botones de modificacion, favorito y eliminar
          const botonIconos = document.createElement('div')
          botonIconos.setAttribute('class','botonIconos')
          botonIconos.setAttribute('id',`botones-${agenda[i]['id']}`)

          // funcion favorito, saca el elemento favorito, lo coloca en otro div y hace hidden
          const favorito = document.createElement('button')
          favorito.setAttribute('type','button')
          favorito.setAttribute('id',`${agenda[i]['id']}-favorito`)
          favorito.setAttribute('class','favorito')

          const favIcono = document.createElement('i')
          favIcono.setAttribute('class','bi bi-star')
          favorito.appendChild(favIcono)

          favorito.addEventListener('click',()=>{

            if ( agenda[i]['favorito'] == 0 ) {
              agenda[i]['favorito'] = 1
            } else if ( agenda[i]['favorito'] == 1 ) {
              agenda[i]['favorito'] = 0
            }

            almacenamiento.setItem('Agenda',JSON.stringify(agenda))
            window.location.reload()
          })

          botonIconos.appendChild(favorito)

          // funcion del boton modificar, cambio de icon bi bi-pencil-square
          // poner hidden la clase botonIconos y al acabar que se quite el hidden
          const modificar = document.createElement('button')
          modificar.setAttribute('type','button')
          modificar.setAttribute('id',`${agenda[i]['id']}-modificar`)
          modificar.setAttribute('class','modificar')

          const modIcono = document.createElement('i')
          modIcono.setAttribute('class','bi bi-pencil')

          modificar.appendChild(modIcono)
          modificar.addEventListener('click', () => {
            document.getElementById(`botones-${agenda[i]['id']}`).setAttribute('hidden','true')
            nombreContacto.removeAttribute('readonly')
            numTelContacto.removeAttribute('readonly')
            emailContacto.removeAttribute('readonly')

            nombreContacto.selectionStart = nombreContacto.value.length
            
            const guardar = document.createElement('button')
            guardar.setAttribute('class','guardar')
            guardar.setAttribute('id',`guardar-${agenda[i]['id']}`)

            const guardaIcono = document.createElement('i')
            guardaIcono.setAttribute('class','bi bi-pencil-square')

            guardar.appendChild(guardaIcono)

            guardar.addEventListener('click',()=>{

              let agenda = JSON.parse(almacenamiento.getItem('Agenda'))
              //nombre
              agenda[i]['nombre'] = document.getElementById(`textareaNombre-${agenda[i]['id']}`).value
              //numTel
              agenda[i]['numTel'] = document.getElementById(`textareaNum-${agenda[i]['id']}`).value
              //email
              agenda[i]['email'] = document.getElementById(`textareaEmail-${agenda[i]['email']}`).value

              almacenamiento.setItem('Agenda',JSON.stringify(agenda))
              window.location.reload()
              // nombreContacto.setAttribute('readonly','true')
              // numTelContacto.setAttribute('readonly','true')
              // emailContacto.setAttribute('readonly','true')
              // guardar.setAttribute('hidden','true')
              // document.getElementById(`botones-${agenda[i]['id']}`).removeAttribute('hidden')
            })
            divInfo.appendChild(guardar)
          })
          botonIconos.appendChild(modificar)

          
          // funcion eliminar contacto, debe aparecer un popUp preguntando si de verdad desea eliminar contacto
          const eliminar = document.createElement('button')
          eliminar.setAttribute('type','button')
          eliminar.setAttribute('id',`${agenda[i]['id']}-eliminar`)
          eliminar.setAttribute('class','eliminar')

          const elimIcono = document.createElement('i')
          elimIcono.setAttribute('class','bi bi-person-x')
          eliminar.appendChild(elimIcono)

          eliminar.addEventListener('click', ()=>{
            const popUp = document.createElement('div')
            popUp.setAttribute('id',`popUp-${agenda[i]['id']}`)
            popUp.setAttribute('class','popUp')
            

            const divEnPopUp = document.createElement('div')
            divEnPopUp.setAttribute('class','divEnPopUp')

            const popBotones = document.createElement('div')
            popBotones.setAttribute('class','popBotones')

            const pregunta = document.createElement('h1')
            pregunta.innerText = `¿Desea eliminar el contacto ${agenda[i]['nombre']}?`
            const cuerpo = document.getElementsByTagName('BODY')[0]
            cuerpo.appendChild(popUp)

              const botonSi = document.createElement('button')
              botonSi.innerText = 'SI'
              botonSi.addEventListener('click',()=>{
                let auxiliar = agenda.slice(i+1)
                agenda.splice(i)
                agenda = agenda.concat(auxiliar)
                almacenamiento.setItem('Agenda',JSON.stringify(agenda))
                window.location.reload()
              })
              const botonNo = document.createElement('button')
              botonNo.innerText = 'NO'
              botonNo.addEventListener('click',()=>{
                document.getElementById(`popUp-${agenda[i]['id']}`).remove()
              })
              popBotones.appendChild(botonSi)
              popBotones.appendChild(botonNo)
              divEnPopUp.appendChild(pregunta)
              divEnPopUp.appendChild(popBotones)
              popUp.appendChild(divEnPopUp)
          })
          botonIconos.appendChild(eliminar)
          divInfo.appendChild(botonIconos)
        } else {
          document.getElementById(`${agenda[i]['nombre']}-${agenda[i]['id']}`).remove()
          expandir.className = 'bi bi-plus-circle'
        }
      })

      if ( agenda[i]['favorito'] == 0 ) {
        muestraContacto.appendChild(divBoton)
      } else if ( agenda[i]['favorito'] == 1 ) {
        const iconoFavorito = document.createElement('i')
        iconoFavorito.setAttribute('class','bi bi-star-fill')
        divNombre.appendChild(iconoFavorito)
        favoritos.appendChild(divBoton)
      }
    }
  }
}
despliegaContacto()

function entradaNumerica(cajaNumTel) {
  //para caracteres invalidos
  let invalido = /[^0-9]/gi
  if(invalido.test(cajaNumTel.value)) {
    cajaNumTel.value = cajaNumTel.value.replace(invalido,"");
  }
}


/*
para agregar contacto
<i class="bi bi-person-add"></i>
para al hacer click se agregue el contacto
<i class="bi bi-person-fill-add"></i>

para eliminar contacto
<i class="bi bi-person-x"></i>

para actualizar informacion
<i class="bi bi-person-vcard"></i>
para al hacer click se actualice informacion
<i class="bi bi-person-vcard-fill"></i>

agregar favorito
<i class="bi bi-star"></i>

favorito
<i class="bi bi-star-fill"></i>

*/