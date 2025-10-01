import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import axios from "axios";
import '../Root.css'
import './Loginregisterform.css'

function TextLink({linkTo,linkId,textInsideLink}){
  return(
    <>
      <p className="form__text">
        <a href={linkTo} id={linkId} className="form__link" rel="noopener noreferrer">{textInsideLink}</a>
      </p>
    </>
  )
}
function Inputgroup({inputType,inputId,focused,textPlaceholder}){
  return(
    <>
      <div className="form__input-group">
        <input  type={inputType} className="form__input" id={inputId} autoFocus={focused} placeholder={textPlaceholder} />
        <div className="form__input-error-message"></div>
      </div>
    </>
  )
}

export function Loginregisterform(){
  let userPreferences = {
    userId: Number,
    pageTheme: String,
    logStatus: Boolean,
    cartItems: Array
  }
  if(!JSON.parse(localStorage.getItem("userPreferences"))){
    userPreferences = {
      userId: 0,
      pageTheme: "faddingEmerald",
      logStatus: false,
      cartItems: []
    }
  }
  //const [ids,setIds] = useState(Array)
  useEffect(()=>{
    //functions
    function setFormMessage(formElement, type, message) {
      const messageElement = formElement.querySelector(".form__message")
      messageElement.textContent = message
      messageElement.classList.remove("form__message--success", "form__message--error")
      messageElement.classList.add(`form__message--${type}`)
    }
    function clearFormMessage(formElement){
      const messageElement = formElement.querySelector(".form__message")
      messageElement.classList.remove(`form__message--error`)
      messageElement.textContent = ""
    }
    function setInputError(inputElement, message) {
      inputElement.classList.add("form__input--error");
      inputElement.parentElement.querySelector(".form__input-error-message").textContent = message
    }
    function clearInputError(inputElement) {
      inputElement.classList.remove("form__input--error")
      inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""
    }
    // eventsListeners section
    const loginForm = document.getElementById("login");
    const createAccountForm = document.getElementById("createAccount")
    const linkCreateAccount = document.getElementById("linkCreateAccount")
    const linkLogin = document.getElementById("linkLogin")
    //hidden form, actions events through links
    linkCreateAccount.addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.add("form--hidden")
        createAccountForm.classList.remove("form--hidden")
    })
    linkLogin.addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("form--hidden")
        createAccountForm.classList.add("form--hidden")
    })
    loginForm.addEventListener("submit", e => {
      e.preventDefault()
      userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
      const loginUsername = document.getElementById("loginUsername").value
      const loginPassword = document.getElementById("loginPassword").value
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
          expiresInMins: 30, // optional, defaults to 60
        })
        //credentials: 'include' // Include cookies (e.g., accessToken) in the request
      })
      // the data from userPreferences is something I came up to give some dinamic to the ecommerce so
      // you will be seeing this default style for every user that log in 
      // this is because the API doesn't provide that kind of information like a "favorite theme"
      // instead I'll provide a way to change the page theme and that is all on me
      .then(response =>{
        const data = response.json()
        data.then(user => {          
          userPreferences = {
            userId: user["id"],
            pageTheme: `beMeMeBee`,
            logStatus: true,
            cartItems: []
          }
          localStorage.setItem("userPreferences",JSON.stringify(userPreferences))
          document.cookie = `token=${user["accessToken"]}; expires=1000 path=/`
        }).then(()=>{
          userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
          axios({
            method: "GET",
            url: `https://dummyjson.com/carts/${userPreferences["userId"]}`
          })
          .then(res=>{
            const cartData = res.data
            let  productsIds = []
            for(let i=0;i<cartData["products"].length;i++){
              productsIds.push(cartData["products"][i]["id"])
            }
            userPreferences = {
              userId: userPreferences["userId"],
              pageTheme: `beMeMeBee`,
              logStatus: true,
              cartItems: productsIds
            }
            localStorage.setItem("userPreferences",JSON.stringify(userPreferences))
            location.replace("http://localhost:5173/")
          })
          .catch(error=>{
            console.log("Failed to get cart information due to the error: " + error)
          })
        })
      })
      .catch(error =>{
        console.log("Failed to login due to error: " + error)
        setFormMessage(loginForm, "Error", "Invalid username or password.")
      })

  })     
    // clear error message
    loginForm.addEventListener("input", e =>{
      clearFormMessage(loginForm)
    })

    //en veremos
    createAccountForm.addEventListener("submit", e=> {
      e.preventDefault()
      const signUpUsername = document.getElementById("signupUsername").value
      const signUpEmail = document.getElementById("signupEmail").value
      const signUpPassword = document.getElementById("signupPassword").value
      const signUpConfirmPassword = document.getElementById("signupConfirPassword").value
      if(signUpPassword == signUpConfirmPassword) {
        axios({
          method: "POST",
          url: "https://dummyjson.com/users/add",
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "firstName": `>${signUpUsername}`,
            "lastName": `>${signUpUsername}`,
            "email": `${signUpEmail}`,
            "username": `${signUpUsername}`,
            "password": `${signUpPassword}`,
          }
        })
        .then(res=>{
          console.log(res.data)
          const userData = res.data
          const newUserId = userData["id"]
          let userPreferences = {
              pageTheme: "light", //default
              logStatus: true,
              userId: newUserId // there are 30 usersId in dummyjson's DB... later I'll change it for something related to the user name or something like that
            }
          localStorage.setItem("userPreferences",JSON.stringify(userPreferences))
        })
        .catch(error => {
          console.log(error)
        })
        //location.replace("http://localhost:5173/")
      }
    })
    document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
        if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
          setInputError(inputElement, "Username must be at least 10 characters in length")
        }
      })
      inputElement.addEventListener("input", e => {
        clearInputError(inputElement)
      })
      const fetchChangeUserData = () => {

      }
  })
  },[])
  userPreferences = {}
  if(localStorage.getItem("userPreferences")) {
    userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
  } else {
    userPreferences = {
      pageTheme: "light", //default
      logStatus: false,
      userId: 0
    }
  }
  return(
    <>
      <span className={userPreferences["pageTheme"]}>
        <div id="fullBody">
          <Logo />
          <div className="logContainer">
              <form className="form" id="login">
                <h1 className="form__title">Login</h1>
                <div className="form__message form__message--error"></div>
                <Inputgroup inputType={"text"} inputId={"loginUsername"} textPlaceholder={"Username or email"} focused={true} />
                <Inputgroup inputType={"password"} inputId={"loginPassword"} textPlaceholder={"Password"} />
                <button type="submit" href="./" className="form__button">Log in</button>
                <TextLink linkTo={"#"} textInsideLink={"Forgot your password?"}/>
                <TextLink linkId={"linkCreateAccount"} textInsideLink={"Don't have an account? Create account."}/>
              </form>
              <form className="form form--hidden" id="createAccount">
                <h1 className="form__title">Create Account</h1>
                <div className="form__message form__message--error"></div>
                <Inputgroup inputType={"text"} inputId={"signupUsername"} textPlaceholder={"Username"} focused={true} />
                <Inputgroup inputType={"text"} inputId={"signupEmail"} textPlaceholder={"Email Address"} />
                <Inputgroup inputType={"password"} inputId={"signupPassword"} textPlaceholder={"Password"} />
                <Inputgroup inputType={"password"} inputId={"signupConfirPassword"} textPlaceholder={"Confirm password"} />
                <button type="submit" href="./" className="form__button">Register</button>
                <TextLink linkId={"linkLogin"} textInsideLink={"Already have an account? Sign in."}/>
              </form>
          </div>
        </div>
      </span>
    </>
  )
}