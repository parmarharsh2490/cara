const ProductSkeleton = () => {
    return (
      <div className='h-full'>
      <section id="prodetails" className="p-5 sm:px-10 flex flex-col sm:flex-row w-full  items-center h-[70%]">
          <div className='h-full w-full sm:w-[35%] flex justify-center items-center sm:gap-2 flex-col-reverse sm:flex-row '>
              <div className='flex gap-1 justify-center items-center flex-row sm:flex-col w-full sm:w-[20%] mt-1'>
                  <div className='w-[24%] sm:w-full bg-slate-200 animate-pulse h-[5.7rem] ' />
                  <div className='h-[5.7rem] w-[24%] bg-slate-200 animate-pulse sm:w-full' />
                  <div className='h-[5.7rem] w-[24%] bg-slate-200 animate-pulse sm:w-full' />
                  <div className='h-[5.7rem] bg-slate-200 animate-pulse w-[24%] sm:w-full  ' />
              </div>
              <div className='w-full h-[350px]  sm:w-80 sm:h-[420px] bg-slate-200 animate-pulse'></div>
          </div>
          <div className=" w-full sm:w-[65%] mt-7 sm:px-12 pt-30">
              <h6 className="text-xl font-semibold my-2 h-5 w-28 bg-slate-200 animate-pulse rounded-md"></h6>
              <h4 className="text-3xl my-2  h-7 w-40 bg-slate-200 animate-pulse rounded-md"></h4>
              <h2 className="text-2xl my-2  h-7 w-24 bg-slate-200 animate-pulse rounded-md"></h2>
              <div className="block py-2 px-4 mb-4 border border-gray-300 focus:outline-none  h-7 w-32 bg-slate-200 animate-pulse rounded-md">
              </div>
              <div className="focus:outline-none w-14 border border-1 mr-3 p-2  h-5 bg-slate-200 animate-pulse rounded-md inline-block" />
              <button className=' sm:w-1/4 p-2  hover:bg-slate-600  duration-500  
    h-10 w-44 bg-slate-200 animate-pulse rounded-md
  '></button>
              <h4 className="text-2xl py-4  h-7 w-32 bg-slate-200 animate-pulse rounded-md my-3"></h4>
              <div className="min-h-[100px] max-w-[400px] bg-slate-200 animate-pulse rounded-md"></div>
          </div>
      </section>
  </div>
    );
  };

export default ProductSkeleton