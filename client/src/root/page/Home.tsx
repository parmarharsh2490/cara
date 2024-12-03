// Home.tsx
import React, { Suspense } from "react";
import Navigation from "../../components/shared/Navigation";
import ImageSlider from "@/components/shared/ImageSlider";
import SeasonBanner from "@/components/shared/SeasonBanner";
import Meta from "@/utils/Meta";

// Lazy load all other components
const ExploreCategory = React.lazy(() => import("../../components/shared/ExploreCategory"));
const PromotionBanner = React.lazy(() => import("../../components/shared/PromotionBanner"));
const Footer = React.lazy(() => import("../../components/shared/Footer"));
const SeasonProducts = React.lazy(() => import("../page/SeasonProducts"));
const NewArrival = React.lazy(() => import("./NewArrival"));

const Home = () => {
  return (
    <>
    <Meta
      title="Sara-Ecommerce"
      description="Discover premium quality t-shirts, pants, jackets, and more for men, women, and kids at Sara Store. Shop our latest collections and enjoy great discounts on all styles."    
      keywords="Sara, Sara-ecommerce, Sara-Ecommerce, Shopping, t-shirts, pants, jackets, clothing, men, women, kids, fashion, online store, buy clothes online, Sara Store, casual wear, formal wear, stylish clothing"
      />
      {/* Priority content loaded immediately */}
      <Navigation />
      <ImageSlider />
      <SeasonBanner />
      
      {/* Defer loading of non-critical content */}
      <Suspense fallback={<div>Loading more content...</div>}>
        <ExploreCategory />
        <img loading="lazy" src="/payment_promotion.avif" className="mt-20" alt="" />
        <NewArrival />
        <div className="flex flex-col items-center justify-center gap-2 p-5 sm:py-10 sm:px-20">
          <h1 className="text-2xl">Flannel Season</h1>
          <p className="text-gray-700">Shop a shirt + layer in one with this new collection</p>
          <img
            loading="lazy"
            src="/discover-the-magic.avif"
            alt="discover-the-magic"
            className="w-full bg-cover mt-2 sm:h-[500px] h-[220px]"
          />
        </div>
        <SeasonProducts />
        <PromotionBanner />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;