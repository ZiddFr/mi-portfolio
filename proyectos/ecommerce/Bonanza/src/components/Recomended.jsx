import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { CartButton } from "./CartButton";
import "./Recomended.css"

export function Recomended({productsIds,logStatus}){
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    productsIds = productsIds.sort(function(a, b){return a-b})
    const getProducts= async ()=>{
      try {
        const dummyJsonApi = "https://dummyjson.com/products?limit=0"
        const response = await axios.get(dummyJsonApi)
        const data = response.data
        return data
      } catch (error) {
        console.log("Failed to get products with error: " + error)
      }  
    }
    const dataProducts = getProducts()
    let recomended = []
    dataProducts.then(data=>{
      for(let i=0;i<data["products"].length;i++){
        if(data["products"][i]["rating"] > 3.2){
          recomended.push(data["products"][i])
        }
      }
      const recomendedProducts = document.createElement("div")
      recomendedProducts.setAttribute("class","recomendedProducts")
      const titleForRecSec = document.createElement("h1")
      titleForRecSec.innerText = "Products you may like:"
      recomendedProducts.append(titleForRecSec)
      let productsInOffer = recomended.filter((product)=>{
        return productsIds.includes(product["id"])
      })
      let normalProducts = recomended.filter((product)=>{
        return !productsIds.includes(product["id"])
      })
      let toShowProducts = []
      if(productsInOffer.length == 0){
        normalProducts.sort(() => Math.random() - 0.5)
        toShowProducts = normalProducts.slice(0,9)
      } else {
        normalProducts.sort(() => Math.random() - 0.5)
        productsInOffer.sort(() => Math.random() - 0.5)
        toShowProducts = normalProducts.slice(0,9).concat(productsInOffer.slice(0,3))
      }
      setProducts(toShowProducts)
    })
  },[])
  return(
    <>
      <section className="recomended_products">
        <div className="productsPreview">
          <h2>Products you may like:</h2>
          <div className="productsContainer" style={{display:"flex",flexDirection:"row",alignContent:"space-between",overflowX:"scroll",marginBottom:"3rem"}}>
            {
              products.map((product,index)=>{ 
                let priceOfProduct = product["price"]
                const offerPrice = (priceOfProduct - (priceOfProduct*0.99)).toFixed(2)
                if(index<9){
                  return(
                    <div key={product["id"]} className="singleProductPreview">
                      <NavLink
                        reloadDocument
                        to={`/displayproduct/${product.id}`}
                      >                      
                        <img className="productImg" src={product["images"][0]} alt={product["title"]}></img>
                      </NavLink>
                      <div className="onlyTextDiv" style={{display:"flex", flexDirection:"column",marginTop: "17.333px"}}>
                        <NavLink
                        reloadDocument
                        to={`/displayproduct/${product.id}`}
                        >
                          <h3>{product["title"]}</h3>
                        </NavLink>
                        <p>{"$"+priceOfProduct}</p>
                      </div>
                      <CartButton productId={product["id"]} whatCartType={"productCartType"} />
                    </div>
                  )
                } else {
                  if(index >= 9 && index < 12) {
                    return(
                      <div key={product["id"]} className="singleProductPreview">
                        <p className="bannerOffer">{"OFFER"}</p>
                        <NavLink
                          reloadDocument
                          to={`/displayproduct/${product.id}`}
                        >
                          <img className="productImg" src={product["images"][0]} alt={product["title"]} />
                        </NavLink>
                        <div className="onlyTextDiv" style={{display:"flex",flexDirection:"column"}}>
                          <p style={{color:"red",width:"fit-content",height:"fit-content",fontWeight:"bold"}}>{"99%"}</p>
                          <NavLink
                          reloadDocument
                          to={`/displayproduct/${product.id}`}
                          >
                            <h3>{product["title"]}</h3>
                          </NavLink>
                          <div style={{display:"flex",flexDirection:"row"}}>
                            <p style={{color:"green", fontSize:"x-large"}}>{"$"+offerPrice}</p>
                            <p style={{color:"gray",textDecoration:"line-through",fontSize:"smaller"}}>{"$"+priceOfProduct}</p>
                          </div>
                        </div>
                        <CartButton productId={product["id"]} whatCartType={"productCartType"} />
                      </div>
                    )
                  }
                }
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}