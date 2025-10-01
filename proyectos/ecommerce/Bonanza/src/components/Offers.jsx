import React from "react";
import { OfferContainer } from './OfferContainer.jsx'
export const Offers = ({offers}) => {
  return(
    <>
      <div className="results-offers">
        {
          offers.map((offer,id)=>{
            return <OfferContainer offer={offer} key={id}/>
          })
        }
      </div>
    </>
  )
}