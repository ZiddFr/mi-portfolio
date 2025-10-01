import { NavLink } from "react-router-dom"
import { Logo } from './Logo.jsx'
import { SearchBar } from './SearchBar.jsx'
import { LogOut } from './LogOut.jsx'
import { CartButton } from "./CartButton.jsx"
import { IoSettingsOutline } from "react-icons/io5";
//import { PageThemes } from './PageThemes.jsx'
import './NavBar.css'

export const NavBar = ({logStatus,pageTheme,userId}) => {
  const requestLogStatus = () => {
    let cookie = document.cookie
    const userToken = cookie.split("=")[1]
    return userToken
  }
  const userToken = requestLogStatus()
  return(
    <>
      <section id="NavBar-wrapper" className={`NavBar-wrapper ${pageTheme}`}>
        <Logo />
        <SearchBar />
        {
          (()=>{
            if(logStatus == true) {
              return(
                <>
                  <div className="navBarButtons userButtons">
                    <NavLink
                    id="userSettings"
                    reloadDocument
                    to={`/userprofile/${userToken}`}>
                      <button>
                        <IoSettingsOutline />
                      </button>
                    </NavLink>
                    <NavLink
                    id="userCartButton"
                    reloadDocument
                    to={`/shoppingcart/${userId}`}>
                      <CartButton whatCartType={"loggedUserCartType"}/>
                    </NavLink>
                    <LogOut />
                  </div>
                </>
              )
            } else if ( logStatus == false ){
              userId = "guest"
              return(
                <>
                  <div className="navBarButtons guestButtons">
                    <CartButton whatCartType={"guestUserCartType"} />
                    <CartButton whatCartType={"canLogIn"}/>
                  </div>
                </>
              )
            }
          })()
        }
      </section>
    </>
  )
}