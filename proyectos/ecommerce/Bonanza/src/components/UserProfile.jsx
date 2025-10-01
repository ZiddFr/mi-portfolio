import axios from "axios"
import { Logo } from "./Logo"
import { useEffect } from "react"
import { LogOut } from "./LogOut"
import { CartButton } from "./CartButton.jsx"
import { useParams } from "react-router-dom"
import "./UserProfile.css"
import '../Root.css'
export function UserProfile(){
  let pageTheme = ""
  let userPreferences = {}
  if(localStorage.getItem("userPreferences")) {
    userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
    pageTheme = userPreferences["pageTheme"]
  }


  const { userToken } = useParams() 
  useEffect(()=>{

    axios({
      method: "GET",
      url: "https://dummyjson.com/auth/me",
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
    .then(res=>{
      const userInfo = res.data
      //console.log(typeof(res.data)) //object
      const userData = document.getElementById("userData")
      const userImg = document.createElement("img")
      userImg.setAttribute("src",`${userInfo["image"]}`)
      userImg.setAttribute("class","userImg")
      const divTexts = document.createElement("div")
      divTexts.setAttribute("class","divTexts")
      const cnLabel = document.createElement("label")
      cnLabel.innerText = "Name: "
      const completeName = document.createElement("textarea")
      completeName.innerText = `${userInfo["firstName"]} ${userInfo["lastName"]}`
      completeName.setAttribute("readonly",true)
      cnLabel.append(completeName)
      const unLabel = document.createElement("label")
      unLabel.innerText = "Username:"
      const userName = document.createElement("textarea")
      userName.innerText = `${userInfo["username"]}`
      userName.setAttribute("readonly",true)
      unLabel.append(userName)
      const ueLabel = document.createElement("label")
      ueLabel.innerText = "Email:"
      const userEmail = document.createElement("textarea")
      userEmail.innerText = `${userInfo["email"]}`
      userEmail.setAttribute("readonly",true)
      ueLabel.append(userEmail)
      const urLabel = document.createElement("label")
      urLabel.innerText = "Role:"
      const userRole = document.createElement("textarea")
      userRole.innerText = `${userInfo["role"]}`
      userRole.setAttribute("readonly",true)
      urLabel.append(userRole)
      const ugLabel = document.createElement("label")
      ugLabel.innerText = "Gender:"
      const userGender = document.createElement("textarea")
      userGender.innerText = `${userInfo["gender"]}`
      userGender.setAttribute("readonly",true)
      userData.append(userImg)
      divTexts.append(urLabel) // user role
      divTexts.append(cnLabel) // complete name
      divTexts.append(unLabel) // username
      ugLabel.append(userGender)
      divTexts.append(ugLabel) // user gender
      divTexts.append(ueLabel) // user email
      userData.append(divTexts)
      //
      const userHistorial = document.getElementById("userHistorial")
    })
    .catch(error=>{
      console.log(error)
    })
  },[])
  return(
    <>
      <span className={`${pageTheme}`}>
        <section className="profileSettings">
          <div className="commonBar">
            <Logo />
            <h1>Profile</h1>
            <CartButton whatCartType={"loggedUserCartType"}/>
            <LogOut />
          </div>
          <div id="userData"></div>
          <div id="userHistorial">
            <p>Order history:</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eius dolor atque ratione quo odio natus perferendis? Libero neque ipsum pariatur reprehenderit sunt eligendi incidunt cumque ratione, iusto obcaecati rem?</p>
          </div>
          <div className="others">
            <h2>Preferences:</h2>
            <label>
              <input type="checkbox" name="Notifications" id="pref-notifications" defaultChecked/>
              You'll receive notifications about offers in your home page.
            </label>
          </div>
        </section>
      </span>
    </>
  )
}