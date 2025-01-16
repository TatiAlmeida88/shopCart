import './App.css'
import './pages/Login'
import Login from './pages/Login'
import Products from './pages/Products'
import Details from './pages/Details'
import NotFound from './pages/NotFound'
import CheckOut from './pages/CheckOut'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/products/:id' element={ <Details /> } />
        <Route path='/checkout' element={ <CheckOut /> } />
        <Route path='/*' element={ <NotFound /> } />
      </Routes>
      
    </>
  )
}

export default App
