const SeasonBanner = () => {
  return (
    <div className="text-center p-4 mt-5 ">
    <h1 className="text-xl sm:text-2xl  mb-1">Winter is Coming</h1>
    <p className="text-base sm:text-lg mb-4 text-gray-400">Upgrade your wardrobe with our must-have new launches</p>
    <div className="flex overflow-hidden flex-col sm:flex-row items-center justify-center gap-3 sm:gap-12  mt-6  mx-2 sm:mx-0">
      <img
        src="/winter2.avif"
        alt="Winter Collection Image 1"
        className="sm:w-1/2  max-w-sm sm:max-w-lg object-cover"
      />
      <img
        src="/winter1.avif"
        alt="Winter Collection Image 2"
        className="sm:w-1/2  max-w-sm sm:max-w-lg object-cover"
      />
    </div>
  </div>
  )
}

export default SeasonBanner