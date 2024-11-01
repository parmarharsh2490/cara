
import  { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useCreateProductReview, useDeleteProductReview, useGetProductReview, useUpdateProductReview } from '@/query/productReview.queries';
import { allReviews } from '@/utils/allReviews';
import PopupForm from './PopupForm';
import { VerifiedBuyerIcon } from '../icons/VerifiedBuyerIcon';
import { UserContext } from "@/context";
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IProductReview } from '@/types';

const ReviewCard = ({ review, productId, onEdit } : any) => {
  const {user} = useContext(UserContext)
  const { mutateAsync: deleteReview, isPending } = useDeleteProductReview(productId);

  return (
    <div className="flex justify-between items-start border-b-2 pb-3">
           <div className="flex-grow">
    <div className="flex items-center">
               <div className="flex items-center bg-green-600 text-white rounded px-1 py-0.5">
               <p className="font-semibold">{review.rating}</p>
                 <StarIcon className="ml-1 text-xs" />
               </div>
               <p className="font-semibold ml-2 sm:ml-5">{review.title}</p>
             </div>
            <p className="text-base font-medium mt-3 text-slate-600">
              {review.description}
            </p>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-slate-500 mr-4">{review.name}</span>
           <span className="hidden sm:inline-flex items-center text-slate-400 mr-4">
                <VerifiedBuyerIcon />
                Certified Buyer, {review.userName}
               </span>
               <span className="text-slate-400">{review.date}</span>
           </div>
         </div>
           <img src={review.imageUrl} className="max-w-32 ml-4" alt="Review Image" />
        {review.userId === user._id && <div className="flex flex-col items-center gap-2">
           <FaEdit size={25} onClick={onEdit} />
            
            <AlertDialog>
       <AlertDialogTrigger><MdDelete size={25}/></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this review?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your review from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction disabled={isPending} onClick={() => deleteReview(review._id)}>{isPending ? "Loading" : "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
          </div>}
        </div>
  );
};

const Reviews = () => {
  const { productId } = useParams();
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [action, setAction] = useState('create');

  if (!productId) return <p className="text-red-500">Error: Product ID not found!</p>;

  const { mutateAsync: createReview, isPending: creatingReview } = useCreateProductReview();
  const { mutateAsync: updateReview, isPending: updatingReview } = useUpdateProductReview();

  const {
    data: reviews,
    fetchNextPage,
    isLoading,
    isFetching,
    error
  } = useGetProductReview(productId)

  if (isLoading && !isFetching) return <p className="text-gray-500">Loading...</p>;

  const handleEdit = () => {
    setAction('edit');
    setShowPopupForm(true);
  };

  const handlePopupFormSubmit = async (data : any) => {
    try {
      if (action === 'create') {
        await createReview({ data, productId })
      } else {
        await updateReview({ data, productId })
      }
      setShowPopupForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ratingStar = reviews?.pages[0]?.ratingStar || {};
  const totalUserCount = reviews?.pages[0]?.totalUserCount || 0;
  const averageRating = reviews?.pages[0]?.averageRating || 0;
  const reviewsData = allReviews(reviews);

  const renderRatingBar = (rating : number, count :number) => {
    const percentage = totalUserCount > 0 ? Math.round((count / totalUserCount) * 100) : 0;
    return (
      <div key={rating} className="flex items-center text-slate-400 text-sm sm:text-base my-1 sm:my-3">
        {rating}
        <StarIcon className="mx-3 h-4 w-4" />
        <div className="h-2 w-1/2 sm:w-3/5 mr-2 bg-slate-200">
          <div
            style={{ width: `${percentage}%` }}
            className="h-full bg-green-500"
          />
        </div>
        <div className="text-slate-900">{count}</div>
      </div>
    );
  };

  return (
    <div className="p-5 sm:p-10 flex flex-col sm:flex-row gap-4 mt-5 sm:mt-10">
      <div className="w-full sm:w-[30%] border-t-2 sm:border-t-0">
        <h1 className="text-xl sm:text-3xl font-semibold mb-5 sm:mb-1 mt-5 sm:mt-0">
          Rate & Review
        </h1>
        <div className="flex items-center mt-3">
          <StarIcon className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-xl mx-1 sm:mx-2">{averageRating.toFixed(1)}</span>
          <span className="text-slate-400 sm:ml-4 ml-1 text-sm">
            {totalUserCount} verified customers reviewed this.
          </span>
        </div>
        {Object.entries(ratingStar).length > 0
          ? Object.entries(ratingStar).map(([rating, count]) => renderRatingBar(Number(rating), count as number))
          : [5, 4, 3, 2, 1].map(rating => renderRatingBar(rating, 0))}
      </div>

      <div className="w-full sm:w-[70%]">
        <div className="flex items-center justify-between mb-5 sm:mb-10">
          <h1 className="text-xl sm:text-3xl font-semibold">Customer Reviews</h1>
          <button
            onClick={() => {
              setAction('create');
              setShowPopupForm(true);
            }}
            className="cursor-pointer py-4 px-2 bg-red-600 text-white rounded-md w-full max-w-48 text-xs font-bold hover:shadow-xl hover:shadow-red-100 duration-500 text-center"
          >
            WRITE A PRODUCT REVIEW
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {reviewsData.length > 0 ? (
            <>
              {reviewsData.map((review : IProductReview) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  productId={productId}
                  onEdit={handleEdit}
                />
              ))}
              <button
                onClick={() => fetchNextPage()}
                disabled={reviewsData.length < 5 || !!error}
                className="max-w-sm my-auto mx-auto py-2 px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500 disabled:bg-slate-400"
              >
                {error || reviewsData.length < 5
                  ? "No More Reviews"
                  : isLoading || isFetching
                  ? "Loading..."
                  : "View All Reviews"}
              </button>
            </>
          ) : (
            <p className="text-slate-400">No reviews available</p>
          )}
        </div>
      </div>

      {showPopupForm && (
        <PopupForm
          showPopupForm={showPopupForm}
          setShowPopupForm={setShowPopupForm}
          title={`${action === 'create' ? 'Create' : 'Edit'} Product Review`}
          inputData={[
            { type: 'number', label: 'ratingStar', name: 'Rating Star' },
            { type: 'file', label: 'reviewImage', name: 'Review Image' },
            { type: 'string', label: 'reviewTitle', name: 'Review Title' },
            { type: 'string', label: 'reviewDescription', name: 'Review Description' }
          ]}
          label="Product Review"
          isLoading={action === 'create' ? creatingReview : updatingReview}
          handleSubmitFunction={handlePopupFormSubmit}
        />
      )}
    </div>
  );
};

export default Reviews;