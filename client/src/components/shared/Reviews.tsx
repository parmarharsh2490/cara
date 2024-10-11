import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateProductReview, useDeleteProductReview, useGetProductReview, useUpdateProductReview } from "../../query/productReview.queries";
import { StarIcon } from "../icons/StarIcon";
import { VerifiedBuyerIcon } from "../icons/VerifiedBuyerIcon";
import PopupForm from "./PopupForm";
import AlertDialog from "../ui/AlertDialog";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Reviews: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [reviews, setReviews] = useState<any>([]);
  const [skip, setSkip] = useState(0);
  const [action, setAction] = useState("create");
  // const [selectedReview, setSelectedReview] = useState(null);

  const { mutateAsync: createProductReview, isPending: loadingCreatingProductReview } = useCreateProductReview();
  const { mutateAsync: updateProductReview } = useUpdateProductReview();
  const { data: newReviews, isLoading, isFetched, error } = useGetProductReview(productId || "", skip);

  useEffect(() => {
    console.log(newReviews);
    console.log(newReviews);
    
    if (newReviews?.reviews && newReviews.reviews.length > 0) {
      setReviews((prevReviews: any) => ({
        ...newReviews,
        reviews: [...(prevReviews.reviews || []), ...newReviews.reviews]
      }));
    }
  }, [newReviews]);

  if (!productId) return <p className="text-red-500">Error: Product ID not found!</p>;
  if (isLoading && !isFetched) return <p className="text-gray-500">Loading...</p>;

  const handleReviewAction = async (data: any) => {
    if (action === "create") {
      await createProductReview({ data, productId });
    } else {
      await updateProductReview({ ...data, productId });
    }
    setShowPopupForm(false);
    // setSelectedReview(null);
  };

  const handleEditReview = (review: any) => {
    setAction("edit");
    console.log(review);
    
    // setSelectedReview(review);
    setShowPopupForm(true);
  };

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + 1);
  };

  const ratingStar = reviews?.ratingStar || {};
  const totalUserCount = reviews?.totalUserCount || 0;
  const averageRating = reviews?.averageRating || 0;
  const reviewList = reviews?.reviews || [];

  return (
    <div className="p-5 sm:p-10 flex flex-col sm:flex-row gap-4 mt-5 sm:mt-10">
      <RatingSummary 
        averageRating={averageRating} 
        totalUserCount={totalUserCount} 
        ratingStar={ratingStar} 
      />
      <CustomerReviews 
        loadMore={loadMore}
        error={error}
        isLoading={isLoading}
        reviews={reviewList}
        setShowPopupForm={setShowPopupForm}
        showPopupForm={showPopupForm}
        onEditReview={handleEditReview}
      />
      {showPopupForm && (
        <PopupForm
          showPopupForm={showPopupForm}
          setShowPopupForm={setShowPopupForm}
          title={action === "create" ? "Create a Product Review" : "Edit Product Review"}
          inputData={[
            { type: "number", label: "ratingStar", name: "Rating Star" },
            { type: "file", label: "reviewImage", name: "Review Image" },
            { type: "string", label: "reviewTitle", name: "Review Title" },
            { type: "string", label: "reviewDescription", name: "Review Description" }
          ]}
          label="Product Review"
          isLoading={loadingCreatingProductReview}
          handleSubmitFunction={handleReviewAction}
        />
      )}
    </div>
  );
};

const RatingSummary: React.FC<{ 
  averageRating: number; 
  totalUserCount: number; 
  ratingStar: Record<string, number>;
}> = ({ averageRating, totalUserCount, ratingStar }) => (
  <div className="w-full sm:w-[30%] border-t-2 sm:border-t-0">
    <h1 className="text-xl sm:text-3xl font-semibold mb-5 sm:mb-1 mt-5 sm:mt-0">
      Rate & Review
    </h1>
    <div className="flex items-center mt-3">
      <StarIcon className="text-xl text-green-600" />
      <span className="font-semibold text-xl mx-1 sm:mx-2">{averageRating.toFixed(1)}</span>
      <span className="text-slate-400 sm:ml-4 ml-1 text-sm">
        {totalUserCount} verified customers reviewed this.
      </span>
    </div>
    {Object.entries(ratingStar).length > 0 ? (
      Object.entries(ratingStar).map(([rating, count]) => (
        <RatingBar key={rating} rating={rating} count={count} totalCount={totalUserCount} />
      ))
    ) : (
      [1,2,3,4,5].map((rating) => (
        <RatingBar key={rating} rating={rating.toString()} count={0} totalCount={totalUserCount} />
      ))
    )}
  </div>
);

const RatingBar: React.FC<{ rating: string; count: number; totalCount: number }> = ({ rating, count, totalCount }) => {
  const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
  return (
    <div className="flex items-center text-slate-400 text-sm sm:text-base my-1 sm:my-3">
      {rating}
      <StarIcon className="text-slate-400 mx-3" />
      <div className="h-2 w-1/2 sm:w-3/5 mr-2 bg-slate-200">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-green-500"
        ></div>
      </div>
      <div className="text-slate-900">{count}</div>
    </div>
  );
};

const CustomerReviews: React.FC<{
  loadMore: () => void,
  error: any,
  isLoading: boolean,
  reviews: any[],
  setShowPopupForm: React.Dispatch<React.SetStateAction<boolean>>,
  showPopupForm: boolean,
  onEditReview: (review: any) => void
}> = ({ loadMore, error, isLoading, reviews, setShowPopupForm, showPopupForm, onEditReview }) => (
  <div className="w-full sm:w-[70%]">
    <div className="flex items-center justify-between mb-5 sm:mb-10">
      <h1 className="text-xl sm:text-3xl font-semibold">
        Customer Reviews
      </h1>
      <button 
        onClick={() => setShowPopupForm(!showPopupForm)} 
        className="cursor-pointer py-4 text-white px-2 bg-red-600 rounded-md w-full max-w-48 text-xs font-bold hover:shadow-xl hover:shadow-red-100 duration-500 text-center"
      >
        WRITE A PRODUCT REVIEW
      </button>
    </div>

    {reviews.length > 0 ? (
      <div className="flex flex-col gap-5">
        {reviews.map((review, index) => (
          <ReviewCard 
            key={index} 
            review={review} 
            onEdit={() => onEditReview(review)}
          />
        ))}
        <button 
          onClick={loadMore} 
          className={`py-[6px] px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500 my-5 ${reviews.length < 1 && "hidden"}`}
        >
          {error ? "No More Reviews Found" : isLoading ? "Loading..." : "VIEW ALL REVIEWS"}
        </button>
      </div>
    ) : (
      <p className="text-slate-400">No reviews available</p>
    )}
  </div>
);

const ReviewCard: React.FC<{ 
  review: any,
  onEdit: () => void
}> = ({ review, onEdit }) => {
  const { mutateAsync: deleteProductReview, isPending, isSuccess } = useDeleteProductReview();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
            Certified Buyer, {review.user}
          </span>
          <span className="text-slate-400">{review.date}</span>
        </div>
      </div>
      {review.image && review.image.imageUrl && (
        <img src={review.image.imageUrl} className="max-w-32 ml-4" alt="Review Image" />
      )}
      <div className="flex flex-col items-center gap-2">
        <FaEdit size={25} onClick={onEdit} />
        <MdDelete size={25} onClick={() => setIsPopupVisible(true)} />
        <AlertDialog
          title="Delete"
          description="Are you sure you want to delete this review?"
          loading={isPending}
          setIsPopupVisible={setIsPopupVisible}
          isPopupVisible={isPopupVisible}
          isSuccess={isSuccess}
          submitOnClick={() => deleteProductReview(review._id)}
          navigateUrl=""
        />
      </div>
    </div>
  );
};

export default Reviews;