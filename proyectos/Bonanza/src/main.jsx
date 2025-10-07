import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'

// pages
import { DisplayProduct } from "./components/DisplayProduct.jsx"
import { UserProfile } from "./components/UserProfile.jsx"
import { ShoppingCart } from "./components/ShoppingCart.jsx"
import { Loginregisterform } from './components/Loginregisterform.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:"/displayproduct/:productId",
    element: <DisplayProduct />
  },
  {
    path:"/userprofile/:userToken",
    element: <UserProfile />
  },
  {
    path:"/shoppingcart/:userId",
    element: <ShoppingCart />
  },
  {
    path:"/loginregisterform",
    element:<Loginregisterform />
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RouterProvider router={router} />
)