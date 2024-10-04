
import Navigation from '../../components/shared/Navigation'
import ImageSlider from '../../components/shared/ImageSlider'
import SeasonBanner from '../../components/shared/SeasonBanner'
import ExploreCategory from '../../components/shared/ExploreCategory'
import PromotionBanner from '../../components/shared/PromotionBanner'
import Footer from '../../components/shared/Footer'
import SeasonProducts from './SeasonProducts'
import NewArrival from './NewArrival'

const Home = () => {
  return (
    <>
        <Navigation/>
        {/* <ImageSlider/> 
        <SeasonBanner/>
        <ExploreCategory/> */}
        {/* <img src="/payment_promotion.avif" className='mt-20' alt="" /> */}
        {/* <NewArrival/> */}
       {/* <div className='flex flex-col items-center justify-center gap-2 p-5 sm:py-10 sm:px-20'>
       <h1 className='text-2xl '>Flannel Season</h1>
        <p className='text-gray-400'>Shop a shirt + layer in one with this new collection</p>
        <img src="/discover-the-magic.avif" alt="" className='w-full bg-cover mt-2 sm:h-[500px] h-[220px]'/>
       </div> */}
       <SeasonProducts/>
        <PromotionBanner/>
        <Footer/>
    </>
  )
}

export default Home;
