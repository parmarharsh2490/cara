import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./globals.css";
import Home from "./root/page/Home.tsx";

import Loader from "./utils/Loader.tsx";
import OrdersSkeleton from "./utils/skeleton/OrdersSkeleton.tsx";
import AddressSkeleton from "./utils/skeleton/AddressSkeleton.tsx";
import ProductSkeleton from "./utils/skeleton/ProductSkeleton.tsx";
import SettingSkeleton from "./utils/skeleton/SettingSkeleton.tsx";
import WishlistSkeleton from "./utils/skeleton/WishlistSkeleton.tsx";
import AnalyticsSkeleton from "./utils/skeleton/AnalyticsSkeleton.tsx";
import DashboardSkeleton from "./utils/skeleton/DashboardSkeleton.tsx";
import SellerOrdersSkeleton from "./utils/skeleton/SellerOrdersSkeleton.tsx";
import ShoppingCartSkeleton from "./utils/skeleton/ShoppingCartSkeleton.tsx";
import SellerProductsSkeleton from "./utils/skeleton/SellerProductsSkeleton.tsx";

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
    <Routes>
      <Route index element={<Home />} />
      
      <Route element={<Suspense fallback={<Loader />}><AuthLayout /></Suspense>}>
        <Route
          path="/auth/sign-in"
          element={<Suspense fallback={<Loader />}><SignIn /></Suspense>}
        />
        <Route
          path="/auth/sign-up"
          element={<Suspense fallback={<Loader />}><Signup /></Suspense>}
        />
      </Route>
      

      <Route element={<Suspense fallback={<Loader />}><ProfileComponent /></Suspense>}>
        <Route
          path="/profile"
          element={<Suspense fallback={<Loader />}><Profile /></Suspense>}
        />
        <Route
          path="/wishlist"
          element={<Suspense fallback={<WishlistSkeleton />}><Wishlist /></Suspense>}
        />
        <Route
          path="/address"
          element={<Suspense fallback={<AddressSkeleton />}><Address /></Suspense>}
        />
        <Route
          path="/orders"
          element={<Suspense fallback={<OrdersSkeleton />}><Orders /></Suspense>}
        />
      </Route>

      <Route
        path="/admin"
        element={<Suspense fallback={<Loader />}><SellerPage /></Suspense>}
      >
        <Route
          path="dashboard"
          element={<Suspense fallback={<DashboardSkeleton />}><Dashboard /></Suspense>}
        />
        <Route
          path="setting"
          element={<Suspense fallback={<SettingSkeleton />}><Setting /></Suspense>}
        />
        <Route
          path="add-product"
          element={<Suspense fallback={<Loader />}><AddProduct /></Suspense>}
        />
        <Route
          path="update-product/:productId"
          element={<Suspense fallback={<ProductSkeleton />}><UpdateProduct /></Suspense>}
        />
        <Route
          path="orders"
          element={<Suspense fallback={<SellerOrdersSkeleton />}><SellerOrders /></Suspense>}
        />
        <Route
          path="payment-wallet"
          element={<Suspense fallback={<Loader />}><PaymentWallet /></Suspense>}
        />
        <Route
          path="products"
          element={<Suspense fallback={<SellerProductsSkeleton />}><SellerProducts /></Suspense>}
        />
        <Route
          path="analytics"
          element={<Suspense fallback={<AnalyticsSkeleton />}><Analytics /></Suspense>}
        />
      </Route>

      <Route path="/blog" element={<Suspense fallback={<Loader />}><Blog /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<Loader />}><About /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<Loader />}><Contact /></Suspense>} />
      <Route
        path="/checkout/cart"
        element={<Suspense fallback={<ShoppingCartSkeleton />}><ShoppingCart /></Suspense>}
      />
      <Route
        path="/product/:productId"
        element={<Suspense fallback={<ProductSkeleton />}><ProductDetails /></Suspense>}
      />
      <Route path="/shopping/:category" element={<Suspense fallback={<Loader />}><Category /></Suspense>} />
    </Routes>
  );
};

export default App;
