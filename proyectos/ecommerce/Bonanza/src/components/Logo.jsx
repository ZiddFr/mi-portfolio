import logo from '../imagenes/banan.png'
import './Logo.css'
export const Logo = () => {
  return(
    <>
      <div className="contenedor_logo">
        <a id="logo" href="http://localhost:5173" title="Go to Bonanza! home page." rel="noopener noreferrer">
          <img id="img_logo" src={logo} alt="Logo ecommerce" />
        </a>
        <span className="pageTitle rainbow">Bonanzaaa!!</span>
      </div>
    </>
  )
}