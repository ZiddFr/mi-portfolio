import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { CartButton } from "./CartButton";
import "./SelectedProdFromCategories.css"
import axios from "axios"
export function SelectedProdFromCategories({categories,productsIds}){
  const [productsZero,setProductsZero] = useState([])
  const [productsOne,setProductsOne] = useState([])
  useEffect(()=>{
    productsIds = productsIds.sort(function(a, b){return a-b})
    const getProducts = async ()=>{
      try {
        const dummyJsonApi = "https://dummyjson.com/products?limit=0"
        const response = await axios.get(dummyJsonApi)
        const data = response.data
        return data
      } catch (error) {
        console.log("Failed to get products with error: " + error)
      }  
    }
    const deployProducts = (productsRandomized)=> {
      const selectedProducts = []
      let category = productsRandomized
      const dataProducts = getProducts()
      dataProducts.then(data =>{
        for(let i=0;i<data["products"].length;i++){
          if(data["products"][i]["category"] == productsRandomized){
            selectedProducts.push(data["products"][i])
          }
        }
        let productsInOffer = selectedProducts.filter((product)=>{
          return productsIds.includes(product["id"])
        })
        let normalProducts = selectedProducts.filter((product)=>{
          return !productsIds.includes(product["id"])
        })
        let allProducts = normalProducts.concat(productsInOffer)
        if(category == categories[0]){
          setProductsZero(allProducts)
        }
        if(category == categories[1]){
          setProductsOne(allProducts)
        }
      })
    }
    deployProducts(categories[0])
    deployProducts(categories[1])
  },[])
  return(
    <>
      <section className="categories_container">
        <div className="productsPreview">
          <div>
            <h2>{categories[0]}</h2>
            <div className="productsContainer" style={{display:"flex",flexDirection:"row",alignContent:"space-between",overflowX:"scroll",marginBottom:"3rem"}}>
              {
                productsZero.map((product,index)=>{
                  let priceOfProduct = product["price"]
                  const offerPrice = (priceOfProduct - (priceOfProduct*0.99)).toFixed(2)
                  if(index<3){
                    return(
                      <div key={product["id"]} className="singleProductPreview">
                        <NavLink
                          reloadDocument
                          to={`/displayproduct/${product.id}`}
                        >
                          <img src={product["images"][0]} alt={product["title"]} className="productImg" />
                        </NavLink>
                          <div className="onlyTextDiv" style={{display:"flex",flexDirection:"column",marginTop: "17.333px"}}>
                            <NavLink
                            reloadDocument
                            to={`/displayproduct/${product.id}`}
                            >
                              <h3>{product["title"]}</h3>
                            </NavLink>
                            <p>{"$"+product["price"]}</p>
                          </div>
                        <CartButton productId={product["id"]} whatCartType={"productCartType"} />
                      </div>                      
                    )
                  }
                  if(index > 2 && index < 6){
                    return(
                      <div key={product["id"]} className="singleProductPreview">
                        <p className="bannerOffer">{"OFFER"}</p>
                        <NavLink
                          reloadDocument
                          to={`/displayproduct/${product.id}`}
                        >
                          <img src={product["images"][0]} alt={product["title"]} className="productImg" />
                        </NavLink>
                        <div className="onlyTextDiv" style={{display:"flex",flexDirection:"column"}}>
                          <p style={{color:"red",fontSize:"smaller",width:"fit-content",height:"fit-content",fontWeight:"bolder"}}>{"99%"}</p>
                          <NavLink
                          reloadDocument
                          to={`/displayproduct/${product.id}`}
                          >
                            <h3>{product["title"]}</h3>
                          </NavLink>  
                          <div style={{display:"flex", flexDirection:"row"}}>
                            <p style={{color:"green",fontSize:"x-large"}}>{"$"+offerPrice}</p>
                            <p style={{color:"gray",textDecoration:"line-through"}}>{"$"+product["price"]}</p>
                          </div>
                        </div>
                        <CartButton productId={product["id"]} whatCartType={"productCartType"} />
                      </div>        
                    )
                  }
                })
              }
            </div>
          </div>
          <div>
              <h2>{categories[1]}</h2>
              <div className="productsContainer" style={{display:"flex",flexDirection:"row",alignContent:"space-between",overflowX:"scroll",marginBottom:"3rem"}}>
                {
                  productsOne.map((product,index)=>{
                    let priceOfProduct = product["price"]
                    const offerPrice = (priceOfProduct - (priceOfProduct*0.99)).toFixed(2)
                    if(index<3){
                      return(
                        <div key={product["id"]} className="singleProductPreview">
                          <NavLink
                            reloadDocument
                            to={`/displayproduct/${product.id}`}
                          >
                            <img src={product["images"][0]} alt={product["title"]} className="productImg" />
                          </NavLink> 
                          <div className="onlyTextDiv" style={{display:"flex",flexDirection:"column"}}>
                            <NavLink
                            reloadDocument
                            to={`/displayproduct/${product.id}`}
                            >
                              <h3>{product["title"]}</h3>
                            </NavLink>
                            <p>{"$"+product["price"]}</p>
                          </div>
                          <CartButton productId={product["id"]} whatCartType={"productCartType"} />
                        </div>
                      )
                    }
                    if(index > 2 && index < 6){
                      return(
                        <div key={product["id"]} className="singleProductPreview">
                          <p className="bannerOffer">{"OFFER"}</p>
                          <NavLink
                            reloadDocument
                            to={`/displayproduct/${product.id}`}
                          >
                            <img src={product["images"][0]} alt={product["title"]} className="productImg" />
                          </NavLink>
                          <div className="onlyTextDiv" style={{display:"flex",flexDirection:"column"}}>
                            <p style={{color:"red",fontSize:"smaller",width:"fit-content",height:"fit-content",fontWeight:"bolder"}}>{"99%"}</p>
                            <NavLink
                            reloadDocument
                            to={`/displayproduct/${product.id}`}
                            >
                            <h3>{product["title"]}</h3>
                            </NavLink>
                            <div style={{display:"flex", flexDirection:"row"}}>
                              <p style={{color:"green",fontSize:"x-large"}}>{"$"+offerPrice}</p>
                              <p style={{color:"gray",textDecoration:"line-through"}}>{"$"+product["price"]}</p>
                            </div>
                          </div>
                          <CartButton productId={product["id"]} whatCartType={"productCartType"} />
                        </div>        
                      )
                    }
                  })
                }                      
              </div>
            </div>
        </div>
      </section>
    </>
  )
}