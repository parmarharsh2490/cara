const AddressSkeleton = () => {
  return (
    <div className='p-5 sm:p-20 w-full '>
    <div className='h-7 w-40 bg-slate-200 rounded-lg animate-pulse'></div>
    <div className='w-full  mt-10 '>
        <div className='flex flex-col sm:flex-row gap-5 sm:gap-20 justify-start items-start'>
          <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
          <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
        </div>
        <div className='flex flex-col sm:flex-row gap-5 sm:gap-20 justify-start items-start mt-7'>
          <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
          <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
        </div>
        <div className='flex flex-col sm:flex-row gap-5 sm:gap-20 justify-start items-start mt-7'>
          <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
          <div className='h-7 w-56 bg-slate-200 rounded-lg animate-pulse'></div>
        </div>
    </div>
    <div className='h-12 w-32 mt-14 bg-slate-200 rounded-lg animate-pulse'></div>
</div>
  )
}

export default AddressSkeleton