
const PromotionBanner = () => {
  return (
    <div className='py-10 text-center px-3 gap-3 sm:gap-0  items-center flex flex-col md:flex-row justify-around bg-gradient-to-r from-purple-700 via-red-500 to-yellow-300 text-white'>
        <div className="flex flex-col sm:mb-3 md:m-0">
            <h1 className="font-bold text-xl sm:text-2xl">Signup For Newsletter</h1>
            <p className="sm:text-lg text-base">Get e-mail updates about our latest shop and <span className="text-yellow-500"> special offer. </span> </p>
        </div>
        <div className="flex w-auto gap-2">
            <input type="email" className="outline-none text-black rounded-md py-2 px-2 md:py-3 md:px-5" placeholder='Your Email Address'/>
            <button className="border rounded-lg border-white p-3 font-thin">Sign Up</button>
        </div>
    </div>
  )
}

export default PromotionBanner