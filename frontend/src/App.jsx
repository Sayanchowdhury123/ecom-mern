
import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Route,Routes } from 'react-router';
import Homepage from './pages/homepage';
import Cartpage from './pages/cartpage';
import Detailspage from './pages/detailspage';
import Loginpage from './pages/loginpage';
import Registerpage from './pages/registerpage';
import Adminpage from './pages/adminpage';
import { useAuth } from './context/authcontext';
import Adminproduct from './components/adminproduct';
import Addproduct from './components/addproduct';
import Editproduct from './components/editproduct';
import Fav from './components/favourites';
import Orderpage from './components/orderpage';
import Checkout from './components/checkout';
import Confirmation from './components/confirmation';
import Search from './components/search';
import {Toaster} from "react-hot-toast";


function App() {
const {user} = useAuth();

  return (
  <>




<Router>
  <Toaster/>
  <Navbar/>
  <Routes>
    <Route path='/' element={user ? <Homepage/> : <Loginpage/>} />
    <Route path='/cart' element={<Cartpage/>} />
    <Route path='/products/:id' element={<Detailspage/>} />
    <Route path='/login' element={<Loginpage/>} />
    <Route path='/register' element={<Registerpage/>} />
    <Route path='/admin' element={ user.isadmin ? <Adminpage/> : <Homepage/>} />
    <Route path='/admin/products' element={<Adminproduct/>} />
    <Route path='/admin/addproduct' element={<Addproduct/>}/>
    <Route path='/addproduct' element={<Addproduct/>} />
    <Route path='/editproduct/:id' element={<Editproduct/>} />
    <Route path='/wishlist' element={<Fav/>} />
    <Route path='/orders' element={ user ? <Orderpage/> : <Loginpage/>} />
    <Route path='/checkout' element={<Checkout/>}  />
    <Route path='/order-confirmation/:id' element={<Confirmation/>} />
    <Route  path='/search' element={<Search/>} />
  </Routes>
</Router>




  </>
   
  
  )
}

export default App
