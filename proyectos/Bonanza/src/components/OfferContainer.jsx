import './OfferContainer.css'
export const OfferContainer = ({offer}) => {
  return(
    <div className="searchOffer-result">
      <div className="productOffer-img">
        <img src={offer.image}></img>
      </div>
      <p className="searchOffer-title">{offer.title}</p>
      <p className="searchOffer-price">{offer.price}</p>
    </div>
  )
}