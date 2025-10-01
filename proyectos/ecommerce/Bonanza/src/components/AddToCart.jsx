import axios from 'axios'
import { useState,useEffect } from 'react'
import { BsCart, BsCartPlus, BsCartPlusFill, BsCartDash, BsCartDashFill, BsCartCheckFill, BsCartXFill } from 'react-icons/bs'

export function AddToCart(){
  const [totalProducts,setTotalProducts] = useState()
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
    const userCartId = userPreferences["userCartId"]
    const getCartInfo = async ()=>{
      try {
        const dummyJsonApi = `https://dummyjson.com/cart/${userCartId}`
        const response = await axios.get(dummyJsonApi)
        const data = response.data
        return data
      } catch (error) {
        console.log("Failed to get products with error: " + error)
      }
    }

    const userCartInfo = getCartInfo()
    userCartInfo.then(res=>{
      const cart = res.data
      console.log(cart)
      setProducts(cart["products"])
      setTotalProducts(cart["totalProducts"])
    })
  },[])

  const callingStatus = () => {
    console.log(products)
    console.log(totalProducts)
  }
  return(
    <>
      <button className="addToCart"
      onClick={callingStatus}
      >
        <BsCart />
      </button>
    </>
  )
}