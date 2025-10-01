import axios from 'axios'
import { useState,useMemo, useEffect, Suspense, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/NavBar.jsx'
import { CategoriesSection } from './components/CategoriesSection.jsx'
import { OffersSection } from './components/OffersSection.jsx'
import { Recomended } from './components/Recomended.jsx'
import { Loader } from './components/Loader.jsx'
import './Root.css'
import './App.css'

function azar() {  
  return Math.random() - 0.5
}
function randomNum(max) {
  return Math.floor(Math.random() * max);
}
const gettingFakeIds = ()=>{
  let ids = []
  for(let i=0;i<6;i++){
    let ranNum = randomNum(194)
    if(!ids.includes(ranNum)){
      ids.push(ranNum)
    } else {
      i--
    }
  }
  return ids
}
let productsIds = gettingFakeIds()
// list of all the available categories dummyjson has
const category = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
]
const randomizer = () => {
  let chosenCategories = []
  chosenCategories = category.sort(azar)
  let randOne = chosenCategories[0]
  let randTwo = chosenCategories[1]
  return [randOne, randTwo]
}
let categories = randomizer()
export function App() {
  // if it's the first time opening the ecommerce page
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
    localStorage.setItem("userPreferences",JSON.stringify(userPreferences))
  } else {
    if (JSON.parse(localStorage.getItem("userPreferences"))){
      userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
    }
    //console.log(userPreferences)
    // let's see if this works c:
  }
  // state: in veremos
//  const [changeTheme,setChangeTheme] = useState(String)
//  const changePageTheme = useCallback(()=>{
//    setChangeTheme(changeTheme)
//  },[changeTheme])
  // useState and a function for pageTheme above - in veremos
  const [userId,setUserId] = useState(Number)
  const [pageTheme,setPageTheme] = useState(String)
  const [logStatus,setLogStatus] = useState(Boolean)
  const [cartItems,setCartItems] = useState(Array)

  useEffect(()=>{
    // is there a logged user?
    if(userPreferences["logStatus"] == true){
      //
      let cookie = document.cookie
      const userToken = cookie.split("=")[1]
      axios({
        method: "GET",
        url: "https://dummyjson.com/auth/me",
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(res=>{
        if(res.status == 200){
          const userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
          setUserId(userPreferences["userId"])
          setPageTheme(userPreferences["pageTheme"])
          setLogStatus(userPreferences["logStatus"])
          console.log(userPreferences["logStatus"])
          setCartItems(userPreferences["cartItems"])
        } else {
          setUserId(0)
          setPageTheme("faddingEmerald")
          setLogStatus(false)
          setCartItems([])
        } 
      })
      .catch(error=>{
        setUserId(0)
        setPageTheme("faddingEmerald")
        setLogStatus(false)
        setCartItems([])
        console.log(error)
      })
      //
    } else {
      if(userPreferences["logStatus"] == false){
        userPreferences = {
          userId: 0,
          pageTheme: "faddingEmerald",
          logStatus: false,
          cartItems: []
        }
        localStorage.setItem("userPreferences",JSON.stringify(userPreferences))
      }
    }
  },[])
  /* useMemo */
  //useState 're-renders' this two components so I had to use useMemo to prevent the 're-rendering'
  const categoriesSection = useMemo(()=>
    <CategoriesSection cartItems={cartItems} productsIds={productsIds} categories={categories} logStatus={logStatus} />,[]
  )
  const recomended = useMemo(()=>
    <Recomended cartItems={cartItems} productsIds={productsIds} logStatus={logStatus} />,[]
  )
  return (
    <div id="app" className={pageTheme}>
      <Loader pageTheme={pageTheme}/>
      <div id="main">
        <Outlet />
        <NavBar logStatus={logStatus} pageTheme={pageTheme} userId={userId} />
        <OffersSection productsIds={productsIds} pageTheme={pageTheme}/>
        {recomended}
        {categoriesSection}
        <section className="politics">Hello, no politics</section>        
      </div>
    </div>
  )
}