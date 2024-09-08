import { ITransaction } from "@/types";

const transactions: ITransaction[] = [
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'b89844e05609', score: 0, stage: 'APPROVE', amount: '0.00', dateTime: '5/24/24 2:00:33 PM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  { id: 'sartestudenid2', score: 41, stage: 'REVIEW', amount: '500,000.00 EUR', dateTime: '5/24/24 11:58:30 AM', status: 'Incomplete', assignedTo: 'Akos Gyure' },
  // Add more transactions as needed
];

const Transaction: React.FC = () => {
  return (
    <div className=" mx-auto sm:p-4 mt-6 bg-gray-100 shadow-md rounded-lg">
      <table className="min-w-full table-auto text-center">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">ID</th>
            <th className="sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">Stage</th>
            <th className="sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">Amount</th>
            <th className="sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">Date/Time</th>
            <th className="sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">Transaction Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="bg-white border-b">
              <td className="border sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.id}</td>
              <td className="border sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.stage}</td>
              <td className="border sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.amount}</td>
              <td className="border sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.dateTime}</td>
              <td className="border sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base">{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button className="btn bg-blue-500 text-white sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded hover:bg-blue-600">
          Prev
        </button>
        <span>1 - 100 of 433,393</span>
        <button className="btn bg-blue-500 text-white sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded hover:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default Transaction;
