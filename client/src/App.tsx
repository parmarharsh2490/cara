import SignIn from "./_auth/form/Signin.tsx";
import AuthLayout from "./_auth/authLayout.tsx";
import "./globals.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./_auth/form/Signup.tsx";
import Home from "./root/page/Home.tsx";
import Blog from "./root/page/Blog.tsx";
import About from "./root/page/About.tsx";
import Category from "./root/page/Category.tsx";
import Contact from "./root/page/Contact.tsx";
import ProfileComponent from "./root/page/ProfilePage.tsx";
import Profile from "./root/page/Profile.tsx";
import Wishlist from "./components/shared/Wishlist.tsx";
import Address from "./components/shared/Address.tsx";
import Orders from "./components/shared/Orders.tsx";
import ProductDetails from "./root/page/ProductDetails.tsx";
import ShoppingCart from "./root/page/ShoppingCart.tsx";
import SellerPage from "./root/page/SellerPage.tsx";
import Dashboard from "./root/page/admin/Dashboard.tsx";
import AddProduct from "./root/page/admin/AddProduct.tsx";
import Analytics from "./root/page/admin/Analytics.tsx";
import PaymentWallet from "./root/page/admin/PaymentWallet.tsx";
import Setting from "./root/page/admin/Setting.tsx";
import UpdateProduct from "./root/page/admin/UpdateProduct.tsx";
import SellerOrders from "./root/page/admin/SellerOrders.tsx";
import SellerProducts from "./root/page/admin/SellerProducts.tsx";

const App = () => {
  return (
    <>
       <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<Signup />} />
        </Route> 
        
        <Route element={<ProfileComponent />}>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/address" element={<Address />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        
        <Route element={<SellerPage />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/update-product/:productId" element={<UpdateProduct/>} />
          <Route path="/admin/orders" element={<SellerOrders />} />
          <Route path="/payment-wallet" element={<PaymentWallet />} />
          <Route path="/admin-products" element={<SellerProducts />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        
        <Route path="/seller" element={<SellerPage />} />
          <Route index element={<Home />} />  
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />  
        <Route path="/checkout/cart" element={<ShoppingCart />} />  
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/shopping/:category" element={<Category />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Blog />} />
      </Routes>
    </>
  );
};

export default App;
