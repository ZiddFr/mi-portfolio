import axios from "axios"
import { useEffect } from "react"
import { NavBar } from './NavBar.jsx'
import { useParams } from "react-router-dom"
import "./DisplayProduct.css"

// Shows the user cart information, 'n' products or none. If it's guest user, shows nothing but a legend.
export const DisplayProduct = () =>{
  const { productId } = useParams()
  const userPreferences = JSON.parse(localStorage.getItem("userPreferences"))
  useEffect(()=>{
    const didntWorkSuchWow = () => {
      const displayingProduct = document.getElementById("displayingProduct")
      const noTitle = document.createElement("H1")
      noTitle.innerText = "Wow such empty. No product here. We're sorry."
      displayingProduct.append(noTitle)
    }
    async function getSingleProduct(){
      try {
        const dummyJsonApi = `https://dummyjson.com/products/${productId}`
        const response = await axios.get(dummyJsonApi)
        const data = response.data
        return data
      } catch (error) {
        console.log(error)
        didntWorkSuchWow()
      }
    }
    const data = getSingleProduct()
    data.then((product)=>{
      const displayingProduct = document.getElementById("displayingProduct")
      if (displayingProduct.hasChildNodes()){
        displayingProduct.removeChild(displayingProduct.firstElementChild)
        document.getElementById("searchBar").value = ""
      }
      const allContent = document.createElement("div")
      allContent.setAttribute("id","allProductContent")

      //img div
      const imagesContainer = document.createElement("div")
      imagesContainer.setAttribute("class","imagesContainer")
      const standByImgs = document.createElement("div")
      standByImgs.setAttribute("class","standByImgs")
      standByImgs.setAttribute("id","standByImgs")
      const showingImg = document.createElement("div")
      showingImg.setAttribute("id","showingImg")
      product["images"].forEach((imgSrc, currentValue)=>{
        const img = document.createElement("img")
        img.setAttribute("src",`${imgSrc}`)
        img.addEventListener("mouseenter",()=>{
          const clonedImg = img.cloneNode(false)
          img.setAttribute("class","activeImg")
          if(showingImg.hasChildNodes()) {
            showingImg.removeChild(showingImg.firstElementChild)
          }
          showingImg.append(clonedImg)
        })
        const clonedImg = img.cloneNode(false)
        if(currentValue == 0) {
          console.log(currentValue)
          showingImg.append(clonedImg)
        }
        img.addEventListener("mouseleave",()=>{
          img.removeAttribute("class","activeImg")
        })
        standByImgs.append(img)
      })
      imagesContainer.append(standByImgs)
      imagesContainer.append(showingImg)

      //info div
      const productInfoContainer = document.createElement("div")
      productInfoContainer.setAttribute("class","productInfoContainer")
      const titleProduct = document.createElement("h1")
      titleProduct.innerText = `${product["title"]}`
      const brandProduct = document.createElement("p")
      if(product["brand"]){
        brandProduct.innerText = `Brand(s): ${product["brand"]}`
      } else {
        brandProduct.innerText = `Brand(s) ----`
      }
      const ratingProduct = document.createElement("p")
      ratingProduct.innerText = `Rate: ${product["rating"]}`
      const categoryProduct = document.createElement("p")
      categoryProduct.innerText = `Category: ${product["category"]}`
      const priceProduct = document.createElement("p")
      priceProduct.innerText = `Price: ${product["price"]}`
      const discountPercentageProduct = document.createElement("p")
      discountPercentageProduct.innerText = `Discount: ${product["discountPercentage"]}`
      const stockProduct = document.createElement("p")
      stockProduct.innerText = `Stock: ${product["stock"]}`
      const tagsProductDiv = document.createElement("div")
      tagsProductDiv.style.display = "flex"
      tagsProductDiv.style.gap = "10px"
  
      product["tags"].forEach((tag)=>{
        const pTag = document.createElement("p")
        pTag.innerText = `${tag}`
        tagsProductDiv.append(pTag)
      })
      const availabilityProduct = document.createElement("p")
      availabilityProduct.innerText = `Available status: ${product["availabilityStatus"]}`
      const minimumOrderQuantityProduct = document.createElement("p")
      minimumOrderQuantityProduct.innerText = `Minimum order quantity: ${product["minimumOrderQuantity"]}`
      productInfoContainer.append(titleProduct)
      productInfoContainer.append(brandProduct)
      productInfoContainer.append(ratingProduct)
      productInfoContainer.append(categoryProduct)
      productInfoContainer.append(priceProduct)
      productInfoContainer.append(discountPercentageProduct)
      productInfoContainer.append(stockProduct)
      productInfoContainer.append(tagsProductDiv)
      productInfoContainer.append(availabilityProduct)
      productInfoContainer.append(minimumOrderQuantityProduct)
  
      //description div
      const descriptionContainer = document.createElement("div")
      descriptionContainer.setAttribute("class","descriptionContainer")
      const descriptionProduct = document.createElement("p")
      descriptionProduct.innerText = `${product["description"]}`
      const dimensionsProduct = document.createElement("p")
      dimensionsProduct.innerText = `Dimensions: `
      const weightProduct = document.createElement("p")
      weightProduct.innerText = `Width: ${product["dimensions"]["width"]}`
      const heightProduct = document.createElement("p")
      heightProduct.innerText = `Height: ${product["dimensions"]["height"]}`
      const warrantyInfoProduct = document.createElement("p")
      warrantyInfoProduct.innerText = `Warranty: ${product["warrantyInformation"]}`
      const shippingInfoProduct = document.createElement("p")
      shippingInfoProduct.innerText = `Shipping: ${product["shippingInformation"]}`
      const returnPolicyProduct = document.createElement("p")
      returnPolicyProduct.innerText = `Return policy: ${product["returnPolicy"]}`
      descriptionContainer.append(descriptionProduct)
      descriptionContainer.append(dimensionsProduct)
      descriptionContainer.append(weightProduct)
      descriptionContainer.append(heightProduct)
      descriptionContainer.append(warrantyInfoProduct)
      descriptionContainer.append(shippingInfoProduct)
      descriptionContainer.append(returnPolicyProduct)
  
      //reviews div
      const reviewsContainer = document.createElement("div")
      reviewsContainer.setAttribute("class","reviewsContainer")
      product["reviews"].forEach((review)=>{
        const reviewDiv = document.createElement("div")
        reviewDiv.setAttribute("class","reviewDiv")
        reviewDiv.style.display = "flex"
        reviewDiv.style.flexDirection = "column"
        const reviewerNameReview = document.createElement("p")
        reviewerNameReview.setAttribute("class","reviewerNameReview")
        reviewerNameReview.innerText = `Username: ${review["reviewerName"]}`
        const ratingReview = document.createElement("p")
        ratingReview.setAttribute("class","ratingReview")
        ratingReview.innerText = `Rate: ${review["rating"]}`
        const dateReview = document.createElement("p")
        dateReview.setAttribute("class","dateReview")
        dateReview.innerText = `Date: ${review["date"]}`
        const commentReview = document.createElement("p")
        commentReview.setAttribute("class","commentReview")
        commentReview.innerText = `${review["comment"]}`
        reviewDiv.append(reviewerNameReview)
        reviewDiv.append(ratingReview)
        reviewDiv.append(dateReview)
        reviewDiv.append(commentReview)
        reviewsContainer.append(reviewDiv)
      })
      allContent.append(imagesContainer)
      allContent.append(productInfoContainer)
      allContent.append(descriptionContainer)
      allContent.append(reviewsContainer)
      displayingProduct.append(allContent)
    })
  },[])
  return(
    <>
      <span className={`${userPreferences["pageTheme"]}`}>
      <NavBar logStatus={userPreferences["logStatus"]}/>
      <div id="displayingProduct"></div>
      </span>
    </>
  )
}