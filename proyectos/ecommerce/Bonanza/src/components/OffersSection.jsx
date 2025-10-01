import { useEffect,useState } from 'react'
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { CartButton } from './CartButton';
import { GrPrevious } from "react-icons/gr"
import { GrNext } from "react-icons/gr"
import './OffersSection.css'
export const OffersSection = ({productsIds,pageTheme}) => {
  const [productsElements,setProductsElements] = useState([])
  useEffect(()=>{
    const getOffers = async ()=>{
      try {
        const dummyJsonApi = "https://dummyjson.com/products?limit=0"
        const response = await axios.get(dummyJsonApi)
        const data = response.data
        return data
      } catch (error) {
        console.log("Error getting products for display as offers because of: " +error)
      }
    }
    const dataProducts = getOffers()
    dataProducts.then(data =>{
      let productsOnOffer = data["products"].filter((product)=>{
        return productsIds.includes(product["id"])
      })
      let elements = productsOnOffer.map((product)=>{
        const offer = (product["price"] - product["price"]*0.99).toFixed(2)
        return(
          <div key={product["id"]} className="forEachOffer">
            <NavLink
            reloadDocument
            to={`/displayproduct/${product.id}`}
            >
              <img className="productOffer-img" src={product["images"][0]} alt={product["title"]} />
            </NavLink>
            <div className="previewText">
              <NavLink
              reloadDocument
              to={`/displayproduct/${product.id}`}
              >
                <h3 className="preview_offer-title" title={product["title"]}>{product["title"]}</h3>
              </NavLink>
              <p className="descriptionOffer">{product["description"]}</p>
              <h3 className="OfferPrice">{offer}</h3>
              <h3 className="originalPrice">{product["price"]}</h3>
              <CartButton whatCartType={"productCartType"} productId={product["id"]} />
            </div>
          </div>
        )
      })
      setProductsElements(elements)
      let ind = 0
      const offerDivs = document.querySelectorAll(".offerDivs")
      const previousOffer = document.getElementById("previousOffer")
      previousOffer.addEventListener("click",()=>{
        offerDivs[ind].style.display = "none"
        if(ind == 0){
          ind = offerDivs.length
        }
        ind--
        offerDivs[ind].style.display = "flex"
        return ind
      })
      const nextOffer = document.getElementById("nextOffer")
      nextOffer.addEventListener("click",()=>{
        offerDivs[ind].style.display = "none"
        ind++
        if(ind == offerDivs.length){
          ind = 0
        } 
        offerDivs[ind].style.display = "flex"
        return ind
      })        
    })
  },[])
  return (
    <>
      <section id="offers__section__wrapper" className={pageTheme}>
        <div className="preview_offers">
          <button id="previousOffer"><p><GrPrevious /></p></button>
            <div id="forEachOffer-1" className="offerDivs" style={{display:"flex"}}>{productsElements[0]}</div>
            <div id="forEachOffer-2" className="offerDivs" style={{display:"none"}}>{productsElements[1]}</div>
            <div id="forEachOffer-3" className="offerDivs" style={{display:"none"}}>{productsElements[2]}</div>
            <div id="forEachOffer-4" className="offerDivs" style={{display:"none"}}>{productsElements[3]}</div>
            <div id="forEachOffer-5" className="offerDivs" style={{display:"none"}}>{productsElements[4]}</div>
            <div id="forEachOffer-6" className="offerDivs" style={{display:"none"}}>{productsElements[5]}</div>
          <button id="nextOffer"><p><GrNext /></p></button>
        </div>
      </section>
    </>
  )
}
// #mydiv-$*3     ->creará 3 divs: <div id="mydiv-1"></div><div id="mydiv-2"></div><div id="mydiv-3"></div>
//paraiso capital, , The mouts - por que no me dijiste nada, reina de los lagartos - aquel lugar, 

