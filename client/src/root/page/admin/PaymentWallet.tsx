import { useGetPaymentWalletDetails, useWithdrawAmount } from "@/query/paymentwallet.queries";
import Transaction from "./Transaction";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "@/utils/Spinner";
import { allTransactions } from "@/utils/allTransactions";
import Meta from "@/utils/Meta";

const PaymentWallet = () => {
  const {
    data: paymentWallet,
    isLoading,
    hasNextPage,
    fetchNextPage,
    error: fetchError,
    isFetchingNextPage
  } = useGetPaymentWalletDetails();
  
  const { mutateAsync: withdrawAmount } = useWithdrawAmount();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="h-full w-full flex items-center justify-center"><Spinner/></div>
  }

  const walletData = paymentWallet?.pages[0][0];
  const currentBalance = walletData?.currentBalance || 0;
  const processingBalance = walletData?.processingBalance || 0;
  const transactions = walletData ? allTransactions(paymentWallet) : [];

  return (
    <>
    <Meta
      title="Payment Wallet - Seller Section"
      description="Manage your payment wallet efficiently in the Seller Section. View your current balance, processing balance, and transaction history all in one place."
      keywords="Payment Wallet, Seller Section, Balance Management, Transaction History, Ecommerce, Online Store, Seller Dashboard"
    />
    <div className='w-full mx-auto sm:p-6  shadow-lg rounded-lg'>
      <div className='payment-box flex flex-col sm:flex-row items-center justify-between p-4'>
      <div className='flex flex-col sm:ml-5 mb-4 sm:mb-0'>
        <div className='flex sm:flex-row sm:gap-10 gap-3 items-center justify-center'>
        <h1 className='sm:text-2xl text-lg font-semibold'>Your Current Balance:</h1>
        <p className='text-blue-800 sm:text-3xl text-lg font-bold'>{currentBalance}</p>
        </div>
        <span className='sm:text-lg text-sm text-slate-600 mt-3'>
        Processing: <p className='text-blue-500 inline'>{processingBalance}</p>
        </span>
      </div>
      <div className='flex sm:mr-10'>
        <button onClick={() => withdrawAmount()} className='p-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600'>
        Withdraw
        </button>
      </div>
      </div>
      
      {/* Transactions List */}
      <Transaction paymentWalletTransactions={transactions} />
      
      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="h-20 flex items-center justify-center">
      {fetchError || transactions?.length === 0 ? (
        <p className="text-gray-500 text-center">No More Transactions Found</p>
      ) : isFetchingNextPage ? (
        <Spinner />
      ) : (
        <p className="text-gray-500 text-center">Scroll to load more orders</p>
      )}
      </div>
    </div>
    </>
  );
};

export default PaymentWallet;
