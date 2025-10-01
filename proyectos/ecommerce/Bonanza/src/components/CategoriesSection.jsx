import { SelectedProdFromCategories } from "./SelectedProdFromCategories";
import "./CategoriesSection.css"

export function CategoriesSection({productsIds,categories,logStatus}){
  return(
    <>
      <SelectedProdFromCategories categories={categories} productsIds={productsIds} logStatus={logStatus}/>
    </>
  )
}