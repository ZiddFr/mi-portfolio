import { MdOutlineStyle } from "react-icons/md";
import { GiBee } from "react-icons/gi";
import { GiEmerald } from "react-icons/gi";
import { useEffect, useState } from "react";
import './PageThemes.css'
export function PageThemes({pageThemeChoosed}){
  const [theme,setTheme] = useState(pageThemeChoosed)
  const [isActive,setIsActive] = useState("hide")
  let pageIcon;
  if(theme == 'faddingEmerald'){
    pageIcon = <GiEmerald />
  }else{
    if(theme == 'beMeMeBee'){
      pageIcon = <GiBee />
    }
  }
  useEffect(()=>{

  /* javascript things */
    const changeButtonStyle = document.getElementById('changeButtonStyle')
    changeButtonStyle.addEventListener("click",()=>{
      let active = document.getElementById("dropStylesMenu").classList.contains("hide") ? "show" : "hide";
      setIsActive(active)
    })
    window.onclick = function(event) {
      if(!event.target.matches('#changeButtonStyle')){
        let active = document.getElementById("dropStylesMenu").classList.contains("show") ? "hide" : "hide";        
        setIsActive(active)
      }
    }  
    const buttonsStyles = document.querySelectorAll(".buttonStyle")
    buttonsStyles.forEach((buttonStyle)=>{
      buttonStyle.addEventListener("click",()=>{
        setTheme(buttonStyle.classList[1])
        let active = document.getElementById("dropStylesMenu").classList.contains("hide") ? "show" : "hide";
        setIsActive(active)
        let userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
        userPreferences = {
          userId: userPreferences["userId"],
          pageTheme: buttonStyle.classList[1],
          logStatus: userPreferences["logStatus"],
          cartItems: userPreferences["cartItems"]
        }
        localStorage.setItem("userPreferences",JSON.stringify(userPreferences))
      })
    })
  },[])

  return(
    <>
      <div id="pageThemeFile">
        <div className="pageIcon">{pageIcon}</div>
        <div id="dropDown" className="dropDown">
          <button id="changeButtonStyle"><MdOutlineStyle /></button>
          <div id="dropStylesMenu" className={isActive}>
            <button id="faddingEmerald" className="buttonStyle faddingEmerald">Fadding Emerald <GiEmerald /></button>
            <button id="beMeMeBee" className="buttonStyle beMeMeBee">Be me, Me bee <GiBee /></button>
          </div>
        </div>
      </div>
    </>
  )
}
/* resto de estilos que muy seguramente no implementare 
            <p class="lightMindBlue" onclick="choosedTheme('lightMindBlue')">Light Mind Blue</p>
            <p class="darkMint" onclick="choosedTheme('darkMint')">Dark Mint</p>
            <p class="mintedDarkness" onclick="choosedTheme('mintedDarkness')">Minted Darkness</p>
            <p class="lavenderTown" onclick="choosedTheme('lavenderTown')">Lavender Town</p>
            <p class="sunsetOverdrive" onclick="choosedTheme('sunsetOverdrive')">Sunset Overdrive </p>
            <p class="stoneOcean" onclick="choosedTheme('stoneOcean')">Stone Ocean</p>
            <p class="rayquaza" onclick="choosedTheme('rayquaza')">Rayquaza</p>
*/