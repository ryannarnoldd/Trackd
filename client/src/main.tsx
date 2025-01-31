import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home'
import Profile from './pages/Profile.js'
import SignupForm from './components/SignupForm.js'
// import SavedBooks from './pages/SavedBooks'
// import Auth from './utils/auth.js'
// import SignupForm from './components/SignupForm.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/signup',
        element: <SignupForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
