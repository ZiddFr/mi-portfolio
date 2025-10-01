import { useEffect, useState } from "react"
import { NavLink} from "react-router-dom"
//css stuff
import "./SearchBar.css"
export const SearchBar = () => {
  const [input,setInput] = useState("")
  const [results,setResults] = useState([])
  const [isFocused,setIsFocused] = useState()
  const gettingProducts = (value) => {
    fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data=>{
      const searchResults = data["products"].filter((product)=>{
        return value && product && product.title && product.title.toLowerCase().includes(value)
      })
      setResults(searchResults)
    })
  }
  const handleChange = (value) => {
    setInput(value)
    gettingProducts(value)
  }

  useEffect(()=>{
    const searchBar = document.getElementById("searchBar")
    searchBar.addEventListener("focus",()=>{
      setIsFocused(true) // muestra NavLinkWrapper y sus nodos hijos
    })
    searchBar.addEventListener("blur",()=>{
      setIsFocused(false) // esconde NavLinkWrapper y sus nodos hijos
    })
    const searchResults = document.getElementById("searchResults")
    searchResults.addEventListener("mousedown",(e)=>{
      e.preventDefault()
      searchBar.focus()
    })
  },[])

  const resetSearchBar = () =>{
    setInput("")
    setResults([])
  }
  return (
    <>
      <div id="searchBar_wrapper">
        <input value={input}
        onChange={e=>{handleChange(e.target.value)}}
        type="search" name="searchBar" id="searchBar" />
        <div id="searchResults">
          {
            results.map((product,id)=>{
              return(
                <div className="NavLinkWrapper" style={{display: isFocused ? "block" : "none"}} key={id}>
                  <NavLink
                    reloadDocument
                    to={`/displayproduct/${product.id}`}
                    onClick={resetSearchBar}
                  >
                    <div className="showingProduct">
                      <p className="titleProduct" style={{fontWeight:"bold"}}>{product.title}</p>
                      <div className="categoryContainer" style={{display:"flex"}}>
                        <p className="pCategory" style={{fontSize:"smaller"}}>Category: <br></br></p> 
                        <p className="categoryProduct" style={{fontSize:"large"}}>
                          {product.category}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}