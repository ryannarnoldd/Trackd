import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Home from './pages/Home'
import Profile from './pages/Profile.js'
import SignupForm from './pages/SignupForm.js'
import LoginForm from './pages/LoginForm.js'
// import SavedBooks from './pages/SavedBooks'
import Auth from './utils/auth.js'
// import SignupForm from './components/SignupForm.js'

// Make a function that basically does this..
// Auth.loggedIn() ? <Profile /> : <Navigate to="/login" replace />

function AuthElement( element: JSX.Element ): JSX.Element {
  return Auth.loggedIn() ? element : <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    // use the Auth wrapper to check if the user is logged in. if not, redirect to the login page
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: AuthElement(<Home />)
      }, 
      {
        path: '/profile',
        element: AuthElement(<Profile />)
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
