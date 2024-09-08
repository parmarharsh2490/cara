import Transaction from "./Transaction";

const PaymentWallet = () => {
  return (
    <div className='w-full mx-auto sm:p-6 bg-white shadow-lg rounded-lg'>
      <div className='payment-box flex flex-col sm:flex-row items-center justify-between p-4'>
        <div className='flex flex-col sm:ml-5 mb-4 sm:mb-0'>
          <div className='flex sm:flex-row sm:gap-10 gap-3 items-center justify-center'>
            <h1 className='sm:text-2xl text-lg font-semibold'>Your Current Balance:</h1>
            <p className='text-blue-800 sm:text-3xl text-lg font-bold'>4000</p>
          </div>
          <span className='sm:text-lg text-sm text-slate-600 mt-3'>
            Processing: <p className='text-blue-500 inline'>1000</p>
          </span>
        </div>
        <div className='flex sm:mr-10'>
          <button className='p-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600'>
            Withdraw
          </button>
        </div>
      </div>
   <Transaction/>
    </div>
  );
};

export default PaymentWallet;
