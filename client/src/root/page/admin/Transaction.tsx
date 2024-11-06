import { ITransaction } from "@/types";

interface TransactionProps {
  paymentWalletTransactions: ITransaction[];
}

const Transaction: React.FC<TransactionProps> = ({ paymentWalletTransactions }) => {
  return (
    <div className=" mx-auto p-4 mt-6 bg-gray-100 shadow-md rounded-lg overflow-scroll">
      <table className="min-w-full table-auto text-center">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2  text-sm md:text-base">ID</th>
            <th className="px-4 py-2  text-sm md:text-base">Amount</th>
            <th className="px-4 py-2  text-sm md:text-base">Date</th>
            <th className="px-4 py-2  text-sm md:text-base">Transaction Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentWalletTransactions.map((transaction) => (
            <tr key={transaction._id} className="bg-white border-b">
              <td className="border px-4 py-2  text-sm md:text-base">{transaction._id}</td>
              <td className="border px-4 py-2  text-sm md:text-base">{transaction.amount}</td>
              <td className="border px-4 py-2  text-sm md:text-base">{transaction.createdAt.substr(0, 10)}</td>
              <td className="border px-4 py-2  text-sm md:text-base">{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Transaction;
