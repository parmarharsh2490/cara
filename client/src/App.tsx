import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./globals.css";
import Home from "./root/page/Home.tsx";

import Loader from "./utils/Loader.tsx";

const SignIn = React.lazy(() => import("./_auth/form/Signin.tsx"));
const Signup = React.lazy(() => import("./_auth/form/Signup.tsx"));
const AuthLayout = React.lazy(() => import("./_auth/authLayout.tsx"));
const Blog = React.lazy(() => import("./root/page/Blog.tsx"));
const About = React.lazy(() => import("./root/page/About.tsx"));
const Category = React.lazy(() => import("./root/page/Category.tsx"));
const Contact = React.lazy(() => import("./root/page/Contact.tsx"));
const ProfileComponent = React.lazy(() => import("./root/page/ProfilePage.tsx"));
const Profile = React.lazy(() => import("./root/page/Profile.tsx"));
const Wishlist = React.lazy(() => import("./components/shared/Wishlist.tsx"));
const Address = React.lazy(() => import("./components/shared/Address.tsx"));
const Orders = React.lazy(() => import("./components/shared/Orders.tsx"));
const ProductDetails = React.lazy(() => import("./root/page/ProductDetails.tsx"));
const ShoppingCart = React.lazy(() => import("./root/page/ShoppingCart.tsx"));
const SellerPage = React.lazy(() => import("./root/page/SellerPage.tsx"));
const Dashboard = React.lazy(() => import("./root/page/admin/Dashboard.tsx"));
const AddProduct = React.lazy(() => import("./root/page/admin/AddProduct.tsx"));
const Analytics = React.lazy(() => import("./root/page/admin/Analytics.tsx"));
const PaymentWallet = React.lazy(() => import("./root/page/admin/PaymentWallet.tsx"));
const Setting = React.lazy(() => import("./root/page/admin/Setting.tsx"));
const UpdateProduct = React.lazy(() => import("./root/page/admin/UpdateProduct.tsx"));
const SellerOrders = React.lazy(() => import("./root/page/admin/SellerOrders.tsx"));
const SellerProducts = React.lazy(() => import("./root/page/admin/SellerProducts.tsx"));

const App = () => {
  return (
    <>
    <Routes>
      <Route>
      <Route index element={<Home />} />
      </Route>
    </Routes>
    <Suspense fallback={<Loader />}>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<Signup />} />
        </Route>

        <Route element={<ProfileComponent />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/address" element={<Address />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route path="/admin" element={<SellerPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="setting" element={<Setting />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product/:productId" element={<UpdateProduct />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="payment-wallet" element={<PaymentWallet />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout/cart" element={<ShoppingCart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/shopping/:category" element={<Category />} />

      </Routes>
    </Suspense>
    </>
  );
};

export default App;
