import ReactDOM from 'react-dom/client'
import { ShoppingCart } from './components/ShoppingCart'
const logRegisterRoot = ReactDOM.createRoot(document.getElementById('shoppingCartRoot'))
logRegisterRoot.render(
  <ShoppingCart />
)