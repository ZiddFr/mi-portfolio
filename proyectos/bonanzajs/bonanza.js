function pageLoader() {
  let contenedor=document.getElementById('contenedor_carga')
  contenedor.style.visibility='hidden'
  contenedor.style.opacity='0'
}
setTimeout(pageLoader, 600)


const almacenamiento = localStorage
/* todas las ids */
/* main */
const navegador = document.getElementById('navegador')
const ofertas = document.getElementById('ofertas')
const mas_vendido = document.getElementById('mas-vendido')
/* footer */
const pie = document.getElementById('pie-de-pagina')
const atencion_clientes = document.getElementById('atencion-clientes')
const acerca_de_nosotros = document.getElementById('acerca-de-nosotros')
const politica_empresa = document.getElementById('politica-empresa')
const contacto = document.getElementById('contacto')
const derechos_de_autor = document.getElementById('derechos-de-autor')

function azar() {  
  return 0.5 - Math.random()
}

//fetching de fakestoreapi
const url = 'https://fakestoreapi.com/products'
fetch(url)
  .then(response => response.json())
  .then(data => {
    let articulos = []
    let enOferta = []
    data.sort(azar)
    articulos = data.slice(0,15) 
    enOferta = data.slice(15)
    
    // en oferta
    const carrusel = document.getElementById('carrusel')
    for ( let o = 0; o<enOferta.length; o++) {
      const objeto = document.createElement('div')
      if ( o == 0 ) {
        objeto.setAttribute('class', 'objeto contenedor_auto activo')
      } else {
        objeto.setAttribute('class', 'objeto contenedor_auto')
      }
      const nombre = document.createElement('p')
      nombre.setAttribute('class','titulo_producto')
      nombre.innerText = `${enOferta[o]['title']}`

      const imagen = document.createElement('img')
      imagen.setAttribute('src',`${enOferta[o]['image']}`)
      imagen.setAttribute('class','imagenCarrusel')

      const categoria = document.createElement('p')
      categoria.innerText = `${enOferta[o]['category']}`

      const precio = document.createElement('h4')
      precio.innerText = `$${enOferta[o]['price']}`
      precio.style.textDecorationLine = 'line-through'
      let resultado = (parseInt(`${enOferta[o]['price']}`)*0.4).toFixed(2)

      const precioOferta = document.createElement('h3')
      precioOferta.textContent = `$${resultado}`

      const divMostrador = document.createElement('div')
      divMostrador.setAttribute('class','mostrador contenedor_auto')

      const añadirABolsa = document.createElement('i')
      añadirABolsa.setAttribute('class','bi bi-bag-plus')

      añadirABolsa.addEventListener('click',()=>{
        let registroUsuarios = JSON.parse(almacenamiento.getItem('registroUsuarios'))
        let iDUsuario = JSON.parse(almacenamiento.getItem('inicioSesion'))
        registroUsuarios[iDUsuario]['iniciaSesion']['bolsa']['articulos'].push(enOferta[o]['id'])
        almacenamiento.setItem('registroUsuarios',JSON.stringify(registroUsuarios))
      })

      const divTxtContenido = document.createElement('div')
      divTxtContenido.setAttribute('class','contenedor_texto contenedor_columna')
      divMostrador.append(imagen)
      divTxtContenido.append(nombre)
      divTxtContenido.append(categoria)
      divTxtContenido.append(precio)
      divTxtContenido.append(precioOferta)
      divTxtContenido.append(añadirABolsa)
      objeto.append(divMostrador)
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
    //console.log(elementos.length) => 5 elementos
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
        indice = 5
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
      if ( indice == 5 ){
        indice = 0
      }
      elementos[indice].classList.add('activo')
      elementos[indice].removeAttribute('hidden')
      return indice
    })
    setInterval(function(){siguiente.click()},5000)


    // tres al azar
    const divAzar = document.getElementById('articulos-azar')
    const contenedorAzar = document.createElement('div')
    contenedorAzar.setAttribute('class','contenedor_auto')
    for ( let a=0; a<3; a++ ) {
      const divMuestra = document.createElement('div')
      divMuestra.setAttribute('class','muestraAzar contenedor_columna')
      const nombre = document.createElement('p')
      nombre.setAttribute('class','titulo_producto')
      const categoria = document.createElement('p')
      const imagen = document.createElement('img')
      if (a == 1) {
          nombre.innerText = `${enOferta[a]['title']}`
          categoria.innerText = `${enOferta[a]['category']}`
          imagen.setAttribute('src',`${enOferta[a]['image']}`)
        } else {
          nombre.innerText = `${articulos[a]['title']}`
          categoria.innerText = `${articulos[a]['category']}`
          imagen.setAttribute('src',`${articulos[a]['image']}`)
      }
      imagen.setAttribute('class','imagenAzar')
      const divTxt = document.createElement('div')
      divTxt.setAttribute('class', 'contenedor_texto contenedor_columna')
      
      divTxt.append(nombre)
      divTxt.append(categoria)
      divMuestra.append(imagen)
      divMuestra.append(divTxt)
      contenedorAzar.append(divMuestra)
      divAzar.append(contenedorAzar)
    }

    // mas vendido
    const masVendido = document.getElementById('mas-vendido')
    const contenedorVendido = document.createElement('div')
    contenedorVendido.setAttribute('class','contenedor_auto')
    let c = 0;
    for ( let i=0; i<data.length; i++ ){
      if ( data[i]['rating']['rate'] >= 4 ) {
        
        const divMuestra = document.createElement('div')
        divMuestra.setAttribute('class','masVendido contenedor_columna')
        const nombre = document.createElement('p')
        nombre.setAttribute('class','titulo_producto')
        nombre.innerText = `${data[i]['title']}`
        const categoria = document.createElement('p')
        categoria.innerText = `${data[i]['category']}`
        const imagen = document.createElement('img')
        imagen.setAttribute('src',`${data[i]['image']}`)
        imagen.setAttribute('class','masVendida')
        const ratio = document.createElement('p')
        ratio.innerText = `${data[i]['rating']['rate']}`

        const divTxt = document.createElement('div')
        divTxt.setAttribute('class','contenedor_texto contenedor_columna')


        divTxt.append(nombre)
        divTxt.append(categoria)
        divTxt.append(ratio)

        divMuestra.append(imagen)
        divMuestra.append(divTxt)
        contenedorVendido.append(divMuestra)
        masVendido.append(contenedorVendido)
        c++
        if ( c == 3 ) {
          break
        }
      }
    }
  })
  .catch(error => console.log(error))

//
/*
let data = [
  {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
          "rate": 3.9,
          "count": 120
      }
  },
  {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "rating": {
          "rate": 4.1,
          "count": 259
      }
  },
  {
      "id": 3,
      "title": "Mens Cotton Jacket",
      "price": 55.99,
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "rating": {
          "rate": 4.7,
          "count": 500
      }
  },
  {
      "id": 4,
      "title": "Mens Casual Slim Fit",
      "price": 15.99,
      "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      "rating": {
          "rate": 2.1,
          "count": 430
      }
  },
  {
      "id": 5,
      "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      "price": 695,
      "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      "category": "jewelery",
      "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      "rating": {
          "rate": 4.6,
          "count": 400
      }
  },
  {
      "id": 6,
      "title": "Solid Gold Petite Micropave ",
      "price": 168,
      "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      "category": "jewelery",
      "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      "rating": {
          "rate": 3.9,
          "count": 70
      }
  },
  {
      "id": 7,
      "title": "White Gold Plated Princess",
      "price": 9.99,
      "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      "category": "jewelery",
      "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      "rating": {
          "rate": 3,
          "count": 400
      }
  },
  {
      "id": 8,
      "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
      "price": 10.99,
      "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      "category": "jewelery",
      "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      "rating": {
          "rate": 1.9,
          "count": 100
      }
  },
  {
      "id": 9,
      "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      "price": 64,
      "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      "rating": {
          "rate": 3.3,
          "count": 203
      }
  },
  {
      "id": 10,
      "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      "price": 109,
      "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      "rating": {
          "rate": 2.9,
          "count": 470
      }
  },
  {
      "id": 11,
      "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      "price": 109,
      "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      "rating": {
          "rate": 4.8,
          "count": 319
      }
  },
  {
      "id": 12,
      "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      "price": 114,
      "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      "rating": {
          "rate": 4.8,
          "count": 400
      }
  },
  {
      "id": 13,
      "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      "price": 599,
      "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      "rating": {
          "rate": 2.9,
          "count": 250
      }
  },
  {
      "id": 14,
      "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
      "price": 999.99,
      "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
      "category": "electronics",
      "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      "rating": {
          "rate": 2.2,
          "count": 140
      }
  },
  {
      "id": 15,
      "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      "price": 56.99,
      "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
      "category": "women's clothing",
      "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      "rating": {
          "rate": 2.6,
          "count": 235
      }
  },
  {
      "id": 16,
      "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      "price": 29.95,
      "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
      "category": "women's clothing",
      "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      "rating": {
          "rate": 2.9,
          "count": 340
      }
  },
  {
      "id": 17,
      "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      "price": 39.99,
      "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
      "category": "women's clothing",
      "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      "rating": {
          "rate": 3.8,
          "count": 679
      }
  },
  {
      "id": 18,
      "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
      "price": 9.85,
      "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
      "category": "women's clothing",
      "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      "rating": {
          "rate": 4.7,
          "count": 130
      }
  },
  {
      "id": 19,
      "title": "Opna Women's Short Sleeve Moisture",
      "price": 7.95,
      "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
      "category": "women's clothing",
      "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
      "rating": {
          "rate": 4.5,
          "count": 146
      }
  },
  {
      "id": 20,
      "title": "DANVOUY Womens T Shirt Casual Cotton Short",
      "price": 12.99,
      "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      "category": "women's clothing",
      "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
      "rating": {
          "rate": 3.6,
          "count": 145
      }
  }
]
*/
/* por si el fetch deja de funcionar, solo no mandar a llamar las imagenes
let articulos = []
let enOferta = []
data.sort(azar)
articulos = data.slice(0,15) 
enOferta = data.slice(15)

// en oferta
const carrusel = document.getElementById('carrusel')
for ( let o = 0; o<enOferta.length; o++) {
  const objeto = document.createElement('div')
  if ( o == 0 ) {
    objeto.setAttribute('class', 'objeto activo')
  } else {
    objeto.setAttribute('class', 'objeto')
  }
  const nombre = document.createElement('p')
  nombre.setAttribute('class','titulo_producto')
  nombre.innerText = `${enOferta[o]['title']}`
  const imagen = document.createElement('img')
  imagen.setAttribute('src',`${enOferta[o]['image']}`)
  imagen.setAttribute('class','imagenCarrusel')
  const categoria = document.createElement('p')
  categoria.innerText = `${enOferta[o]['category']}`
  const precio = document.createElement('h2')
  precio.innerText = `$${enOferta[o]['price']}`
  const divMostrador = document.createElement('div')
  divMostrador.setAttribute('class','mostrador contenedor_columna')

  const añadirABolsa = document.createElement('i')
  añadirABolsa.setAttribute('class','bi bi-bag-plus')

  añadirABolsa.addEventListener('click',()=>{
    let registroUsuarios = JSON.parse(almacenamiento.getItem('registroUsuarios'))
    let iDUsuario = JSON.parse(almacenamiento.getItem('inicioSesion'))
    registroUsuarios[iDUsuario]['bolsa'].push(enOferta[o]['id'])
    almacenamiento.setItem('registroUsuarios',JSON.stringify(registroUsuarios))
  })


  divMostrador.append(imagen)
  divMostrador.append(nombre)
  divMostrador.append(categoria)
  divMostrador.append(precio)
  divMostrador.append(añadirABolsa)
  objeto.append(divMostrador)
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
//console.log(elementos.length) = 5 elementos

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
    indice = 5
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
  if ( indice == 5 ){
    indice = 0
  }
  elementos[indice].classList.add('activo')
  elementos[indice].removeAttribute('hidden')
  return indice
})

setInterval(function(){siguiente.click()},5000)


// tres al azar
const divAzar = document.getElementById('articulos-azar')
const contenedorAzar = document.createElement('div')
contenedorAzar.setAttribute('class','contenedor_auto')
for ( let a=0; a<3; a++ ) {
  const divMuestra = document.createElement('div')
  divMuestra.setAttribute('class','muestraAzar contenedor_columna')
  const nombre = document.createElement('p')
  nombre.setAttribute('class','titulo_producto')
  const categoria = document.createElement('p')
  const imagen = document.createElement('img')
  if (a == 1) {
      nombre.innerText = `${enOferta[a]['title']}`
      categoria.innerText = `${enOferta[a]['category']}`
      imagen.setAttribute('src',`${enOferta[a]['image']}`)
    } else {
      nombre.innerText = `${articulos[a]['title']}`
      categoria.innerText = `${articulos[a]['category']}`
      imagen.setAttribute('src',`${articulos[a]['image']}`)
  }
  imagen.setAttribute('class','imagenAzar')
  divMuestra.append(imagen)
  divMuestra.append(nombre)
  divMuestra.append(categoria)
  contenedorAzar.append(divMuestra)
  divAzar.append(contenedorAzar)
}

// mas vendido
const masVendido = document.getElementById('mas-vendido')
const contenedorRatio = document.createElement('div')
contenedorRatio.setAttribute('class','contenedor_auto')
let c = 0;
for ( let i=0; i<data.length; i++ ){
  if ( data[i]['rating']['rate'] >= 4 ) {
    
    const divMuestra = document.createElement('div')
    divMuestra.setAttribute('class','masVendido contenedor_columna')
    const nombre = document.createElement('p')
    nombre.setAttribute('class','titulo_producto')
    nombre.innerText = `${data[i]['title']}`
    const categoria = document.createElement('p')
    categoria.innerText = `${data[i]['category']}`
    const imagen = document.createElement('img')
    imagen.setAttribute('src',`${data[i]['image']}`)
    imagen.setAttribute('class','masVendida')
    const ratio = document.createElement('p')
    ratio.innerText = `${data[i]['rating']['rate']}`

    divMuestra.append(imagen)
    divMuestra.append(nombre)
    divMuestra.append(categoria)
    divMuestra.append(ratio)
    contenedorRatio.append(divMuestra)
    masVendido.append(contenedorRatio)
    c++
    if ( c == 3 ) {
      break
    }
  }
}
*/
//


/*
icono de moneda
class="bi bi-coin"
*/

const linksALogin = () => {
const pulsacion = {
  clickIniciaSesion: false,
  clickRegistrarse: false
}

const botonIniciaSesion = document.getElementById('inicio-sesion')
botonIniciaSesion.addEventListener('click',()=>{
  pulsacion['clickIniciaSesion'] = true
  almacenamiento.setItem('inicio-registro', JSON.stringify(pulsacion))
})

const botonRegistrarse = document.getElementById('registro')
botonRegistrarse.addEventListener('click',()=>{
  pulsacion['clickRegistrarse'] = true
  almacenamiento.setItem('inicio-registro', JSON.stringify(pulsacion))
})
}
linksALogin()

//
const iDUsuario = JSON.parse(almacenamiento.getItem('inicioSesion'))
const usuarios = JSON.parse(almacenamiento.getItem('registroUsuarios'))

const enSesion = () => {
  const botonIniciaSesion = document.getElementById('inicio-sesion')
  botonIniciaSesion.remove()
  const botonRegistrarse = document.getElementById('registro')
  botonRegistrarse.remove()

  const panelUsuario = document.createElement('menu')
  panelUsuario.setAttribute('class','panelUsuario')
  panelUsuario.innerText = `${usuarios[iDUsuario]['nombreUsuario']}`

  const cerrarSesion = document.createElement('a')
  cerrarSesion.setAttribute('id','cerrarSesion')
  cerrarSesion.setAttribute('class','nav-link super cerrarSesion')
  cerrarSesion.innerHTML = 'Cerrar sesión'
  cerrarSesion.setAttribute('href','bonanza.html')
  cerrarSesion.addEventListener('click',()=>{
    usuarios[iDUsuario]['iniciaSesion']['hizoLogin'] = false
    usuarios[iDUsuario]['iniciaSesion']['checked'] = false
    almacenamiento.setItem('registroUsuarios',JSON.stringify(usuarios))
    window.location.reload()
  })
  const enlaces = document.getElementById('enlaces')
  enlaces.append(panelUsuario)
  enlaces.append(cerrarSesion)
}

const sesionUnica = () => {
  enSesion()
  window.addEventListener('beforeunload', ()=> {
    usuarios[iDUsuario]['iniciaSesion']['hizoLogin'] = false
    usuarios[iDUsuario]['iniciaSesion']['unaOcasion'] = false
    almacenamiento.setItem('registroUsuarios',JSON.stringify(usuarios))
  })
}

const iniciandoSesion = () => {
  if ( usuarios[iDUsuario]['iniciaSesion']['hizoLogin'] == true || usuarios[iDUsuario]['iniciaSesion']['checked'] == true ) {
    enSesion()
  } else if ( usuarios[iDUsuario]['iniciaSesion']['unaOcasion'] == true ) {
    sesionUnica()
  }
}
iniciandoSesion()

// carrazo

const bolsa = document.getElementById('bolsa')

const iBolsaVacia = document.createElement('i')
iBolsaVacia.setAttribute('class','bi bi-bag')


// este es el icono para añadir un articulo a la bolsa, solo aparecerá dentro del artículo de muestra     'bi bi-bag-plus'

// al hacer click en el item de añadir a la bolsa, la bolsa original cambiará brevemente a este icono
// solo aparecerá cuando se encuentre en la pagina principal o en la página de los artículos              'bi bi-bag-heart'


// al hacer click en el item de añadir, este cambiará a una bolsa con palomita
// aparecerá en la página principal y también en la página donde se mostrarán los artículos               'bi bi-bag-check'


// este es el icono que eliminará el artículo del carrito
// aparecerá en todos lados                                                                               'bi bi-bag-dash'