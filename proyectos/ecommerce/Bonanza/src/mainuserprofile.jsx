import ReactDOM from 'react-dom/client'
import { UserProfile } from './components/UserProfile'
const logRegisterRoot = ReactDOM.createRoot(document.getElementById('userProfileRoot'))
logRegisterRoot.render(
  <UserProfile />
)