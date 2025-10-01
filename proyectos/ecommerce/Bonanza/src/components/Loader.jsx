import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"
export function Loader({pageTheme}){
  return(
    <>
      <div className={`loader ${pageTheme}`}>
        <div className="contenedor">
          <div id="contPredos">
            <p id="grPreviousdos"><GrPrevious /></p>
          </div>  
          <div className="bananLoader">
            <img src="src/imagenes/bananLoader.png" alt="Logo" />
          </div>
          <div id="contNex">
            <p id="grNext"><GrNext /></p>
          </div>  
        </div>
      </div>
    </>
  )
}