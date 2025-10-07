import axios from "axios";
import "./ShoppingCart.css"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from './NavBar.jsx'

let userPreferences = {
  userId: Number,
  pageTheme: String,
  logStatus: Boolean,
}
if (localStorage.getItem("userPreferences")) {
  JSON.parse(localStorage.getItem("userPreferences"))
} else {
  userPreferences ={
    userId: 0,
    pageTheme: `light`,
    logStatus: false,
  }
}
export const ShoppingCart = () => {
  const { userId } = useParams()
  const userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
  const logStatus = userPreferences["logStatus"]
  const pageTheme = userPreferences["pageTheme"]
  useEffect(()=>{
    const guestCart = () => {
      const cartSection = document.getElementById("cartSection")
      const guestPrinDiv = document.createElement("div")
      guestPrinDiv.setAttribute("class","guestCartPrin")
      guestPrinDiv.style.display = "flex"
      guestPrinDiv.style.justifyContent = "center"
      const guestTitleCart = document.createElement("h1")
      guestPrinDiv.style.alignSelf = "center"
      guestTitleCart.innerText = "Wow! Such empty."
      guestPrinDiv.append(guestTitleCart)
      cartSection.append(guestPrinDiv)
    }
   
    axios({
      method: "GET",
      url: `https://dummyjson.com/carts/${userId}`,
    })
    .then(res=>{
      const cartData = res.data
      const cartSection = document.getElementById("cartSection")
      // the userId is not related to the user id from the users link. I'll user the index id to link the user with the cart
      //const primaryDiv = document.createElement("div")
      //primaryDiv.setAttribute("class","primaryDiv")
      for(let i=0; i<cartData["products"].length;i++){
        const secondaryDiv = document.createElement("div")
        secondaryDiv.setAttribute("class","secondaryDiv")
        const tertiaryDiv = document.createElement("div")
        tertiaryDiv.setAttribute("class","terciaryDiv")
        const allTextDiv = document.createElement("div")
        allTextDiv.setAttribute("class","allTextDiv")
        const thumbnail = document.createElement("img")
        thumbnail.setAttribute("class","thumbnailProduct")
        thumbnail.setAttribute("src",`${cartData["products"][i]["thumbnail"]}`)
        const title = document.createElement("h3")
        title.innerText = `${cartData["products"][i]["title"]}`
        const originalPrice = document.createElement("p")
        originalPrice.innerText = `Price: $${cartData["products"][i]["price"]}`
        originalPrice.style.color = "gray"
        originalPrice.style.textDecoration = "line-through"
        const quantity = document.createElement("p")
        quantity.innerText = `Quantity: ${cartData["products"][i]["quantity"]} products.`
        const discountPercentage = document.createElement("p")
        discountPercentage.innerText = `Discount: ${cartData["products"][i]["discountPercentage"]}%`
        const total = document.createElement("p")
        total.innerText = `Total for this product: $${cartData["products"][i]["total"]}`
        total.style.color = "gray"
        total.style.textDecoration = "line-through"
        const discountedTotal = document.createElement("p")
        discountedTotal.innerText = `Total (discount applied): $${cartData["products"][i]["discountedTotal"]}`   
        secondaryDiv.append(thumbnail)
        allTextDiv.append(title)
        allTextDiv.append(originalPrice)
        tertiaryDiv.append(quantity)
        tertiaryDiv.append(discountPercentage)
        allTextDiv.append(tertiaryDiv)
        allTextDiv.append(total)
        allTextDiv.append(discountedTotal)
        secondaryDiv.append(allTextDiv)
        cartSection.append(secondaryDiv)
      }
      //cartSection.append(primaryDiv)
      const anotherTextDiv = document.createElement("div")
      anotherTextDiv.setAttribute("class","anotherTextDiv")
      const totalProducts = document.createElement("p")
      totalProducts.innerText = `Total products: ${cartData["totalProducts"]} products.`
      const totalQuantity = document.createElement("p")
      totalQuantity.innerText = `Total quantity: ${cartData["totalQuantity"]} products in total.`
      const totalSum = document.createElement("p")
      totalSum.innerText = `Total: $${cartData["total"]}`
      totalSum.style.color = "gray"
      totalSum.style.textDecoration = "line-through"
      const discountedTotalSum = document.createElement("p")
      discountedTotalSum.innerText = `Total (discount applied): $${cartData["discountedTotal"]}`
      anotherTextDiv.append(totalProducts)
      anotherTextDiv.append(totalQuantity)
      anotherTextDiv.append(totalSum)
      anotherTextDiv.append(discountedTotalSum)
      cartSection.append(anotherTextDiv)
    })
    .catch(error=>{
      console.log(error)
      guestCart()
    })
  },[])
  return(
    <>
      <span className={`${userPreferences["pageTheme"]}`}>
        <NavBar logStatus={logStatus} pageTheme={pageTheme} />
        <section id="cartSection" className="cartSection" >
        </section>
      </span>
    </>
  )
}