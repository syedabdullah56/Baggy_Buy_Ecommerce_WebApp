import './App.css';
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import LoginSignUp from './components/User/LoginSignUp.jsx';
import Profile from './components/User/Profile.jsx';
import store from './store';
import { loadUser } from './actions/userAction.js';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import UserOptions from './components/layout/Header/UserOptions.jsx';
import ProtectedRoute from './components/Route/ProtectedRoute.jsx';
import UpdateProfile from './components/User/UpdateProfile.jsx';
import UpdatePassword from './components/User/UpdatePassword.jsx';
import ForgotPassword from './components/User/ForgotPassword.jsx'
import ResetPassword from './components/User/ResetPassword.jsx'
import Cart from './components/Cart/Cart.jsx';
import Shipping from './components/Cart/Shipping.jsx';
import ConfirmOrder from './components/Cart/ConfirmOrder.jsx'
import Payment from './components/Cart/Payment.jsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());     
    getStripeApiKey();
  }, []);


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {/* Wrap Routes with Elements outside */}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/process/payment" element={<Payment />} />
            </Route>
          </Routes>
        </Elements>
      )}

      <FooterConditionally />
    </Router>
  );
}

function FooterConditionally() {
  const location = useLocation();
  return location.pathname === "/" ? <Footer /> : <Footer />;
}

export default App;
